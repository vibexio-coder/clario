import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../../assets/images/icon.webp";

const BusinessDetected = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    // The correct OTP code
    const correctOtp = "123456";

    const handleChange = (index, value) => {
        // Only allow numbers
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Clear error when user starts typing
        if (error) {
            setError("");
        }

        // Auto focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // Move to previous input on backspace if current is empty
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text");
        const numbers = pasteData.replace(/\D/g, "").split("").slice(0, 6);

        if (numbers.length === 6) {
            const newOtp = [...otp];
            numbers.forEach((num, index) => {
                newOtp[index] = num;
            });
            setOtp(newOtp);

            // Focus the last input
            inputRefs.current[5].focus();
        }
    };

    const handleVerify = () => {
        const enteredOtp = otp.join("");

        // Check if all fields are filled
        if (enteredOtp.length !== 6) {
            setError("Please enter the complete 6-digit code");
            return;
        }

        // Check if OTP matches
        if (enteredOtp !== correctOtp) {
            setError("Invalid verification code. Please try again.");
            return;
        }

        // Clear error
        setError("");

        // Route to landing page
        navigate("/landingpage");
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleVerify();
        }
    };

    const handleBusiness = () => {
        const data = JSON.parse(localStorage.getItem("signupData"));

        if (!data) {
            setError("Signup data missing. Please start again.");
            return;
        }

        data.accountType = "business"; // ✅ FIX

        localStorage.setItem("signupData", JSON.stringify(data));

        console.log("🟡 STEP 3 (business):", data);

        navigate("/businessuser");
    };

    const handlePersonal = () => {
        const data = JSON.parse(localStorage.getItem("signupData"));

        if (!data) {
            setError("Signup data missing. Please start again.");
            return;
        }

        data.accountType = "personal"; // ✅ FIX

        localStorage.setItem("signupData", JSON.stringify(data));

        console.log("🟡 STEP 3 (personal):", data);

        navigate("/allusers");
    };


    const getInputStyles = () => {
        const baseStyles = "w-full bg-[#F2F2F2] border rounded-[6px] px-4 py-3 font-avenir text-[16px] leading-[26px] outline-none focus:ring-1";

        if (error) {
            return `${baseStyles} border-[#F1511B] placeholder:text-[#F1511B]/50 text-[#F1511B] focus:ring-[#F1511B]`;
        }

        return `${baseStyles} border-[#21527D] placeholder:text-[#21527D] text-[#21527D] focus:ring-[#21527D]`;
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
                    <p className="font-avenir font-normal text-[16px] leading-[26px] tracking-[0%] text-[#21527D]">
                        We detected this email is used for business. You can update this later.
                    </p>
                </div>

                {/* Continue Button */}
                <button
                    onClick={handleBusiness}
                    className="w-full font-avenir font-bold text-[16px] leading-[26px] text-white bg-[#21527D] rounded-[10px] py-3 cursor-pointer"
                >
                    Continue
                </button>

                <button
                    onClick={handlePersonal}
                    className="w-full font-avenir font-bold text-[16px] leading-[26px] text-[#21527D] bg-[#82A9CC]/30 rounded-[10px] py-3 cursor-pointer"
                >
                    Use as personal account
                </button>


            </div>
        </div>
    );
};

export default BusinessDetected;