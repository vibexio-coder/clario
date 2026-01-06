import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../../assets/images/icon.webp";
import api from "../../api/axios";
import EyeIcon from "../../assets/icons/loginpages/EyeIcon";

const NewPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [resetSuccess, setResetSuccess] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    // 🔹 Password validation
    const validatePassword = (password) => {
        if (!password) {
            return "Password required";
        }

        if (password.length < 8) {
            return "Minimum 8 characters";
        }

        if (!/(?=.*[a-z])/.test(password)) {
            return "At least one lowercase letter";
        }

        if (!/(?=.*[A-Z])/.test(password)) {
            return "At least one uppercase letter";
        }

        if (!/(?=.*\d)/.test(password)) {
            return "At least one number";
        }

        if (!/(?=.*[@$!%*?&])/.test(password)) {
            return "At least one special character (@$!%*?&)";
        }

        return "";
    };

    // 🔹 Confirm password validation
    const validateConfirmPassword = (confirmPassword) => {
        if (!confirmPassword) {
            return "Please confirm your password";
        }

        if (confirmPassword !== newPassword) {
            return "Passwords don't match";
        }

        return "";
    };

    const handleNewPasswordChange = (e) => {
        const value = e.target.value;
        setNewPassword(value);
        if (newPasswordError) setNewPasswordError("");

        // Validate confirm password if it exists
        if (confirmPassword) {
            const confirmError = validateConfirmPassword(confirmPassword);
            setConfirmPasswordError(confirmError);
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);

        const error = validateConfirmPassword(value);
        setConfirmPasswordError(error);
    };

    const handleResetPassword = async () => {
        setIsLoading(true);
        setNewPasswordError("");
        setConfirmPasswordError("");

        // 1️⃣ validate new password
        const passwordValidationError = validatePassword(newPassword);
        if (passwordValidationError) {
            setNewPasswordError(passwordValidationError);
            setIsLoading(false);
            return;
        }

        // 2️⃣ validate confirm password
        const confirmValidationError = validateConfirmPassword(confirmPassword);
        if (confirmValidationError) {
            setConfirmPasswordError(confirmValidationError);
            setIsLoading(false);
            return;
        }

        try {
            // 3️⃣ CALL BACKEND API
            const response = await api.post("/auth/reset-password", {
                email: localStorage.getItem("resetEmail"), 
                newPassword,
            });

            // 4️⃣ SUCCESS → ROUTE CHANGE
            if (response.status === 200) {
                navigate("/signin"); 
            }

        } catch (error) {
            setNewPasswordError(
                error.response?.data?.message || "Something went wrong"
            );
        } finally {
            setIsLoading(false);
        }
    };



    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleResetPassword();
        }
    };

    const getInputStyles = (hasError) => {
        const base = "w-full bg-[#F2F2F2] border rounded-[6px] px-4 py-3 font-avenir text-[16px] leading-[26px] outline-none focus:ring-1 pr-10";

        if (hasError) {
            return `${base} border-[#F1511B] text-[#F1511B] focus:ring-[#F1511B] bg-white`;
        }

        return `${base} border-[#21527D] text-[#21527D] focus:ring-[#21527D]`;
    };

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    if (resetSuccess) {
        return (
            <div className="h-full md:min-h-screen flex items-center justify-center py-1 md:py-0 bg-[#FAFDFF]">
                <div className="w-full max-w-[500px] bg-white shadow-[0px_0px_7px_0px_#00000040] md:rounded-[20px] px-10 py-8 flex flex-col gap-5">
                    <div className="flex justify-center">
                        <img
                            src={icon}
                            alt="logo"
                            className="w-[150px] h-[60px] object-contain"
                        />
                    </div>

                    <div className="text-center">
                        <h2 className="font-kollektif font-semibold lg:font-bold text-[20px] md:text-[24px] leading-[26px] text-[#21527D] mb-1">
                            Password Reset Successful!
                        </h2>
                        <p className="font-avenir font-normal text-[16px] leading-[26px] text-black">
                            Your password has been reset successfully.
                        </p>
                        <p className="font-avenir font-normal text-[14px] leading-[26px] text-gray-600 mt-2">
                            You will be redirected to the login page in a few seconds...
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/signin")}
                        className="w-full font-avenir font-bold text-[16px] leading-[26px] text-white bg-[#21527D] rounded-[10px] py-3"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full md:min-h-screen flex items-center justify-center py-1 md:py-0 bg-[#FAFDFF]">
            <div className="w-full max-w-[500px] bg-white shadow-[0px_0px_7px_0px_#00000040] md:rounded-[20px] px-10 py-8 flex flex-col gap-5">
                <div className="flex justify-center">
                    <img
                        src={icon}
                        alt="logo"
                        className="w-[150px] h-[60px] object-contain"
                    />
                </div>

                <div>
                    <h2 className="font-kollektif font-semibold lg:font-bold text-[20px] md:text-[24px] leading-[26px] text-[#21527D] mb-1">
                        Reset Your Password
                    </h2>
                    <p className="font-avenir font-normal text-[16px] leading-[26px] text-black">
                        We’ll help you get back into your account
                    </p>
                </div>

                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <p className="font-avenir text-[12px] leading-[26px] text-black">
                            New Password
                        </p>
                        <div className="relative mb-3">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                placeholder="Enter your New Password"
                                value={newPassword}
                                onChange={handleNewPasswordChange}
                                onKeyPress={handleKeyPress}
                                className={getInputStyles(newPasswordError)}
                            />
                            <button
                                type="button"
                                onClick={toggleNewPasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer focus:outline-none"
                            >
                                <EyeIcon opacity={1} />
                            </button>
                        </div>
                        {newPasswordError && (
                            <span className="text-[#F1511B] text-[12px] italic">
                                {newPasswordError}
                            </span>
                        )}

                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                onKeyPress={handleKeyPress}
                                className={getInputStyles(confirmPasswordError)}
                            />
                            <button
                                type="button"
                                onClick={toggleConfirmPasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer focus:outline-none"
                            >
                                <EyeIcon opacity={1} />
                            </button>
                        </div>

                        <p className="font-avenir font-normal text-[10px] leading-[26px] tracking-[0%] text-[#21527D]">
                            Use at least 8 characters, including uppercase, lowercase , numbers and special characters.
                        </p>

                        {confirmPasswordError && (
                            <span className="text-[#F1511B] text-[12px] italic">
                                {confirmPasswordError}
                            </span>
                        )}
                    </div>
                </div>

                <button
                    onClick={handleResetPassword}
                    disabled={isLoading}
                    className={`w-full cursor-pointer font-avenir font-bold text-[16px] leading-[26px] text-white bg-[#21527D] rounded-[10px] py-3 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    Send Reset Code
                </button>

                <div className="font-avenir font-normal text-[16px] leading-[26px] tracking-[0] text-[#121212] text-center">
                    Remember your password?{" "}
                    <span
                        onClick={() => navigate("/signin")}
                        className="text-[#21527D] cursor-pointer"
                    >
                        Log in
                    </span>
                </div>
            </div>
        </div>
    );
};

export default NewPassword;