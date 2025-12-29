import React, { useState } from "react";
import EditIcon from "../../assets/icons/accountpage/EditIcon";

const Account = () => {
    const [fullName, setFullName] = useState("");
    const [error, setError] = useState("");

    const getInputStyles = () => {
        const baseStyles =
            "w-full bg-[#F2F2F2] border rounded-[6px] px-4 py-3 font-avenir text-[16px] leading-[26px] outline-none focus:ring-1 pr-12";

        if (error) {
            return `${baseStyles} border-[#F1511B] placeholder:text-[#F1511B] text-[#F1511B] focus:ring-[#F1511B] bg-[#FFFFFF]`;
        }

        return `${baseStyles} border-[#21527D] placeholder:text-[#21527D]/50 text-[#21527D] focus:ring-[#21527D]`;
    };

    const handleInputChange = (e) => {
        setFullName(e.target.value);
        if (error) setError("");
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !fullName.trim()) {
            setError("Full name is required");
        }
    };

    return (
        <div className="max-w-[500px]">
            {/* Title */}
            <h1 className="font-avenir font-normal text-[32px] leading-[26px] text-[#21527D] mb-6">
                Profile
            </h1>

            {/* Field */}
            <div className="flex flex-col gap-2">
                <p className="font-avenir font-normal text-[16px] leading-[26px] text-[#000000]">
                    Full name
                </p>

                <div className="relative">
                    <input
                        type="text"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        className={getInputStyles()}
                    />

                    {/* Edit Icon */}
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                        <EditIcon opacity={1} />
                    </button>
                </div>

                {/* Error */}
                {error && (
                    <p className="font-avenir text-[12px] text-[#F1511B] italic">
                        {error}
                    </p>
                )}
            </div>


            <div className="flex flex-col gap-2">
                <p className="font-avenir font-normal text-[16px] leading-[26px] text-[#000000]">
                    Email address
                </p>
                <div className="flex justify-between items-baseline gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Enter your address"
                            value={fullName}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            className={getInputStyles()}
                        />
                    </div>
                    <button className="font-avenir font-bold text-[16px] leading-[26px] text-[#FFFFFF]
bg-[#21527D] w-[160px] h-[40px] rounded-[10px]">
                        Change email
                    </button>
                </div>


                {/* Error */}
                {error && (
                    <p className="font-avenir text-[12px] text-[#F1511B] italic">
                        {error}
                    </p>
                )}

            </div>
        </div>
    );
};

export default Account;
