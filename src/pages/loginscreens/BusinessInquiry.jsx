import React, { useEffect, useRef, useState } from 'react';
import EyeIcon from '../../assets/icons/loginpages/EyeIcon';
import CheckCircleIcon from '../../assets/icons/loginpages/CheckCircleIcon';
import GoogleIcon from '../../assets/icons/loginpages/GoogleIcon';
import MailIcon from '../../assets/icons/loginpages/MailIcon';
import CloseIcon from '../../assets/icons/loginpages/CloseIcon';
import bgimg from '../../assets/images/formbgimg.webp'
import DownArrowIconForm from '../../assets/icons/DownArrowIconForm';
import { useNavigate, useLocation, Link } from "react-router-dom";
import countries from '../countryCodes';

const BusinessInquiry = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [open, setOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState("");
    const [industryOpen, setIndustryOpen] = useState(false);
    const [selectedIndustry, setSelectedIndustry] = useState("");
    const [expandedSections, setExpandedSections] = useState({
        logistics: false,
        finance: false,
        healthcare: false,
        enterprise: false
    });

    const activeTab = location.pathname.includes("/businessinquiry") ? "business" : "personal";

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            logistics: false,
            finance: false,
            healthcare: false,
            enterprise: false,
            [section]: !prev[section]
        }));
    };

    const handleIndustrySelect = (industry) => {
        setSelectedIndustry(industry);
        setIndustryOpen(false);
        // Close all sections when an industry is selected
        setExpandedSections({
            logistics: false,
            finance: false,
            healthcare: false,
            enterprise: false
        });
    };

    const [openCountry, setOpenCountry] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(
        countries.find(c => c.code === "+91") || countries[0]
    );
    const [searchCountry, setSearchCountry] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const countryDropdownRef = useRef(null);
    const sizeDropdownRef = useRef(null);
    const industryDropdownRef = useRef(null);

    const filteredCountries = countries.filter((c) =>
        c.name.toLowerCase().includes(searchCountry.toLowerCase()) ||
        c.code.includes(searchCountry)
    );

    const getFlagEmoji = (isoCode) => {
        if (!isoCode) return "🇺🇸"; // Default flag
        return isoCode
            .toUpperCase()
            .replace(/./g, (char) =>
                String.fromCodePoint(127397 + char.charCodeAt())
            );
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Close country dropdown
            if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
                setOpenCountry(false);
                setSearchCountry("");
            }

            // Close organization size dropdown
            if (sizeDropdownRef.current && !sizeDropdownRef.current.contains(event.target)) {
                setOpen(false);
            }

            // Close industry dropdown
            if (industryDropdownRef.current && !industryDropdownRef.current.contains(event.target)) {
                setIndustryOpen(false);
                setExpandedSections({
                    logistics: false,
                    finance: false,
                    healthcare: false,
                    enterprise: false
                });
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat bg-[linear-gradient(76.43deg,#B5CBDD_11.39%,#D9E5EF_88.36%)]"
            style={{ backgroundImage: `url(${bgimg})` }}>
            <div className="w-full max-w-[480px] rounded-[40px] bg-[linear-gradient(205.4deg,#D0DFEB_36.54%,rgba(253,253,253,0.6)_180%)] shadow-[0px_16px_25.2px_7px_#1A55701A] py-2 px-4 md:px-8 flex flex-col gap-2 relative">

                {/* Title */}
                <h2 className="font-avenir font-semibold lg:font-bold text-[22px] md:text-[30px] text-center text-[#121212]">
                    Business Sign Up
                </h2>

                {/* Toggle Buttons */}
                <div className="flex justify-center gap-2 sm:gap-3">
                    {/* PERSONAL BUTTON */}
                    <button
                        onClick={() => navigate("/signup")}
                        className={`
                            font-avenir text-[14px] sm:text-[16px] rounded-[100px] 
                            w-[110px] sm:w-[125px] h-[36px] sm:h-[40px] flex items-center justify-center
                            ${activeTab === "personal"
                                ? "font-[700] text-[#FDFDFD] bg-[#21527D]"
                                : "font-[600] text-[#21527D] bg-[#FDFDFD] shadow-[0px_8px_15px_-5px_#21527D26]"
                            }
                        `}
                    >
                        Personal
                    </button>

                    {/* BUSINESS BUTTON */}
                    <button
                        onClick={() => navigate("/businessinquiry")}
                        className={`
                            font-avenir text-[14px] sm:text-[16px] rounded-[100px] 
                            w-[110px] sm:w-[125px] h-[36px] sm:h-[40px] flex items-center justify-center
                            ${activeTab === "business"
                                ? "font-[700] text-[#FDFDFD] bg-[#21527D]"
                                : "font-[600] text-[#21527D] bg-[#FDFDFD] shadow-[0px_8px_15px_-5px_#21527D26]"
                            }
                        `}
                    >
                        Enterprise
                    </button>
                </div>

                {/* Form Area */}
                <div className="flex flex-col gap-2 pt-1">
                    {/* Full Name */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                        <h2 className="font-avenir font-[700] text-[14px] sm:text-[16px] text-[#21527D]">
                            Full Name
                        </h2>
                        <input
                            type="text"
                            placeholder="Eg., Rayna Lipshutz"
                            className="w-full sm:w-[250px] h-[30px] rounded-[100px] bg-[#FDFDFD] shadow-[0px_2px_4px_1px_#21527D26] px-4 font-avenir text-[12px] text-[#82A9CC] placeholder:text-[#82A9CC] outline-none"
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                        <h2 className="font-avenir font-[700] text-[14px] sm:text-[16px] text-[#21527D]">
                            Work Email
                        </h2>
                        <input
                            type="email"
                            placeholder="Eg., Rayna.Lipshutz@vibexio.ai"
                            className="w-full sm:w-[250px] h-[30px] rounded-[100px] bg-[#FDFDFD] shadow-[0px_2px_4px_1px_#21527D26] px-4 font-avenir text-[12px] text-[#82A9CC] placeholder:text-[#82A9CC] outline-none"
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                        <label className="font-avenir font-[700] text-[14px] sm:text-[16px] text-[#21527D]">
                            Phone Number
                        </label>
                        <div ref={countryDropdownRef} className="relative flex w-full sm:w-[250px] h-[30px] bg-[#FDFDFD] rounded-[100px] shadow-[0px_2px_4px_1px_#21527D26]">
                            {/* Country Selector */}
                            <div
                                className="w-[75px] flex items-center justify-between px-2 cursor-pointer font-avenir text-[12px] text-[#21527D]"
                                onClick={() => setOpenCountry(!openCountry)}
                            >
                                <div className="flex items-center gap-1">
                                    {getFlagEmoji(selectedCountry?.iso)} {selectedCountry?.code}
                                </div>
                                <DownArrowIconForm className={`transition-transform duration-200 ${openCountry ? "rotate-180" : ""}`} />
                            </div>

                            <div className="w-[1px] bg-[#21527D26]" />

                            <input
                                type="tel"
                                placeholder="98xxxxxx76"
                                className="flex-1 px-3 font-avenir text-[12px] text-[#82A9CC] placeholder:text-[#82A9CC] outline-none bg-transparent"
                            />

                            {/* Country Dropdown */}
                            {openCountry && (
                                <div className="absolute top-full left-0 mt-1 w-[200px] bg-white rounded-xl shadow-lg overflow-hidden z-50">
                                    <input
                                        type="text"
                                        placeholder="Search country"
                                        value={searchCountry}
                                        onChange={(e) => setSearchCountry(e.target.value)}
                                        className="w-full px-3 py-2 font-avenir text-[12px] outline-none border-b border-[#E5EAF0] placeholder:text-[#869EB6]"
                                        autoFocus
                                    />
                                    <div className="max-h-[240px] overflow-y-auto scrollbar-hide">
                                        {filteredCountries.length > 0 ? (
                                            filteredCountries.map((c) => (
                                                <div
                                                    key={c.iso}
                                                    className="px-3 py-2 text-[12px] flex items-center gap-2 cursor-pointer hover:bg-[#F0F4F8]"
                                                    onClick={() => {
                                                        setSelectedCountry(c);
                                                        setOpenCountry(false);
                                                        setSearchCountry("");
                                                    }}
                                                >
                                                    {getFlagEmoji(c.iso)} {c.name} ({c.code})
                                                </div>
                                            ))
                                        ) : (
                                            <div className="px-3 py-2 text-[12px] text-[#869EB6]">
                                                No country found
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Organization Name */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                        <h2 className="font-avenir font-[700] text-[14px] sm:text-[16px] text-[#21527D]">
                            Organization Name
                        </h2>
                        <input
                            type="text"
                            placeholder="Eg., Vibexio"
                            className="w-full sm:w-[250px] h-[30px] rounded-[100px] bg-[#FDFDFD] shadow-[0px_2px_4px_1px_#21527D26] px-4 font-avenir text-[12px] text-[#82A9CC] placeholder:text-[#82A9CC] outline-none"
                        />
                    </div>

                    {/* Organization Size */}
                    <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0'>
                        <h2 className="font-avenir font-[700] text-[14px] sm:text-[16px] text-[#21527D]">
                            Organization Size
                        </h2>
                        <div ref={sizeDropdownRef} className="relative w-full sm:w-[250px] ml-auto">
                            <div className="relative">
                                <input
                                    type="text"
                                    readOnly
                                    value={selectedSize || "-Select-"}
                                    onClick={() => {
                                        setOpen(!open);
                                        // Close other dropdowns
                                        setIndustryOpen(false);
                                        setExpandedSections({
                                            logistics: false,
                                            finance: false,
                                            healthcare: false,
                                            enterprise: false
                                        });
                                    }}
                                    className="w-full h-[30px] rounded-[100px] bg-[#FDFDFD] shadow-[0px_2px_4px_1px_#21527D26] px-4 pr-10 font-avenir text-[12px] text-[#82A9CC] outline-none cursor-pointer"
                                />
                                <span className={`absolute right-3 top-1/2 -translate-y-1/2 transition-transform duration-200 pointer-events-none ${open ? "rotate-180" : ""}`}>
                                    <DownArrowIconForm />
                                </span>
                            </div>

                            {open && (
                                <div className="scrollbar-hide absolute top-full mt-1 w-full rounded-[10px] bg-[#FDFDFD] shadow-[0px_2px_4px_1px_#21527D26] z-50 overflow-hidden shadow-[0px_2px_4px_1px_#21527D26,_3px_4px_4px_0px_#5FB0F81A_inset]">
                                    <ul className="py-1">
                                        {["0-10", "11-50", "50-100", "101-250", "Above 250"].map((item) => (
                                            <li
                                                key={item}
                                                onClick={() => {
                                                    setSelectedSize(item);
                                                    setOpen(false);
                                                }}
                                                className="font-avenir cursor-pointer hover:bg-[#E6F0FA] transition-colors font-avenir font-bold text-[12px] leading-[32px] tracking-[0.13em] text-center text-black"
                                            >
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Industry */}
                    <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0'>
                        <h2 className="font-avenir font-[700] text-[14px] sm:text-[16px] text-[#21527D]">
                            Industry
                        </h2>
                        <div ref={industryDropdownRef} className="relative w-full sm:w-[250px] ml-auto">
                            <div className="relative">
                                <input
                                    type="text"
                                    readOnly
                                    value={selectedIndustry || "-Select-"}
                                    onClick={() => {
                                        setIndustryOpen(!industryOpen);
                                        // Close other dropdowns
                                        setOpen(false);
                                    }}
                                    className="w-full h-[30px] rounded-[100px] bg-[#FDFDFD] shadow-[0px_2px_4px_1px_#21527D26] px-4 pr-10 font-avenir text-[12px] text-[#82A9CC] outline-none cursor-pointer"
                                />
                                <span className={`absolute right-3 top-1/2 -translate-y-1/2 transition-transform duration-200 pointer-events-none ${industryOpen ? "rotate-180" : ""}`}>
                                    <DownArrowIconForm />
                                </span>
                            </div>

                            {industryOpen && (
                                <div className="scrollbar-hide absolute top-full mt-1 w-full max-h-[300px] rounded-[10px] bg-[#FDFDFD] shadow-[0px_2px_4px_1px_#21527D26] z-50 overflow-y-auto p-2">
                                    {/* Logistics */}
                                    <div className="mb-2">
                                        <div
                                            className="flex items-center justify-between cursor-pointer font-avenir font-[700] text-[12px] text-[#21527D] p-2 hover:bg-[#E6F0FA] rounded"
                                            onClick={() => toggleSection('logistics')}
                                        >
                                            Logistics & Operations
                                            <span className={`transition-transform duration-200 ${expandedSections.logistics ? 'rotate-180' : ''}`}>
                                                <DownArrowIconForm />
                                            </span>
                                        </div>

                                        {expandedSections.logistics && (
                                            <ul className="ml-3 mt-1 pl-2">
                                                <li onClick={() => handleIndustrySelect("Logistics & SCM")} className="font-avenir font-[400] text-[10px] text-[#000] p-1 hover:bg-[#F0F7FF] rounded cursor-pointer">Logistics & SCM</li>
                                                <li onClick={() => handleIndustrySelect("Cold Chain")} className="font-avenir font-[400] text-[10px] text-[#000] p-1 hover:bg-[#F0F7FF] rounded cursor-pointer">Cold Chain</li>
                                                <li onClick={() => handleIndustrySelect("Freight & Customs")} className="font-avenir font-[400] text-[10px] text-[#000] p-1 hover:bg-[#F0F7FF] rounded cursor-pointer">Freight & Customs</li>
                                                <li onClick={() => handleIndustrySelect("Warehousing")} className="font-avenir font-[400] text-[10px] text-[#000] p-1 hover:bg-[#F0F7FF] rounded cursor-pointer">Warehousing</li>
                                            </ul>
                                        )}
                                    </div>

                                    {/* Finance */}
                                    <div className="mb-2">
                                        <div
                                            className="flex items-center justify-between cursor-pointer font-avenir font-[700] text-[12px] text-[#21527D] p-2 hover:bg-[#E6F0FA] rounded"
                                            onClick={() => toggleSection('finance')}
                                        >
                                            Finance
                                            <span className={`transition-transform duration-200 ${expandedSections.finance ? 'rotate-180' : ''}`}>
                                                <DownArrowIconForm />
                                            </span>
                                        </div>

                                        {expandedSections.finance && (
                                            <ul className="ml-3 mt-1 pl-2">
                                                <li onClick={() => handleIndustrySelect("BFSI")} className="font-avenir font-[400] text-[10px] text-[#000] p-1 hover:bg-[#F0F7FF] rounded cursor-pointer">BFSI</li>
                                                <li onClick={() => handleIndustrySelect("Fintech")} className="font-avenir font-[400] text-[10px] text-[#000] p-1 hover:bg-[#F0F7FF] rounded cursor-pointer">Fintech</li>
                                                <li onClick={() => handleIndustrySelect("Accounting")} className="font-avenir font-[400] text-[10px] text-[#000] p-1 hover:bg-[#F0F7FF] rounded cursor-pointer">Accounting</li>
                                                <li onClick={() => handleIndustrySelect("Tax")} className="font-avenir font-[400] text-[10px] text-[#000] p-1 hover:bg-[#F0F7FF] rounded cursor-pointer">Tax</li>
                                            </ul>
                                        )}
                                    </div>

                                    {/* Healthcare */}
                                    <div className="mb-2">
                                        <div
                                            className="flex items-center justify-between cursor-pointer font-avenir font-[700] text-[12px] text-[#21527D] p-2 hover:bg-[#E6F0FA] rounded"
                                            onClick={() => toggleSection('healthcare')}
                                        >
                                            Healthcare
                                            <span className={`transition-transform duration-200 ${expandedSections.healthcare ? 'rotate-180' : ''}`}>
                                                <DownArrowIconForm />
                                            </span>
                                        </div>

                                        {expandedSections.healthcare && (
                                            <ul className="ml-3 mt-1 pl-2">
                                                <li onClick={() => handleIndustrySelect("Healthcare")} className="font-avenir font-[400] text-[10px] text-[#000] p-1 hover:bg-[#F0F7FF] rounded cursor-pointer">Healthcare</li>
                                                <li onClick={() => handleIndustrySelect("Pharma")} className="font-avenir font-[400] text-[10px] text-[#000] p-1 hover:bg-[#F0F7FF] rounded cursor-pointer">Pharma</li>
                                                <li onClick={() => handleIndustrySelect("Insurance (Health)")} className="font-avenir font-[400] text-[10px] text-[#000] p-1 hover:bg-[#F0F7FF] rounded cursor-pointer">Insurance (Health)</li>
                                                <li onClick={() => handleIndustrySelect("EMR")} className="font-avenir font-[400] text-[10px] text-[#000] p-1 hover:bg-[#F0F7FF] rounded cursor-pointer">EMR</li>
                                            </ul>
                                        )}
                                    </div>

                                    {/* Enterprise Ops */}
                                    <div className="mb-2">
                                        <div
                                            className="flex items-center justify-between cursor-pointer font-avenir font-[700] text-[12px] text-[#21527D] p-2 hover:bg-[#E6F0FA] rounded"
                                            onClick={() => toggleSection('enterprise')}
                                        >
                                            Enterprise Ops
                                            <span className={`transition-transform duration-200 ${expandedSections.enterprise ? 'rotate-180' : ''}`}>
                                                <DownArrowIconForm />
                                            </span>
                                        </div>

                                        {expandedSections.enterprise && (
                                            <ul className="ml-3 mt-1 pl-2">
                                                <li onClick={() => handleIndustrySelect("HR")} className="font-avenir font-[400] text-[10px] text-[#000] p-1 hover:bg-[#F0F7FF] rounded cursor-pointer">HR</li>
                                                <li onClick={() => handleIndustrySelect("Legal")} className="font-avenir font-[400] text-[10px] text-[#000] p-1 hover:bg-[#F0F7FF] rounded cursor-pointer">Legal</li>
                                                <li onClick={() => handleIndustrySelect("Procurement")} className="font-avenir font-[400] text-[10px] text-[#000] p-1 hover:bg-[#F0F7FF] rounded cursor-pointer">Procurement</li>
                                                <li onClick={() => handleIndustrySelect("Vendor Management")} className="font-avenir font-[400] text-[10px] text-[#000] p-1 hover:bg-[#F0F7FF] rounded cursor-pointer">Vendor Management</li>
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Use Case */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                        <h2 className="font-avenir font-[700] text-[14px] sm:text-[16px] text-[#21527D]">
                            Use case
                        </h2>
                        <input
                            type="text"
                            placeholder="Describe your case briefly"
                            className="w-full sm:w-[250px] h-[30px] rounded-[100px] bg-[#FDFDFD] shadow-[0px_2px_4px_1px_#21527D26] px-4 font-avenir text-[12px] text-[#82A9CC] placeholder:text-[#82A9CC] outline-none"
                        />
                    </div>

                    {/* Job Title */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                        <h2 className="font-avenir font-[700] text-[14px] sm:text-[16px] text-[#21527D]">
                            Job Title
                        </h2>
                        <input
                            type="text"
                            placeholder="Eg., C.E.O., CTO, Product Manager..."
                            className="w-full sm:w-[250px] h-[30px] rounded-[100px] bg-[#FDFDFD] shadow-[0px_2px_4px_1px_#21527D26] px-4 font-avenir text-[12px] text-[#82A9CC] placeholder:text-[#82A9CC] outline-none"
                        />
                    </div>

                    {/* Checkbox */}
                    <div className="flex items-center gap-2 mt-1 justify-center">
                        <input type="checkbox" className="w-4 h-4 accent-[#21527D]" />
                        <p className="font-avenir text-[11px] sm:text-[12px] text-[#21527D]/75">
                            I agree to <span className="font-[700]">Vibexio</span>'s
                            <span className="underline ml-1 cursor-pointer">Terms of Service</span> &
                            <span className="underline ml-1 cursor-pointer">Privacy Policy</span>
                        </p>
                    </div>
                </div>

                {/* Sign Up Button */}
                <div className="flex justify-center ">
                    <button className="font-avenir font-[750] text-[14px] sm:text-[16px] text-[#FDFDFD] bg-[#21527D] rounded-[16px] w-[160px] sm:w-[180px] h-[46px] sm:h-[50px]">
                        Sign Up
                    </button>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-2 sm:gap-4 justify-center">
                    <div className="w-[120px] sm:w-[150px] md:w-[170px] border-t border-[#859BAE]"></div>
                    <span className="font-avenir text-[18px] sm:text-[20px] text-[#859BAE]">Or</span>
                    <div className="w-[120px] sm:w-[150px] md:w-[170px] border-t border-[#859BAE]"></div>
                </div>

                {/* Icons */}
                <div className="flex justify-center gap-3 sm:gap-4">
                    <div className="bg-[#FDFDFD] shadow-[0px_5px_4px_0px_#21527D40] w-[45px] h-[45px] sm:w-[50px] sm:h-[50px] rounded-full flex items-center justify-center cursor-pointer">
                        <GoogleIcon />
                    </div>
                    <div className="bg-[#FDFDFD] shadow-[0px_5px_4px_0px_#21527D40] w-[45px] h-[45px] sm:w-[50px] sm:h-[50px] rounded-full flex items-center justify-center cursor-pointer">
                        <MailIcon />
                    </div>
                </div>

                {/* Bottom Text */}
                <p className="text-center font-avenir text-[13px] sm:text-[14px] text-[#121212]/40 ">
                    Already have an account?
                    <Link to='/signinbusiness'>
                        <span className="font-[600] text-[14px] sm:text-[16px] text-[#21527D] ml-1 cursor-pointer">Sign In</span>
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default BusinessInquiry;