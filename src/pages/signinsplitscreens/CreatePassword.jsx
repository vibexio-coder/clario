import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../../assets/images/icon.webp";
import EyeIcon from "../../assets/icons/loginpages/EyeIcon";

const CreatePassword = () => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const trimmedPassword = password.trim();

        // Check if empty
        if (!trimmedPassword) {
            return "Password is required";
        }

        // Check minimum length
        if (trimmedPassword.length < 8) {
            return "Password must be at least 8 characters long";
        }

        // Check for uppercase letters
        if (!/[A-Z]/.test(trimmedPassword)) {
            return "Password must contain at least one uppercase letter";
        }

        // Check for lowercase letters
        if (!/[a-z]/.test(trimmedPassword)) {
            return "Password must contain at least one lowercase letter";
        }

        // Check for numbers
        if (!/[0-9]/.test(trimmedPassword)) {
            return "Password must contain at least one number";
        }

        // Check for special characters
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(trimmedPassword)) {
            return "Password must contain at least one special character";
        }

        return "";
    };

    const handleCreateAccount = () => {
        const validationError = validatePassword(password);

        if (validationError) {
            setError(validationError);
            return;
        }

        if (!isChecked) {
            setError("You must agree to the Terms of Service and Privacy Policy");
            return;
        }

        setError("");

        // 🔥 ADD PASSWORD TO signupData (NO DB)
        const data = JSON.parse(localStorage.getItem("signupData"));

        if (!data) {
            setError("Signup data missing. Please start again.");
            return;
        }

        data.password = password;

        localStorage.setItem("signupData", JSON.stringify(data));

        console.log("🟡 STEP 2 (password added):", data);

        navigate("/businessdetected");
    };


    const handleInputChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        const existing = JSON.parse(localStorage.getItem("signupData")) || {};
        localStorage.setItem(
            "signupData",
            JSON.stringify({ ...existing, password: value })
        );
        // Clear error when user starts typing
        if (error) {
            setError("");
        }
    };

        const handleCheckboxChange = (e) => {
            const checked = e.target.checked;
            setIsChecked(checked);

            const existing = JSON.parse(localStorage.getItem("signupData")) || {};
            localStorage.setItem(
                "signupData",
                JSON.stringify({ ...existing, isChecked: checked })
            );

            if (error && error.includes("agree")) {
                setError("");
            }
        };

        const handleKeyPress = (e) => {
            if (e.key === "Enter") {
                handleCreateAccount();
            }
        };

        useEffect(() => {
            const savedData = JSON.parse(localStorage.getItem("signupData"));

            if (savedData) {
                if (savedData.password) setPassword(savedData.password);
                if (savedData.isChecked !== undefined) setIsChecked(savedData.isChecked);
            }
        }, []);

        const togglePasswordVisibility = () => {
            setShowPassword(!showPassword);
        };

        const getInputStyles = () => {
            const baseStyles = "w-full bg-[#F2F2F2] border rounded-[6px] px-4 py-3 font-avenir text-[16px] leading-[26px] outline-none focus:ring-1 pr-12";

            if (error && !error.includes("agree")) {
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
                        Create a password
                    </h2>

                    {/* Description + Input */}
                    <div className="flex flex-col gap-2">
                        <p className="font-avenir text-[12px] leading-[26px] text-[#000000]">
                            Create password
                        </p>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
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
                                <EyeIcon />
                            </button>
                        </div>

                        <p className="font-avenir font-normal text-[10px] leading-[26px] tracking-[0%] text-[#21527D]">
                            Use at least 8 characters, including uppercase, lowercase , numbers and special characters.
                        </p>

                        {/* Error Message for password */}
                        {error && !error.includes("agree") && (
                            <div className="flex items-start gap-1 mt-1">
                                <span className="font-avenir font-[400] text-[12px] leading-[26px] text-[#F1511B] italic">
                                    {error}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-center">
                        <input
                            type='checkbox'
                            className="mr-2 mt-1 cursor-pointer"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        />
                        <div className="font-avenir font-semibold md:font-bold text-[10px] md:text-[14px] leading-[26px] tracking-[0%] text-[#21527D] cursor-pointer">
                            I agree to Clario's Terms of Service and Privacy Policy
                        </div>
                    </div>

                    {/* Error Message for terms */}
                    {error && error.includes("agree") && (
                        <div className="flex items-start gap-1">
                            <span className="font-avenir font-[400] text-[12px] leading-[26px] text-[#F1511B] italic">
                                {error}
                            </span>
                        </div>
                    )}

                    {/* Create Account Button */}
                    <button
                        onClick={handleCreateAccount}
                        className="w-full font-avenir font-bold text-[16px] leading-[26px] text-white bg-[#21527D] rounded-[10px] py-3 cursor-pointer"
                    >
                        Create account
                    </button>

                </div>
            </div>
        );
    };

    export default CreatePassword;