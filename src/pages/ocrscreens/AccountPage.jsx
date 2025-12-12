import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Subscription from '../accountpages/Subscription';
import UserAccount from '../accountpages/UserAccount';

const AccountPage = () => {
    const [active, setActive] = useState("personal");
    const navigate = useNavigate();

    const handleToggle = () => {
        if (active === "personal") {
            setActive("enterprise");
            navigate("/businessinquiry");
        } else {
            setActive("personal");
            navigate("/signup");
        }
    };

    return (
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 xl:px-50 py-8 flex flex-col gap-12">

            {/* OUTER FLEX */}
            <div className="flex justify-center">
                <div className="w-full max-w-[950px] px-4 md:px-8 flex justify-center items-center">

                    {/* TOGGLE SWITCH */}
                    <div
                        className="w-[220px] h-[50px] bg-[#F0F0F0] rounded-[100px] flex items-center cursor-pointer relative"
                        
                    >
                        {/* SLIDER */}
                        <div
                            className={`w-[110px] h-[42px] bg-[#121212] rounded-[100px] absolute top-[4px] transition-all duration-300
                                ${active === "personal" ? "left-[4px]" : "left-[104px]"}
                            `}
                        ></div>

                        {/* LABELS */}
                        <div className="w-full flex justify-between px-5 absolute top-[12px]">
                            <span
                                className={`pl-1 font-avenir text-[16px] transition-all 
                                    ${active === "personal" ? "text-white font-[700]" : "text-[#121212]"}
                                `}
                            >
                                Personal
                            </span>

                            <span
                                className={`font-avenir text-[16px] transition-all 
                                    ${active === "enterprise" ? "text-white font-[700]" : "text-[#121212]"}
                                `}
                            >
                                Enterprise
                            </span>
                        </div>
                    </div>

                </div>
            </div>

            <Subscription />
            <UserAccount />
        </div>
    );
};

export default AccountPage;
