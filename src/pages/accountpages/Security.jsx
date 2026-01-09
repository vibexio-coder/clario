import React, { useState } from 'react';
import EditIcon from '../../assets/icons/accountpage/EditIcon';
import Navbar from '../landingpages/Navbar';
import api from "../../api/axios";


const Security = () => {
    const [password, setPassword] = useState("********");
    const [mfa, setMfa] = useState("");
    const [error, setError] = useState("");

    // ✅ edit mode state (same pattern as Account page)
    const [isEditingPassword, setIsEditingPassword] = useState(false);

    const getInputStyles = () => {
        const baseStyles =
            "md:max-w-[500px] w-full bg-[#F2F2F2] border rounded-[6px] px-4 py-3 font-avenir text-[16px] leading-[26px] outline-none focus:ring-1 pr-12 transition-colors duration-200";

        if (error) {
            return `${baseStyles} border-[#F1511B] placeholder:text-[#F1511B] text-[#F1511B] focus:ring-[#F1511B] bg-[#FFFFFF]`;
        }

        return `${baseStyles} border-[#21527D] placeholder:text-[#21527D]/50 text-[#21527D] focus:ring-[#21527D]`;
    };

    // ✅ Password validation (as given)
    const validatePassword = (password) => {
        const trimmedPassword = password.trim();

        if (!trimmedPassword) {
            return "Password is required";
        }
        if (trimmedPassword.length < 8) {
            return "Password must be at least 8 characters long";
        }
        if (!/[A-Z]/.test(trimmedPassword)) {
            return "Password must contain at least one uppercase letter";
        }
        if (!/[a-z]/.test(trimmedPassword)) {
            return "Password must contain at least one lowercase letter";
        }
        if (!/[0-9]/.test(trimmedPassword)) {
            return "Password must contain at least one number";
        }
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(trimmedPassword)) {
            return "Password must contain at least one special character";
        }

        return "";
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (error) setError("");
    };

    const handleUpdatePassword = async () => {
        const email = localStorage.getItem("email"); // ✅ ADD THIS LINE

        if (!email) {
            setError("Email not found. Please re-login.");
            return;
        }

        const validationError = validatePassword(password);
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            await api.post("/auth/reset-password", {
                email,
                newPassword: password,
            });

            setIsEditingPassword(false);
            setPassword("********");
            setError("");
            alert("Password changed successfully");

        } catch (err) {
            console.error(err);
            setError("Failed to update password");
        }
    };


    return (
        <div>
            <Navbar />
            <div className="w-full px-4 sm:px-6 lg:px-8 py-5 lg:py-10">
                <h2 className="font-avenir font-normal text-2xl sm:text-3xl lg:text-[32px] leading-[26px] text-[#21527D] mb-6 md:mb-8">
                    Security
                </h2>

                {/* Password Section */}
                <div className="flex flex-col gap-2 mb-6">
                    <label className="font-avenir font-normal text-base sm:text-[15px] lg:text-[16px] leading-[26px] text-[#000000]">
                        Password
                    </label>

                    {isEditingPassword ? (
                        <div className="w-full max-w-[700px] flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                            <div className="relative w-full">
                                <input
                                    type="password"
                                    placeholder="Enter new password"
                                    value={password === "********" ? "" : password}
                                    onChange={handlePasswordChange}
                                    className={getInputStyles()}
                                />
                            </div>

                            <button
                                onClick={handleUpdatePassword}
                                className="cursor-pointer font-avenir font-bold text-base sm:text-[15px] lg:text-[16px] leading-[26px] text-[#FFFFFF] bg-[#21527D] w-full sm:w-auto sm:min-w-[160px] h-[40px] rounded-[10px]"
                            >
                                Change password
                            </button>
                        </div>
                    ) : (
                        <div className="relative w-full max-w-[500px]">
                            <input
                                type="password"
                                value="********"
                                disabled
                                className={getInputStyles()}
                            />
                            <button
                                type="button"
                                onClick={() => setIsEditingPassword(true)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-80 transition-opacity"
                                aria-label="Edit password"
                            >
                                <EditIcon opacity={1} />
                            </button>
                        </div>
                    )}

                    <p className="font-avenir font-normal text-[10px] leading-[26px] tracking-[0%] text-[#21527D]">
                        Use at least 8 characters, including uppercase, lowercase , numbers and special characters.
                    </p>

                    {error && (
                        <p className="font-avenir text-xs sm:text-[12px] text-[#F1511B] italic mt-1">
                            {error}
                        </p>
                    )}
                </div>

                {/* MFA Section (unchanged) */}
                <div className="flex flex-col gap-2">
                    <label className="font-avenir font-normal text-base sm:text-[15px] lg:text-[16px] leading-[26px] text-[#000000]">
                        Multi-factor authentication
                    </label>

                    <div className="w-full max-w-[700px] flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                        <input
                            type="text"
                            placeholder="Not enabled"
                            value={mfa}
                            readOnly
                            className={getInputStyles()}
                        />

                        <button
                            className="cursor-pointer font-avenir font-bold text-base sm:text-[15px] lg:text-[16px] leading-[26px] text-[#FFFFFF] bg-[#21527D] w-full sm:w-auto sm:min-w-[160px] h-[40px] rounded-[10px]"
                        >
                            Enable MFA
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Security;
