import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../../assets/images/icon.webp";
import GoogleIcon from "../../assets/icons/loginpages/GoogleIcon";
import MailIcon from "../../assets/icons/loginpages/MailIcon";

const SignupOrIn = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const trimmedEmail = email.trim();

        // Check if empty
        if (!trimmedEmail) {
            return "Email is required";
        }

        // Check if ends with @gmail.com
        if (!trimmedEmail.toLowerCase().endsWith("@gmail.com")) {
            return "Please enter a valid email address.";
        }

        // Basic email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            return "Please enter a valid email address";
        }

        return "";
    };

    const handleContinue = () => {
        const validationError = validateEmail(email);

        if (validationError) {
            setError(validationError);
            return;
        }

        // Clear any previous error
        setError("");

        // Route to /password page
        navigate("/password");
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        // Clear error when user starts typing
        if (error) {
            setError("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleContinue();
        }
    };

    const getInputStyles = () => {
        const baseStyles = "w-full border rounded-[6px] px-4 py-3 font-avenir text-[16px] leading-[26px] outline-none focus:ring-1";

        if (error) {
            return `${baseStyles} bg-[#F2F2F2] border-[#F1511B] placeholder:text-[#F1511B] text-[#F1511B] focus:ring-[#F1511B] bg-[#FFFFFF]`;
        }

        return `${baseStyles} bg-[#F2F2F2] border-[#21527D] placeholder:text-[#21527D]/50 text-[#21527D] focus:ring-[#21527D]`;
    };

    return (
        <div className="w-full max-w-[500px] bg-white shadow-[0px_0px_7px_0px_#00000040] md:rounded-[20px] px-10 py-8 flex flex-col gap-5">
            {/* Logo */}
            <div className="flex justify-center">
                <img src={icon} alt="logo" className="w-[150px] h-[60px] object-contain" />
            </div>

            {/* Title */}
            <h2 className="font-kollektif font-semibold lg:font-bold text-[24px] leading-[26px] text-[#21527D]">
                Sign in to Clario
            </h2>

            {/* Description + Input */}
            <div className="flex flex-col gap-2">
                <p className="font-avenir text-[12px] leading-[26px] text-[#000000]">
                    Enter your email or phone number to continue.
                </p>

                <input
                    type="text"
                    placeholder="name@gmail.com"
                    value={email}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className={getInputStyles()}
                />

                {/* Error Message */}
                {error && (
                    <div className="flex items-start gap-1 mt-1">
                        <span className="font-avenir font-normal text-[12px] leading-[26px] text-[#F1511B] italic">
                            {error}
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

            {/* OR Divider */}
            <div className="flex items-center justify-center gap-3">
                <div className="flex-1 border-t border-[#C7C7C7]" />
                <span className="font-avenir font-bold text-[16px] text-[#C7C7C7]">
                    Or
                </span>
                <div className="flex-1 border-t border-[#C7C7C7]" />
            </div>

            {/* Social Buttons */}
            <div className="flex justify-center gap-4">
                <button className="w-[50px] h-[50px] bg-[#FDFDFD] shadow-[0px_0px_7px_0px_#21527D40] rounded-full flex items-center justify-center cursor-pointer">
                    <GoogleIcon />
                </button>

                <button className="w-[50px] h-[50px] bg-[#FDFDFD] shadow-[0px_0px_7px_0px_#21527D40] rounded-full flex items-center justify-center cursor-pointer">
                    <MailIcon />
                </button>
            </div>

            {/* Footer */}
            <p className="text-center font-avenir text-[16px] leading-[26px] text-[#121212]">
                Don't have an account?{" "}
                <span
                    onClick={() => navigate("/fullname")}
                    className="text-[#21527D] font-bold cursor-pointer hover:underline"
                >
                    Create one
                </span>
            </p>
        </div>
    );
};

export default SignupOrIn;