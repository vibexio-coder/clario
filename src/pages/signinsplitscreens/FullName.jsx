import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../../assets/images/icon.webp";

const FullName = () => {
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [emailError, setEmailError] = useState("");
    const [nameError, setNameError] = useState("");
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const trimmedEmail = email.trim();
        
        // Check if empty
        if (!trimmedEmail) {
            return "Email is required";
        }
        
        // Check if ends with @gmail.com
        if (!trimmedEmail.toLowerCase().endsWith("@gmail.com")) {
            return "Please enter a valid email address";
        }
        
        // Basic email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            return "Please enter a valid email address";
        }
        
        return "";
    };

    const validateFullName = (name) => {
        const trimmedName = name.trim();

        // Check if empty
        if (!trimmedName) {
            return "Full name is required";
        }

        // Check if contains only alphabets and spaces
        if (!/^[A-Za-z\s]+$/.test(trimmedName)) {
            return "Full name can only contain letters and spaces";
        }

        // Check if at least 2 characters
        if (trimmedName.length < 2) {
            return "Full name must be at least 2 characters long";
        }

        return "";
    };

    const handleContinue = () => {
        // Clear previous errors
        setEmailError("");
        setNameError("");
        
        // Step 1: Validate email first
        const emailValidationError = validateEmail(email);
        if (emailValidationError) {
            setEmailError(emailValidationError);
            return; // Stop here if email has error
        }
        
        // Step 2: If email is valid, then validate full name
        const nameValidationError = validateFullName(fullName);
        if (nameValidationError) {
            setNameError(nameValidationError);
            return;
        }
        
        // If both are valid, proceed
        navigate("/createpassword");
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        
        // Clear email error when user starts typing
        if (emailError) {
            setEmailError("");
        }
    };

    const handleNameChange = (e) => {
        const value = e.target.value;
        setFullName(value);

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

    const getEmailInputStyles = () => {
        const baseStyles = "w-full bg-[#F2F2F2] border rounded-[6px] px-4 py-3 font-avenir text-[16px] leading-[26px] outline-none focus:ring-1";

        if (emailError) {
            return `${baseStyles} border-[#F1511B] placeholder:text-[#F1511B] text-[#F1511B] focus:ring-[#F1511B] bg-[#FFFFFF]`;
        }

        return `${baseStyles} border-[#21527D] placeholder:text-[#21527D]/50 text-[#21527D] focus:ring-[#21527D]`;
    };

    const getNameInputStyles = () => {
        const baseStyles = "w-full bg-[#F2F2F2] border rounded-[6px] px-4 py-3 font-avenir text-[16px] leading-[26px] outline-none focus:ring-1";

        if (nameError) {
            return `${baseStyles} border-[#F1511B] placeholder:text-[#F1511B] text-[#F1511B] focus:ring-[#F1511B] bg-[#FFFFFF]`;
        }

        return `${baseStyles} border-[#21527D] placeholder:text-[#21527D]/50 text-[#21527D] focus:ring-[#21527D]`;
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
                    <h2 className="font-kollektif font-semibold lg:font-bold text-[20px] md:text-[24px] leading-[26px] text-[#21527D] mb-1">
                        Create your Clario account
                    </h2>
                    <p className="font-avenir font-normal text-[16px] leading-[26px] tracking-[0%] text-black">
                        Just a few details to get started.
                    </p>
                </div>

                {/* Email Input Field */}
                <div className="flex flex-col gap-2">
                    <p className="font-avenir text-[12px] leading-[26px] text-[#000000]">
                        Email
                    </p>

                    <input
                        type="text"
                        placeholder="name@gmail.com"
                        value={email}
                        onChange={handleEmailChange}
                        onKeyPress={handleKeyPress}
                        className={getEmailInputStyles()}
                    />

                    {/* Email Error Message */}
                    {emailError && (
                        <div className="flex items-start gap-1 mt-1">
                            <span className="font-avenir font-normal text-[12px] leading-[26px] text-[#F1511B] italic">
                                {emailError}
                            </span>
                        </div>
                    )}
                </div>

                {/* Full Name Input Field */}
                <div className="flex flex-col gap-2">
                    <p className="font-avenir text-[12px] leading-[26px] text-[#000000]">
                        Full name
                    </p>

                    <input
                        type="text"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={handleNameChange}
                        onKeyPress={handleKeyPress}
                        className={getNameInputStyles()}
                    />

                    {/* Name Error Message - Only shows if email is already valid */}
                    {nameError && !emailError && (
                        <div className="flex items-start gap-1 mt-1">
                            <span className="font-avenir font-normal text-[12px] leading-[26px] text-[#F1511B] italic">
                                {nameError}
                            </span>
                        </div>
                    )}
                </div>

                {/* Continue Button */}
                <button
                    onClick={handleContinue}
                    className="w-full font-avenir font-bold text-[16px] leading-[26px] text-white bg-[#21527D] rounded-[10px] py-3 cursor-pointer"
                >
                    Continue
                </button>

            </div>
        </div>
    );
};

export default FullName;