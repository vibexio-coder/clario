import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../../assets/images/icon.webp";
import DownArrowIconForm from "../../assets/icons/DownArrowIconForm";
import api from "../../api/axios";

const AllUsers = () => {
    const [selectedUseCase, setSelectedUseCase] = useState("");
    const [error, setError] = useState("");
    const [otherUseCase, setOtherUseCase] = useState("");


    // Dropdown state
    const [open, setOpen] = useState(false);

    // Ref for dropdown
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const validateUseCase = () => {
        if (!selectedUseCase || selectedUseCase === "Select size") {
            return "Please select primary use case";
        }

        if (selectedUseCase === "Other" && !otherUseCase.trim()) {
            return "Please enter your use case";
        }

        return "";
    };


    const handleFinishSetup = async () => {
        const validationError = validateUseCase();
        if (validationError) {
            setError(validationError);
            return;
        }

        setError("");

        const finalUseCase =
            selectedUseCase === "Other" ? otherUseCase : selectedUseCase;

        // 🔥 READ ALL PREVIOUS STEPS DATA
        const existingData =
            JSON.parse(localStorage.getItem("signupData")) || {};

        if (!existingData.email && !existingData.phone) {
            setError("Signup data missing. Please restart signup.");
            return;
        }

        // 🔥 FINAL PAYLOAD (MATCH BACKEND)
        const finalPayload = {
            fullName: existingData.full_name || existingData.fullName,
            email: existingData.email || null,
            phone: existingData.phone || null,
            password: existingData.password,
            accountType: existingData.accountType,
            organizationName: existingData.organizationName || null,
            industry: existingData.industry || null,
            organizationSize: existingData.organizationSize || null,
            primaryUseCase: finalUseCase,
        };


        console.log("🔥 FINAL SIGNUP PAYLOAD:", finalPayload);

        try {
            // ✅ ONE AND ONLY API CALL
            const res = await api.post("/auth/signup", finalPayload);

            console.log("✅ SIGNUP SUCCESS:", res.data);

            localStorage.setItem("userId", res.data.userId);
            // 🧹 CLEANUP
            localStorage.removeItem("signupData");

            navigate("/landingpage"); // or signin page
        } catch (err) {
            console.error("❌ FINAL SIGNUP ERROR:", err.response || err);
            setError(
                err.response?.data?.message ||
                "Something went wrong. Please try again."
            );
        }
    };



    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleFinishSetup();
        }
    };

    // Handle use case selection
    const handleUseCaseSelect = (useCase) => {
        setSelectedUseCase(useCase);
        setOpen(false);

        if (useCase !== "Other") {
            setOtherUseCase(""); // 🔹 Other illa na input clear
        }

        if (error) {
            setError("");
        }
    };

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const getDropdownInputStyles = () => {
        const baseStyles = "w-full bg-[#F2F2F2] border rounded-[6px] px-4 py-3 font-avenir text-[16px] leading-[26px] outline-none focus:ring-1 pr-12 cursor-pointer";

        if (error) {
            return `${baseStyles} border-[#F1511B] placeholder:text-[#F1511B] text-[#F1511B] focus:ring-[#F1511B] bg-[#FFFFFF]`;
        }

        return `${baseStyles} border-[#21527D] placeholder:text-[#21527D]/50 text-[#21527D]/50 focus:ring-[#21527D]`;
    };

    return (
        <div className="h-full md:min-h-screen flex items-center justify-center py-1 md:py-0 bg-[#FAFDFF] overflow-y-auto">
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

                {/* Use Case Dropdown */}
                <div className="flex flex-col gap-2">
                    <p className="font-avenir text-[12px] leading-[26px] text-[#000000]">
                        Primary use case
                    </p>

                    <div ref={dropdownRef} className="relative">
                        <input
                            type="text"
                            readOnly
                            value={selectedUseCase || "Select primary use case"}
                            onClick={() => setOpen(!open)}
                            onKeyPress={handleKeyPress}
                            className={getDropdownInputStyles()}
                            placeholder="Select primary use case"
                        />
                        <span className={`absolute right-3 top-1/2 -translate-y-1/2 transition-transform duration-200 pointer-events-none ${open ? "rotate-180" : ""}`}>
                            <DownArrowIconForm />
                        </span>

                        {open && (
                            <div className="absolute top-full mt-1 w-full rounded-[6px] bg-[#FDFDFD] border border-[#21527D] shadow-[0px_0px_7px_0px_#00000040] z-50 overflow-y-auto h-[100px] md:max-h-[200px] scrollbar-hide">
                                <ul className="py-1">
                                    {["Invoice OCR", "Handwritten OCR", "ID / Document OCR", "Other"].map((item) => (
                                        <li
                                            key={item}
                                            onClick={() => handleUseCaseSelect(item)}
                                            className="font-avenir cursor-pointer hover:bg-[#E6F0FA] transition-colors font-avenir font-[400] text-[16px] p-3 text-[#21527D]"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* OTHER INPUT */}
                    {selectedUseCase === "Other" && (
                        <input
                            type="text"
                            value={otherUseCase}
                            onChange={(e) => setOtherUseCase(e.target.value)}
                            placeholder="Please specify your use case"
                            className={`w-full mt-2 bg-[#FFFFFF] border rounded-[6px] px-4 py-3
        font-avenir text-[16px] leading-[26px] outline-none
        ${error ? "border-[#F1511B]" : "border-[#21527D]"}
        focus:ring-1 focus:ring-[#21527D]`}
                        />
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="flex items-start gap-1 mt-1">
                            <span className="font-avenir font-[400] text-[12px] leading-[26px] text-[#F1511B] italic">
                                {error}
                            </span>
                        </div>
                    )}
                </div>

                {/* Finish Setup Button */}
                <button
                    onClick={handleFinishSetup}
                    className="w-full font-avenir font-bold text-[16px] leading-[26px] text-white bg-[#21527D] rounded-[10px] py-3 cursor-pointer hover:bg-[#1a4166] transition-colors"
                >
                    Finish setup
                </button>

            </div>
        </div>
    );
};

export default AllUsers;