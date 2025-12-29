import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../../assets/images/icon.webp";
import DownArrowIconForm from "../../assets/icons/DownArrowIconForm";

const BusinessUser = () => {
    const [organizationName, setOrganizationName] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedIndustry, setSelectedIndustry] = useState("");
    const [nameError, setNameError] = useState("");
    const [industryError, setIndustryError] = useState("");
    const [sizeError, setSizeError] = useState("");

    // Dropdown states
    const [open, setOpen] = useState(false);
    const [industryOpen, setIndustryOpen] = useState(false);
    const [expandedSections, setExpandedSections] = useState({
        logistics: false,
        finance: false,
        healthcare: false,
        enterprise: false
    });

    // Refs for dropdowns
    const sizeDropdownRef = useRef(null);
    const industryDropdownRef = useRef(null);
    const navigate = useNavigate();

    const validateOrganizationName = (name) => {
        const trimmedName = name.trim();

        // Check if empty
        if (!trimmedName) {
            return "Organization name is required";
        }

        // Check if contains only allowed characters
        if (!/^[A-Za-z0-9&\s.,'-]+$/.test(trimmedName)) {
            return "Organization name contains invalid characters";
        }

        // Check if at least 2 characters
        if (trimmedName.length < 2) {
            return "Organization name must be at least 2 characters long";
        }

        return "";
    };

    const validateIndustry = () => {
        // Check if industry is selected
        if (!selectedIndustry || selectedIndustry === "Select industry") {
            return "Please select industry";
        }
        return "";
    };

    const validateOrganizationSize = () => {
        // Check if organization size is selected
        if (!selectedSize || selectedSize === "Select size") {
            return "Please select organization size";
        }
        return "";
    };

    const handleContinue = () => {
        // Clear all errors
        setNameError("");
        setIndustryError("");
        setSizeError("");
        
        // Step 1: Validate organization name first
        const nameValidationError = validateOrganizationName(organizationName);
        if (nameValidationError) {
            setNameError(nameValidationError);
            return; // Stop here if organization name has error
        }
        
        // Step 2: If organization name is valid, validate industry
        const industryValidationError = validateIndustry();
        if (industryValidationError) {
            setIndustryError(industryValidationError);
            return; // Stop here if industry has error
        }
        
        // Step 3: If both above are valid, validate organization size
        const sizeValidationError = validateOrganizationSize();
        if (sizeValidationError) {
            setSizeError(sizeValidationError);
            return; // Stop here if size has error
        }
        
        // If all are valid, proceed
        navigate("/allusers");
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setOrganizationName(value);

        // Clear name error when user starts typing
        if (nameError) {
            setNameError("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleContinue();
        }
    };

    // Handle industry selection
    const handleIndustrySelect = (industry) => {
        setSelectedIndustry(industry);
        setIndustryOpen(false);
        // Clear industry error when selection is made
        if (industryError) {
            setIndustryError("");
        }
    };

    // Handle size selection
    const handleSizeSelect = (size) => {
        setSelectedSize(size);
        setOpen(false);
        // Clear size error when selection is made
        if (sizeError) {
            setSizeError("");
        }
    };

    // Toggle section expansion
    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    // Close dropdowns when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (sizeDropdownRef.current && !sizeDropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
            if (industryDropdownRef.current && !industryDropdownRef.current.contains(event.target)) {
                setIndustryOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const getInputStyles = () => {
        const baseStyles = "w-full bg-[#F2F2F2] border rounded-[6px] px-4 py-3 font-avenir text-[16px] leading-[26px] outline-none focus:ring-1 pr-12";

        if (nameError) {
            return `${baseStyles} border-[#F1511B] placeholder:text-[#F1511B] text-[#F1511B] focus:ring-[#F1511B] bg-[#FFFFFF]`;
        }

        return `${baseStyles} border-[#21527D] placeholder:text-[#21527D]/50 text-[#21527D] focus:ring-[#21527D]`;
    };

    const getDropdownInputStyles = (hasError) => {
        const baseStyles = "w-full bg-[#F2F2F2] border rounded-[6px] px-4 py-3 font-avenir text-[16px] leading-[26px] outline-none focus:ring-1 pr-12 cursor-pointer";

        if (hasError) {
            return `${baseStyles} border-[#F1511B] placeholder:text-[#F1511B] text-[#F1511B] focus:ring-[#F1511B] bg-[#FFFFFF]`;
        }

        return `${baseStyles} border-[#21527D] placeholder:text-[#21527D]/50 text-[#21527D]/50 focus:ring-[#21527D]`;
    };

    return (
    <div className="h-full md:min-h-screen flex items-center justify-center py-1 md:py-0 bg-[#FAFDFF]">
            <div className="w-full max-w-[500px] bg-white shadow-[0px_0px_7px_0px_#00000040] md:rounded-[20px] px-10 py-8 flex flex-col gap-5">

                {/* Logo */}
                <div className="flex justify-center">
                    <img src={icon} alt="logo" className="w-[150px] h-[60px] object-contain" />
                </div>

                <div>
                    {/* Title */}
                    <h2 className="font-kollektif font-semibold lg:font-bold text-[24px] leading-[26px] text-[#21527D] mb-1">
                        Complete your setup
                    </h2>
                    <p className="font-avenir font-normal text-[16px] leading-[26px] tracking-[0%] text-black">
                        This helps us tailor Clario to your needs.
                    </p>
                </div>

                {/* Input Fields */}
                <div className="flex flex-col gap-2">
                    {/* Organization Name Input Field */}
                    <div className="flex flex-col gap-2">
                        <p className="font-avenir text-[12px] leading-[26px] text-[#000000]">
                            Organization name
                        </p>

                        <input
                            type="text"
                            placeholder="Enter your company name"
                            value={organizationName}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            className={getInputStyles()}
                        />

                        {/* Name Error Message */}
                        {nameError && (
                            <div className="flex items-start gap-1 mt-1">
                                <span className="font-avenir font-[400] text-[12px] leading-[26px] text-[#F1511B] italic">
                                    {nameError}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Industry Dropdown */}
                    <div className="flex flex-col gap-2">
                        <p className="font-avenir text-[12px] leading-[26px] text-[#000000]">
                            Industry
                        </p>

                        <div ref={industryDropdownRef} className="relative">
                            <input
                                type="text"
                                readOnly
                                value={selectedIndustry || "Select industry"}
                                onClick={() => {
                                    setIndustryOpen(!industryOpen);
                                    setOpen(false);
                                }}
                                className={getDropdownInputStyles(industryError)}
                                placeholder="Select industry"
                            />
                            <span className={`absolute right-3 top-1/2 -translate-y-1/2 transition-transform duration-200 pointer-events-none ${industryOpen ? "rotate-180" : ""}`}>
                                <DownArrowIconForm width={25} height={25} />
                            </span>

                            {industryOpen && (
                                <div className="absolute top-full mt-1 w-full max-h-[200px] rounded-[6px] bg-[#FDFDFD] border border-[#21527D] shadow-[0px_0px_7px_0px_#00000040] z-50 overflow-y-auto scrollbar-hide">
                                    {/* Logistics */}
                                    <div className="mb-1">
                                        <div
                                            className="flex items-center justify-between cursor-pointer font-avenir font-[700] text-[14px] text-[#21527D] p-3 hover:bg-[#E6F0FA]"
                                            onClick={() => toggleSection('logistics')}
                                        >
                                            Logistics & Operations
                                            <span className={`transition-transform duration-200 ${expandedSections.logistics ? 'rotate-180' : ''}`}>
                                                <DownArrowIconForm />
                                            </span>
                                        </div>

                                        {expandedSections.logistics && (
                                            <ul className="ml-3 mb-1">
                                                <li onClick={() => handleIndustrySelect("Logistics & SCM")} className="font-avenir font-[400] text-[14px] text-[#000] p-2 hover:bg-[#F0F7FF] rounded cursor-pointer">Logistics & SCM</li>
                                                <li onClick={() => handleIndustrySelect("Cold Chain")} className="font-avenir font-[400] text-[14px] text-[#000] p-2 hover:bg-[#F0F7FF] rounded cursor-pointer">Cold Chain</li>
                                                <li onClick={() => handleIndustrySelect("Freight & Customs")} className="font-avenir font-[400] text-[14px] text-[#000] p-2 hover:bg-[#F0F7FF] rounded cursor-pointer">Freight & Customs</li>
                                                <li onClick={() => handleIndustrySelect("Warehousing")} className="font-avenir font-[400] text-[14px] text-[#000] p-2 hover:bg-[#F0F7FF] rounded cursor-pointer">Warehousing</li>
                                            </ul>
                                        )}
                                    </div>

                                    {/* Finance */}
                                    <div className="mb-1">
                                        <div
                                            className="flex items-center justify-between cursor-pointer font-avenir font-[700] text-[14px] text-[#21527D] p-3 hover:bg-[#E6F0FA]"
                                            onClick={() => toggleSection('finance')}
                                        >
                                            Finance
                                            <span className={`transition-transform duration-200 ${expandedSections.finance ? 'rotate-180' : ''}`}>
                                                <DownArrowIconForm />
                                            </span>
                                        </div>

                                        {expandedSections.finance && (
                                            <ul className="ml-3 mb-1">
                                                <li onClick={() => handleIndustrySelect("BFSI")} className="font-avenir font-[400] text-[14px] text-[#000] p-2 hover:bg-[#F0F7FF] rounded cursor-pointer">BFSI</li>
                                                <li onClick={() => handleIndustrySelect("Fintech")} className="font-avenir font-[400] text-[14px] text-[#000] p-2 hover:bg-[#F0F7FF] rounded cursor-pointer">Fintech</li>
                                                <li onClick={() => handleIndustrySelect("Accounting")} className="font-avenir font-[400] text-[14px] text-[#000] p-2 hover:bg-[#F0F7FF] rounded cursor-pointer">Accounting</li>
                                                <li onClick={() => handleIndustrySelect("Tax")} className="font-avenir font-[400] text-[14px] text-[#000] p-2 hover:bg-[#F0F7FF] rounded cursor-pointer">Tax</li>
                                            </ul>
                                        )}
                                    </div>

                                    {/* Healthcare */}
                                    <div className="mb-1">
                                        <div
                                            className="flex items-center justify-between cursor-pointer font-avenir font-[700] text-[14px] text-[#21527D] p-3 hover:bg-[#E6F0FA]"
                                            onClick={() => toggleSection('healthcare')}
                                        >
                                            Healthcare
                                            <span className={`transition-transform duration-200 ${expandedSections.healthcare ? 'rotate-180' : ''}`}>
                                                <DownArrowIconForm />
                                            </span>
                                        </div>

                                        {expandedSections.healthcare && (
                                            <ul className="ml-3 mb-1">
                                                <li onClick={() => handleIndustrySelect("Healthcare")} className="font-avenir font-[400] text-[14px] text-[#000] p-2 hover:bg-[#F0F7FF] rounded cursor-pointer">Healthcare</li>
                                                <li onClick={() => handleIndustrySelect("Pharma")} className="font-avenir font-[400] text-[14px] text-[#000] p-2 hover:bg-[#F0F7FF] rounded cursor-pointer">Pharma</li>
                                                <li onClick={() => handleIndustrySelect("Insurance (Health)")} className="font-avenir font-[400] text-[14px] text-[#000] p-2 hover:bg-[#F0F7FF] rounded cursor-pointer">Insurance (Health)</li>
                                                <li onClick={() => handleIndustrySelect("EMR")} className="font-avenir font-[400] text-[14px] text-[#000] p-2 hover:bg-[#F0F7FF] rounded cursor-pointer">EMR</li>
                                            </ul>
                                        )}
                                    </div>

                                    {/* Enterprise Ops */}
                                    <div className="mb-1">
                                        <div
                                            className="flex items-center justify-between cursor-pointer font-avenir font-[700] text-[14px] text-[#21527D] p-3 hover:bg-[#E6F0FA]"
                                            onClick={() => toggleSection('enterprise')}
                                        >
                                            Enterprise Ops
                                            <span className={`transition-transform duration-200 ${expandedSections.enterprise ? 'rotate-180' : ''}`}>
                                                <DownArrowIconForm />
                                            </span>
                                        </div>

                                        {expandedSections.enterprise && (
                                            <ul className="ml-3 mb-1">
                                                <li onClick={() => handleIndustrySelect("HR")} className="font-avenir font-[400] text-[14px] text-[#000] p-2 hover:bg-[#F0F7FF] rounded cursor-pointer">HR</li>
                                                <li onClick={() => handleIndustrySelect("Legal")} className="font-avenir font-[400] text-[14px] text-[#000] p-2 hover:bg-[#F0F7FF] rounded cursor-pointer">Legal</li>
                                                <li onClick={() => handleIndustrySelect("Procurement")} className="font-avenir font-[400] text-[14px] text-[#000] p-2 hover:bg-[#F0F7FF] rounded cursor-pointer">Procurement</li>
                                                <li onClick={() => handleIndustrySelect("Vendor Management")} className="font-avenir font-[400] text-[14px] text-[#000] p-2 hover:bg-[#F0F7FF] rounded cursor-pointer">Vendor Management</li>
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Industry Error Message - Only shows if organization name is already valid */}
                        {industryError && !nameError && (
                            <div className="flex items-start gap-1 mt-1">
                                <span className="font-avenir font-[400] text-[12px] leading-[26px] text-[#F1511B] italic">
                                    {industryError}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Organization Size Dropdown */}
                    <div className="flex flex-col gap-2">
                        <p className="font-avenir text-[12px] leading-[26px] text-[#000000]">
                            Organization Size
                        </p>

                        <div ref={sizeDropdownRef} className="relative">
                            <input
                                type="text"
                                readOnly
                                value={selectedSize || "Select size"}
                                onClick={() => {
                                    setOpen(!open);
                                    setIndustryOpen(false);
                                    setExpandedSections({
                                        logistics: false,
                                        finance: false,
                                        healthcare: false,
                                        enterprise: false
                                    });
                                }}
                                className={getDropdownInputStyles(sizeError)}
                                placeholder="Select size"
                            />
                            <span className={`absolute right-3 top-1/2 -translate-y-1/2 transition-transform duration-200 pointer-events-none ${open ? "rotate-180" : ""}`}>
                                <DownArrowIconForm />
                            </span>

                            {open && (
                                <div className="absolute top-full mt-1 w-full rounded-[6px] bg-[#FDFDFD] border border-[#21527D] shadow-[0px_0px_7px_0px_#00000040] z-50 overflow-scroll h-[100px] scrollbar-hide">
                                    <ul className="py-1">
                                        {["0-10", "11-50", "50-100", "101-250", "Above 250"].map((item) => (
                                            <li
                                                key={item}
                                                onClick={() => handleSizeSelect(item)}
                                                className="font-avenir cursor-pointer hover:bg-[#E6F0FA] transition-colors font-avenir font-[400] text-[16px] p-3 text-[#21527D] text-center"
                                            >
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Size Error Message - Only shows if organization name and industry are already valid */}
                        {sizeError && !nameError && !industryError && (
                            <div className="flex items-start gap-1 mt-1">
                                <span className="font-avenir font-[400] text-[12px] leading-[26px] text-[#F1511B] italic">
                                    {sizeError}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Continue Button */}
                <div>
                    <button
                        onClick={handleContinue}
                        className="w-full font-avenir font-bold text-[16px] leading-[26px] text-white bg-[#21527D] rounded-[10px] py-3 cursor-pointer mb-1 hover:bg-[#1a4166] transition-colors"
                    >
                        Continue
                    </button>

                    <div 
                    onClick={()=>navigate("/allusers")}
                    className="font-avenir font-bold text-[16px] leading-[26px] tracking-[0%] text-[#21527D] text-center cursor-pointer hover:underline">
                        Skip
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BusinessUser;