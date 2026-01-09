import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../../assets/images/icon.webp";
import EyeIcon from "../../assets/icons/loginpages/EyeIcon";
import api from "../../api/axios";

const Password = () => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const loginType = localStorage.getItem("loginType"); // "email" or "phone"
    const loginValue = localStorage.getItem("loginValue");


    // Temporary correct password
    const correctPassword = "Clario123";

    const handleLogin = async () => {
        if (!password || !password.trim()) {
            setError("Password is required");
            return;
        }

        if (!loginType || !loginValue) {
            navigate("/");
            return;
        }

        try {
            const payload =
                loginType === "email"
                    ? { email: loginValue.toLowerCase(), password }
                    : { phone: loginValue, password };

            const res = await api.post("/auth/login", payload);

            localStorage.setItem("userId", res.data.userId);

            if (loginType === "email") {
                localStorage.setItem("email", loginValue.toLowerCase());
            }
            localStorage.removeItem("loginType");
            localStorage.removeItem("loginValue");

            navigate("/landingpage");
        } catch (err) {
            setError("Invalid email/phone or password");
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        // Clear error when user starts typing
        if (error) {
            setError("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleLogin();
        }
    };

    const handleForgotPassword = async () => {
        try {
            const payload =
                loginType === "email"
                    ? { email: loginValue }
                    : { phone: loginValue };

            await api.post("/auth/forgot-password", payload);

            navigate("/otp", { state: { from: "forgot-password" } });
        } catch (err) {
            if (err.response?.status === 429) {
                setError(err.response.data.message);
            } else {
                setError("Failed to send OTP. Please try again.");
            }
        }
    };


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const getInputStyles = () => {
        const baseStyles = "w-full bg-[#F2F2F2] border rounded-[6px] px-4 py-3 font-avenir text-[16px] leading-[26px] outline-none focus:ring-1 pr-12";

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

                {/* Title */}
                <h2 className="font-kollektif font-semibold lg:font-bold text-[24px] leading-[26px] text-[#21527D]">
                    Enter your password
                </h2>

                {/* Description + Input */}
                <div className="flex flex-col gap-2">
                    <p className="font-avenir text-[12px] leading-[26px] text-[#000000]">
                        Password
                    </p>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            className={getInputStyles()}
                        />

                        {/* Eye Icon Button for password visibility toggle */}
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer focus:outline-none"
                        >
                            <EyeIcon opacity={1} />
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="flex items-start gap-1 mt-1">
                            <span className="font-avenir font-[400] text-[12px] leading-[26px] text-[#F1511B] italic">
                                {error}
                            </span>
                        </div>
                    )}
                </div>

                {/* Continue Button */}
                <button
                    onClick={handleLogin}
                    className="w-full font-avenir font-bold text-[16px] leading-[26px] text-white bg-[#21527D] rounded-[10px] py-3 cursor-pointer"
                >
                    Sign in
                </button>

                <div
                    onClick={handleForgotPassword}
                    className="font-avenir font-bold text-[16px] leading-[26px] tracking-[0%] text-[#21527D] text-center cursor-pointer">
                    Forgot password ?
                </div>
            </div>
        </div>
    );
};

export default Password;