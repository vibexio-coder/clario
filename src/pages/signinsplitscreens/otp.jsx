import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../../assets/images/icon.webp";
import api from "../../api/axios";

const Otp = () => {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [message, setMessage] = useState("");


    // The correct OTP code
    const correctOtp = "123456";

    const handleChange = (e) => {
        const value = e.target.value;
        // Only allow numbers and limit to 6 digits
        if (/^\d{0,6}$/.test(value)) {
            setOtp(value);
            // Clear error when user starts typing
            if (error) {
                setError("");
            }
        }
    };

    const handleVerify = async () => {
        if (otp.length !== 6) {
            setError("Please enter the complete 6-digit code");
            return;
        }

        try {
            const email = localStorage.getItem("loginValue");

            await api.post("/auth/verify-otp", {
                email,
                otp,
            });

            setError("");
            localStorage.setItem("resetEmail", email);
            navigate("/newpassword"); 
        } catch (err) {
            setError("Invalid verification code. Please try again.");
        }
    };
    const handleResendOtp = async () => {
        try {
            const email = localStorage.getItem("loginValue");

            const res = await api.post("/auth/forgot-password", { email });

            if (res.data.alreadySent) {
                setMessage("OTP already sent. Please check your email.");
            } else {
                setMessage("New OTP sent to your email.");
            }

            setError(""); // clear error
        } catch (err) {
            setMessage("");
            setError("Unable to resend OTP. Please try again later.");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleVerify();
        }
    };

    const getInputStyles = () => {
        const baseStyles = "w-full bg-[#F2F2F2] border rounded-[6px] px-4 py-3 font-avenir text-[16px] leading-[26px] outline-none focus:ring-1";

        if (error) {
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
                    <h2 className="font-kollektif font-semibold lg:font-bold text-[24px] leading-[26px] text-[#21527D] mb-1">
                        Verify your identity
                    </h2>
                    <p className="font-avenir font-normal text-[16px] leading-[26px] tracking-[0%] text-black">
                        We've sent a one-time code to your email or phone.
                    </p>
                </div>

                {/* OTP Input Field */}
                <div className="flex flex-col gap-2">
                    <p className="font-avenir text-[12px] leading-[26px] text-[#000000]">
                        Verification code
                    </p>

                    <input
                        type="text"
                        placeholder="Enter 6-digit code"
                        value={otp}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        className={getInputStyles()}
                        maxLength="6"
                    />

                    {/* Error Message */}
                    {error && (
                        <div className="flex items-start gap-1 mt-1">
                            <span className="font-avenir font-[400] text-[12px] leading-[26px] text-[#F1511B] italic">
                                {error}
                            </span>
                        </div>
                    )}
                    {message && (
                        <div className="flex items-start gap-1 mt-1">
                            <span className="font-avenir font-[400] text-[12px] leading-[26px] text-[#21527D] italic">
                                {message}
                            </span>
                        </div>
                    )}

                </div>

                {/* Continue Button */}
                <button
                    onClick={handleVerify}
                    className="w-full font-avenir font-bold text-[16px] leading-[26px] text-white bg-[#21527D] rounded-[10px] py-3 cursor-pointer"
                >
                    Verify & Continue
                </button>

                <div
                    onClick={handleResendOtp}
                    className="font-avenir font-bold text-[16px] leading-[26px] tracking-[0%] text-[#21527D] text-center cursor-pointer">
                    Didn't receive the code? Resend
                </div>
            </div>
        </div>
    );
};

export default Otp;