import React, { useState } from 'react';
import EditIcon from '../../assets/icons/accountpage/EditIcon';
import Navbar from '../landingpages/Navbar';

const Security = () => {
    const [password, setPassword] = useState("********");
    const [mfa, setMfa] = useState("");
    const [error, setError] = useState("");

    const getInputStyles = () => {
        const baseStyles =
            "md:max-w-[500px] w-full bg-[#F2F2F2] border rounded-[6px] px-4 py-3 font-avenir text-[16px] leading-[26px] outline-none focus:ring-1 pr-12 transition-colors duration-200";

        if (error) {
            return `${baseStyles} border-[#F1511B] placeholder:text-[#F1511B] text-[#F1511B] focus:ring-[#F1511B] bg-[#FFFFFF]`;
        }

        return `${baseStyles} border-[#21527D] placeholder:text-[#21527D]/50 text-[#21527D] focus:ring-[#21527D]`;
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (error) setError("");
    };

    const handleMfaChange = (e) => {
        setMfa(e.target.value);
        if (error) setError("");
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.target.value.trim()) {
            setError("This field is required");
        }
    };

    return (
        <div>
            <Navbar/>
            <div className="w-full px-4 sm:px-6 lg:px-8 py-5 lg:py-10">
                <h2 className="font-avenir font-normal text-2xl sm:text-3xl lg:text-[32px] leading-[26px] text-[#21527D] mb-6 md:mb-8">
                    Security
                </h2>

                {/* Password Section */}
                <div className="flex flex-col gap-2 mb-6">
                    <label className="font-avenir font-normal text-base sm:text-[15px] lg:text-[16px] leading-[26px] text-[#000000]">
                        Password
                    </label>

                    <div className="w-full max-w-[700px] flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                        <div className="relative w-full">
                            <input
                                type="password"
                                placeholder="* * * * * *"
                                value={password}
                                onChange={handlePasswordChange}
                                onKeyPress={handleKeyPress}
                                className={getInputStyles()}
                            />
                        </div>

                        <button
                            className="cursor-pointer font-avenir font-bold text-base sm:text-[15px] lg:text-[16px] leading-[26px] text-[#FFFFFF] bg-[#21527D] w-full sm:w-auto sm:min-w-[160px] h-[40px] rounded-[10px]"
                        >
                            Change password
                        </button>
                    </div>

                    <p className="font-avenir font-normal text-xs sm:text-[12px] leading-[18px] sm:leading-[20px] lg:leading-[26px] text-black/80 mt-1 max-w-[500px]">
                        Last updated 3 months ago
                    </p>

                    {/* Error */}
                    {error && (
                        <p className="font-avenir text-xs sm:text-[12px] text-[#F1511B] italic mt-1">
                            {error}
                        </p>
                    )}
                </div>

                {/* MFA Section */}
                <div className="flex flex-col gap-2">
                    <label className="font-avenir font-normal text-base sm:text-[15px] lg:text-[16px] leading-[26px] text-[#000000]">
                        Multi-factor authentication
                    </label>

                    <div className="w-full max-w-[700px] flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Not enabled"
                                value={mfa}
                                onChange={handleMfaChange}
                                onKeyPress={handleKeyPress}
                                className={getInputStyles()}
                                readOnly
                            />
                        </div>

                        <button
                            className="cursor-pointer font-avenir font-bold text-base sm:text-[15px] lg:text-[16px] leading-[26px] text-[#FFFFFF] bg-[#21527D] w-full sm:w-auto sm:min-w-[160px] h-[40px] rounded-[10px]"
                        >
                            Enable MFA
                        </button>
                    </div>

                    {/* Error */}
                    {error && (
                        <p className="font-avenir text-xs sm:text-[12px] text-[#F1511B] italic mt-1">
                            {error}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Security;