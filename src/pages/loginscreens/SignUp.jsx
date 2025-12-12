import React from 'react';
import EyeIcon from '../../assets/icons/loginpages/EyeIcon';
import CheckCircleIcon from '../../assets/icons/loginpages/CheckCircleIcon';
import GoogleIcon from '../../assets/icons/loginpages/GoogleIcon';
import MailIcon from '../../assets/icons/loginpages/MailIcon';
import CloseIcon from '../../assets/icons/loginpages/CloseIcon';
import bgimg from '../../assets/images/formbgimg.webp'
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";


const Signup = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const activeTab = location.pathname === "/signup" ? "personal" : "business";
    return (
        <div className="w-full min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat bg-[linear-gradient(76.43deg,#B5CBDD_11.39%,#D9E5EF_88.36%)]"
            style={{ backgroundImage: `url(${bgimg})` }}>
            <div className="w-full max-w-[480px] rounded-[40px] bg-[linear-gradient(205.4deg,#D0DFEB_36.54%,rgba(253,253,253,0.6)_180%)] shadow-[0px_16px_25.2px_7px_#1A55701A] p-4 sm:p-6 md:p-8 flex flex-col gap-3 relative">

                {/* Close Button */}
                <div className="absolute right-4 sm:right-6 top-4 sm:top-6 cursor-pointer">
                    <CloseIcon width={20} height={20} />
                </div>

                {/* Title */}
                <h2 className="font-avenir font-semibold lg:font-bold text-[22px] md:text-[32px] text-center text-[#121212] pt-2 sm:pt-0">
                    Create your Account
                </h2>

                {/* Toggle Buttons */}
                <div className="flex justify-center gap-2 sm:gap-3">

                    {/* PERSONAL BUTTON */}
                    <button
                        onClick={() => navigate("/signup")}
                        className={`
            font-avenir text-[14px] sm:text-[16px] rounded-[100px] 
            w-[110px] sm:w-[125px] h-[36px] sm:h-[40px] flex items-center justify-center
            ${activeTab === "personal"
                                ? "font-[700] text-[#FDFDFD] bg-[#21527D]"
                                : "font-[600] text-[#21527D] bg-[#FDFDFD] shadow-[0px_8px_15px_-5px_#21527D26]"
                            }
        `}
                    >
                        Personal
                    </button>

                    {/* BUSINESS BUTTON */}
                    <button
                        onClick={() => navigate("/businessinquiry")}
                        className={`
            font-avenir text-[14px] sm:text-[16px] rounded-[100px] 
            w-[110px] sm:w-[125px] h-[36px] sm:h-[40px] flex items-center justify-center
            ${activeTab === "business"
                                ? "font-[700] text-[#FDFDFD] bg-[#21527D]"
                                : "font-[600] text-[#21527D] bg-[#FDFDFD] shadow-[0px_8px_15px_-5px_#21527D26]"
                            }
        `}
                    >
                        Business
                    </button>

                </div>

                {/* Form Area */}
                <div className="flex flex-col gap-3 sm:gap-4 pt-3">

                    {/* Full Name */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                        <h2 className="font-avenir font-[700] text-[14px] sm:text-[16px] text-[#21527D]">
                            Full Name
                        </h2>

                        <input
                            type="text"
                            placeholder="Eg., Rayna Lipshutz"
                            className="w-full sm:w-[250px] h-[30px] rounded-[100px] bg-[#FDFDFD] shadow-[0px_2px_4px_1px_#21527D26] px-4 font-avenir text-[12px] text-[#82A9CC] placeholder:text-[#82A9CC] outline-none"
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                        <h2 className="font-avenir font-[700] text-[14px] sm:text-[16px] text-[#21527D]">
                            E Mail
                        </h2>

                        <input
                            type="text"
                            placeholder="Eg., Rayna Lipshutz@vibexio.ai"
                            className="w-full sm:w-[250px] h-[30px] rounded-[100px] bg-[#FDFDFD] shadow-[0px_2px_4px_1px_#21527D26] px-4 font-avenir text-[12px] text-[#82A9CC] placeholder:text-[#82A9CC] outline-none"
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                        <h2 className="font-avenir font-[700] text-[14px] sm:text-[16px] text-[#21527D]">
                            Phone Number
                        </h2>

                        <input
                            type="text"
                            placeholder="98xxxxxx76"
                            className="w-full sm:w-[250px] h-[30px] rounded-[100px] bg-[#FDFDFD] shadow-[0px_2px_4px_1px_#21527D26] px-4 font-avenir text-[12px] text-[#82A9CC] placeholder:text-[#82A9CC] outline-none"
                        />
                    </div>

                    {/* Create Password */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                        <h2 className="font-avenir font-[700] text-[14px] sm:text-[16px] text-[#21527D]">Create Password</h2>

                        <div className="relative w-full sm:w-[250px]">
                            <input
                                type="password"
                                placeholder="Enter your Password"
                                className="w-full h-[30px] rounded-[100px] bg-[#FDFDFD] shadow-[0px_2px_4px_1px_#21527D26] px-4 pr-10 font-avenir text-[12px] text-[#82A9CC] outline-none"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                                <EyeIcon />
                            </span>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                        <h2 className="font-avenir font-[700] text-[14px] sm:text-[16px] text-[#21527D]">Confirm Password</h2>

                        <div className="relative w-full sm:w-[250px]">
                            <input
                                type="password"
                                placeholder="Confirm your Password"
                                className="w-full h-[30px] rounded-[100px] bg-[#FDFDFD] shadow-[0px_2px_4px_1px_#21527D26] px-4 pr-10 font-avenir text-[12px] text-[#82A9CC] outline-none"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2">
                                <CheckCircleIcon />
                            </span>
                        </div>
                    </div>

                    {/* Checkbox */}
                    <div className="flex items-center gap-2 mt-1 justify-center">
                        <input type="checkbox" className="w-4 h-4 accent-[#21527D]" />
                        <p className="font-avenir text-[11px] sm:text-[12px] text-[#21527D]/75">
                            I agree to <span className="font-[700]">Vibexio</span>’s
                            <span className="underline ml-1 cursor-pointer">Terms of Service</span> &
                            <span className="underline ml-1 cursor-pointer">Privacy Policy</span>
                        </p>
                    </div>
                </div>

                {/* Sign Up Button */}
                <div className="flex justify-center pt-1 sm:pt-0">
                    <button className="font-avenir font-[750] text-[14px] sm:text-[16px] text-[#FDFDFD] bg-[#21527D] rounded-[16px] w-[160px] sm:w-[180px] h-[46px] sm:h-[50px]">
                        Sign Up
                    </button>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-2 sm:gap-4 justify-center pt-1 sm:pt-0">
                    <div className="w-[120px] sm:w-[150px] md:w-[170px] border-t border-[#859BAE]"></div>
                    <span className="font-avenir text-[18px] sm:text-[20px] text-[#859BAE]">Or</span>
                    <div className="w-[120px] sm:w-[150px] md:w-[170px] border-t border-[#859BAE]"></div>
                </div>

                {/* Icons */}
                <div className="flex justify-center gap-3 sm:gap-4">
                    <div className="bg-[#FDFDFD] shadow-[0px_5px_4px_0px_#21527D40] w-[45px] h-[45px] sm:w-[50px] sm:h-[50px] rounded-full flex items-center justify-center cursor-pointer">
                        <GoogleIcon />
                    </div>
                    <div className="bg-[#FDFDFD] shadow-[0px_5px_4px_0px_#21527D40] w-[45px] h-[45px] sm:w-[50px] sm:h-[50px] rounded-full flex items-center justify-center cursor-pointer">
                        <MailIcon />
                    </div>
                </div>

                {/* Bottom Text */}
                <p className="text-center font-avenir text-[13px] sm:text-[14px] text-[#121212]/40 pt-1 sm:pt-0">
                    Already have an account?
                    <Link to='/signin'> <span className="font-[600] text-[14px] sm:text-[16px] text-[#21527D] ml-1 cursor-pointer">Sign In</span></Link>
                </p>

            </div>
        </div>
    );
}

export default Signup;


