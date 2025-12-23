import React, { useState, useRef, useEffect } from 'react';
import CloseIcon from '../../assets/icons/loginpages/CloseIcon';
import DownArrowIconForm from '../../assets/icons/DownArrowIconForm';
import bgimg from '../../assets/images/formbgimg.webp';
import DemoSuccess from '../ocrpopups/DemoSuccess';

const DemoLogin = () => {
    const [orgSizeOpen, setOrgSizeOpen] = useState(false);
    const [selectedOrgSize, setSelectedOrgSize] = useState("");
    const [industryOpen, setIndustryOpen] = useState(false);
    const [selectedIndustry, setSelectedIndustry] = useState("");

    const [expandedSections, setExpandedSections] = useState({
        logistics: false,
        finance: false,
        healthcare: false,
        enterprise: false,
    });

    const [showSuccess, setShowSuccess] = useState(false);

    // Refs for click outside detection
    const orgSizeDropdownRef = useRef(null);
    const industryDropdownRef = useRef(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Close organization size dropdown
            if (orgSizeDropdownRef.current && !orgSizeDropdownRef.current.contains(event.target)) {
                setOrgSizeOpen(false);
            }

            // Close industry dropdown
            if (industryDropdownRef.current && !industryDropdownRef.current.contains(event.target)) {
                setIndustryOpen(false);
                // Also close expanded sections
                setExpandedSections({
                    logistics: false,
                    finance: false,
                    healthcare: false,
                    enterprise: false,
                });
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            logistics: false,
            finance: false,
            healthcare: false,
            enterprise: false,
            [section]: !prev[section],
        }));
    };

    const handleIndustrySelect = (industry) => {
        setSelectedIndustry(industry);
        setIndustryOpen(false);
        setExpandedSections({
            logistics: false,
            finance: false,
            healthcare: false,
            enterprise: false,
        });
    };

    const toggleOrgSizeDropdown = () => {
        setOrgSizeOpen(!orgSizeOpen);
        // Close industry dropdown if open
        if (industryOpen) {
            setIndustryOpen(false);
            setExpandedSections({
                logistics: false,
                finance: false,
                healthcare: false,
                enterprise: false,
            });
        }
    };

    const toggleIndustryDropdown = () => {
        setIndustryOpen(!industryOpen);
        // Close org size dropdown if open
        if (orgSizeOpen) {
            setOrgSizeOpen(false);
        }
        // Reset expanded sections when closing
        if (industryOpen) {
            setExpandedSections({
                logistics: false,
                finance: false,
                healthcare: false,
                enterprise: false,
            });
        }
    };

    const [showExportPopup, setShowExportPopup] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (open || showExportPopup || showSuccess) {
            const scrollY = window.scrollY;

            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = "0";
            document.body.style.right = "0";
            document.body.style.width = "100%";
        } else {
            const scrollY = document.body.style.top;

            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.left = "";
            document.body.style.right = "";
            document.body.style.width = "";

            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || "0") * -1);
            }
        }

        return () => {
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.left = "";
            document.body.style.right = "";
            document.body.style.width = "";
        };
    }, [open, showExportPopup, showSuccess]); // Add showSuccess here

    const row = "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2";
    const label = "font-avenir font-[700] text-[14px] sm:text-[16px] text-[#21527D] min-w-[140px]";
    const input = "w-full sm:w-[250px] h-[36px] rounded-[100px] bg-[#FDFDFD] shadow-[0px_2px_4px_1px_#21527D26] px-4 font-avenir text-[12px] text-[#82A9CC] placeholder:text-[#82A9CC] outline-none";

    return (
        <div
            className="w-full min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgimg})` }}
        >
            <div className="w-full max-w-[480px] rounded-[40px] bg-[linear-gradient(205.4deg,#D0DFEB_36.54%,rgba(253,253,253,0.6)_180%)] shadow-[0px_16px_25.2px_7px_#1A55701A] px-4 sm:px-6 md:px-8 py-6 relative">

                {/* Title */}
                <h2 className="font-avenir font-bold text-[22px] md:text-[30px] text-center text-[#121212] mb-4">
                    Book a demo
                </h2>

                {/* Form */}
                <div className="flex flex-col gap-3">

                    <div className={row}>
                        <label className={label}>Full Name</label>
                        <input className={input} placeholder="Eg., Rayna Lipshutz" />
                    </div>

                    <div className={row}>
                        <label className={label}>Work Email</label>
                        <input className={input} placeholder="Eg., name@company.com" />
                    </div>

                    <div className={row}>
                        <label className={label}>Phone Number</label>
                        <input className={input} placeholder="98xxxxxx76" />
                    </div>

                    <div className={row}>
                        <label className={label}>Organization Name</label>
                        <input className={input} placeholder="Eg., Vibexio" />
                    </div>

                    {/* Organization Size */}
                    <div className={row}>
                        <label className={label}>Organization Size</label>
                        <div ref={orgSizeDropdownRef} className="relative w-full sm:w-[250px]">
                            <input
                                readOnly
                                value={selectedOrgSize || "- Select -"}
                                onClick={toggleOrgSizeDropdown}
                                className={`${input} pr-10 cursor-pointer`}
                            />
                            <span className={`absolute right-4 top-1/2 -translate-y-1/2 transition-transform duration-200 pointer-events-none ${orgSizeOpen ? "rotate-180" : ""}`}>
                                <DownArrowIconForm />
                            </span>

                            {orgSizeOpen && (
                                <div className="absolute top-full mt-1 w-full bg-white rounded-[10px] shadow-[0px_2px_4px_1px_#21527D26] z-50 overflow-hidden">
                                    {["0-10", "11-50", "51-100", "101-250", "Above 250"].map((item) => (
                                        <div
                                            key={item}
                                            onClick={() => {
                                                setSelectedOrgSize(item);
                                                setOrgSizeOpen(false);
                                            }}
                                            className="font-avenir cursor-pointer hover:bg-[#E6F0FA] transition-colors font-avenir font-bold text-[12px] leading-[32px] tracking-[0.13em] text-center text-black"
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Industry Dropdown */}
                    <div className={row}>
                        <label className={label}>Industry</label>
                        <div ref={industryDropdownRef} className="relative w-full sm:w-[250px]">
                            <div className="relative">
                                <input
                                    type="text"
                                    readOnly
                                    value={selectedIndustry || "- Select -"}
                                    onClick={toggleIndustryDropdown}
                                    className="w-full h-[36px] rounded-[100px] bg-[#FDFDFD] shadow-[0px_2px_4px_1px_#21527D26] px-4 pr-10 font-avenir text-[12px] text-[#82A9CC] outline-none cursor-pointer"
                                />
                                <span className={`absolute right-3 top-1/2 -translate-y-1/2 transition-transform duration-200 pointer-events-none ${industryOpen ? "rotate-180" : ""}`}>
                                    <DownArrowIconForm />
                                </span>
                            </div>

                            {industryOpen && (
                                <div className="absolute top-full mt-1 w-full max-h-[300px] rounded-[10px] bg-[#FDFDFD] shadow-[0px_2px_4px_1px_#21527D26] z-50 overflow-y-auto p-2">
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

                    <div className={row}>
                        <label className={label}>Use Case</label>
                        <textarea
                            placeholder="Describe your case briefly"
                            className="w-full sm:w-[250px] h-[80px] rounded-[20px] bg-[#FDFDFD] shadow-[0px_2px_4px_1px_#21527D26] px-4 py-3 font-avenir text-[12px] text-[#82A9CC] placeholder:text-[#82A9CC] outline-none resize-none"
                        />
                    </div>

                    <div className={row}>
                        <label className={label}>Job Title</label>
                        <input className={input} placeholder="CEO, CTO, Product Manager…" />
                    </div>
                </div>

                {/* Submit */}
                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => setShowSuccess(true)}
                        className="w-[180px] h-[50px] font-avenir font-bold text-[16px] text-white bg-[#21527D] rounded-[18px] hover:opacity-90 transition"
                    >
                        Submit
                    </button>
                </div>

            </div>

            {showSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <DemoSuccess onClose={() => setShowSuccess(false)} />
                </div>
            )}

        </div>
    );
};

export default DemoLogin;