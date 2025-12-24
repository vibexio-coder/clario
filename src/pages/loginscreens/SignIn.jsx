import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import EyeIcon from '../../assets/icons/loginpages/EyeIcon';
import CheckCircleIcon from '../../assets/icons/loginpages/CheckCircleIcon';
import GoogleIcon from '../../assets/icons/loginpages/GoogleIcon';
import MailIcon from '../../assets/icons/loginpages/MailIcon';
import CloseIcon from '../../assets/icons/loginpages/CloseIcon';
import bgimg from '../../assets/images/formbgimg.webp'
import { Link } from 'react-router-dom';
import DownArrowIconForm from '../../assets/icons/DownArrowIconForm';
import countries from '../countryCodes';

const SignIn = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState("personal");

    useEffect(() => {
        if (location.pathname === "/signup") setActiveTab("personal");
        if (location.pathname === "/businessinquiry") setActiveTab("business");
    }, [location.pathname]);
    const [openCountry, setOpenCountry] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(
        countries.find(c => c.code === "+91") || countries[0]
    );
    const [searchCountry, setSearchCountry] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const countryDropdownRef = useRef(null);

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
            if (
                countryDropdownRef.current &&
                !countryDropdownRef.current.contains(event.target)
            ) {
                setOpenCountry(false);
                setSearchCountry("");
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
            <div className="w-full max-w-[480px] rounded-[40px] bg-[linear-gradient(205.4deg,#D0DFEB_36.54%,rgba(253,253,253,0.6)_180%)] shadow-[0px_16px_25.2px_7px_#1A55701A] p-4 sm:p-6 md:p-8 flex flex-col gap-3 relative">

                {/* Title */}
                <h2 className="font-avenir font-semibold lg:font-bold text-[22px] md:text-[30px] text-center text-[#121212] pt-2 sm:pt-0">
                    Sign In
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
                <div className="flex flex-col gap-3 sm:gap-4 pt-3">

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
                            E Mail
                        </h2>

                        <input
                            type="text"
                            placeholder="Eg., Rayna Lipshutz@vibexio.ai"
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
                                <div className="absolute top-full left-0 mt-1 w-[100px] bg-white rounded-xl shadow-lg overflow-hidden z-50 ">
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
                                                    {getFlagEmoji(c.iso)}({c.code})
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


                    {/* Create Password */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                        <h2 className="font-avenir font-[700] text-[14px] sm:text-[16px] text-[#21527D]">Password</h2>

                        <div className="relative w-full sm:w-[250px]">
                            <input
                                type="password"
                                placeholder="Enter your Password"
                                className="w-full h-[30px] rounded-[100px] bg-[#FDFDFD] shadow-[0px_2px_4px_1px_#21527D26] px-4 pr-10 font-avenir text-[12px] text-[#82A9CC] outline-none"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                                <EyeIcon />
                            </span>
                        </div>
                    </div>

                    {/* Checkbox */}
                    <div className="flex items-center gap-2 mt-1 justify-center">
                        <p className="font-avenir text-[11px] sm:text-[12px] text-[#21527D]/75">
                            Forgot your password?
                        </p>
                    </div>
                </div>

                {/* Sign Up Button */}
                <div className="flex justify-center pt-1 sm:pt-0">
                    <button className="font-avenir font-[750] text-[14px] sm:text-[16px] text-[#FDFDFD] bg-[#21527D] rounded-[16px] w-[160px] sm:w-[180px] h-[46px] sm:h-[50px]">
                        Sign In
                    </button>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-2 sm:gap-4 justify-center pt-1 sm:pt-0">
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
                <p className="text-center font-avenir text-[13px] sm:text-[14px] text-[#121212]/40 pt-1 sm:pt-0">
                    Create a new account?
                    <Link to='/signup'><span className="font-[600] text-[14px] sm:text-[16px] text-[#21527D] ml-1 cursor-pointer">Sign Up</span></Link>
                </p>

            </div>
        </div>
    );
}

export default SignIn;