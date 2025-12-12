import React, { useState } from "react";
import icon from "../../assets/images/icon.webp";
import DownArrowIcon from "../../assets/icons/DownArrowIcon";
import UserIcon from "../../assets/icons/UserIcon";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import PlusCircleIcon from "../../assets/icons/accountpage/PlusCircleIcon";
import RotateArrowIcon from "../../assets/icons/accountpage/RotateArrowIcon";

const Navbar = () => {
    // Desktop dropdown states
    const [openPricingDesk, setOpenPricingDesk] = useState(false);
    const [openHelpDesk, setOpenHelpDesk] = useState(false);
    const [openUserDesk, setOpenUserDesk] = useState(false);

    // Mobile states
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openPricingMobile, setOpenPricingMobile] = useState(false);
    const [openHelpMobile, setOpenHelpMobile] = useState(false);
    const [openSignInMobile, setOpenSignInMobile] = useState(false);


    // Function to handle mobile dropdown clicks (only one open at a time)
    const handleMobileDropdown = (dropdown) => {
        if (dropdown === 'pricing') {
            setOpenPricingMobile(!openPricingMobile);
            setOpenHelpMobile(false);
            setOpenSignInMobile(false);
        } else if (dropdown === 'help') {
            setOpenHelpMobile(!openHelpMobile);
            setOpenPricingMobile(false);
            setOpenSignInMobile(false);
        } else if (dropdown === 'signin') {
            setOpenSignInMobile(!openSignInMobile);
            setOpenPricingMobile(false);
            setOpenHelpMobile(false);
        }
    };

    return (
        <nav className="w-full">
            <div className="w-full flex items-center justify-between">

                {/* LOGO */}
                <div className="w-[120px] h-[50px] md:w-[150px] md:h-[60px] lg:w-[180px] lg:h-[70px]">
                    <img src={icon} alt="Logo" className="w-full h-full object-contain" />
                </div>

                {/* DESKTOP MENU */}
                <ul className="hidden lg:flex items-center gap-16 xl:gap-24">

                    {/* Account */}
                    <Link to="/accountpage">
                        <li className="cursor-pointer">

                            <span className="font-avenir font-semibold text-[24px] tracking-[0.13em] text-[#21527D]">
                                Account
                            </span>
                        </li>
                    </Link>
                    {/* Pricing with centered dropdown */}
                    <li className="relative">
                        <div
                            className="cursor-pointer"
                            onMouseEnter={() => setOpenPricingDesk(true)}
                            onMouseLeave={() => setOpenPricingDesk(false)}
                        >
                            <Link to="pricingpage">
                                <span className="flex items-center gap-1 font-avenir font-semibold text-[24px] tracking-[0.13em] text-[#21527D]">
                                    Pricing <DownArrowIcon width={28} height={18} />
                                </span>
                            </Link>
                        </div>

                        {openPricingDesk && (
                            <div
                                className="absolute top-full left-1/2 transform -translate-x-1/2 w-[180px] bg-white rounded-md shadow-[0px_4px_4px_0px_#C0BEBE40] z-50 pt-2"
                                onMouseEnter={() => setOpenPricingDesk(true)}
                                onMouseLeave={() => setOpenPricingDesk(false)}
                            >
                                <Link to="/personalscreen">
                                    <div className="bg-[#F8F8F8] px-6 py-4 font-avenir font-semibold text-[20px] cursor-pointer hover:bg-[#EFEFEF]">
                                        Personal
                                    </div>
                                </Link>
                                <Link to="/enterprisescreen">
                                    <div className="bg-[#EFEFEF] px-6 py-4 font-avenir font-semibold text-[20px] cursor-pointer hover:bg-[#E0E0E0]">
                                        Enterprise
                                    </div>
                                </Link>
                            </div>
                        )}
                    </li>

                    {/* Help with centered dropdown */}
                    <li className="relative">
                        <div
                            className="cursor-pointer"
                            onMouseEnter={() => setOpenHelpDesk(true)}
                            onMouseLeave={() => setOpenHelpDesk(false)}
                        >
                            <span className="flex items-center gap-1 font-avenir font-semibold text-[24px] tracking-[0.13em] text-[#21527D]">
                                Help <DownArrowIcon width={28} height={18} />
                            </span>
                        </div>

                        {openHelpDesk && (
                            <div
                                className="absolute top-full left-1/2 transform -translate-x-1/2 w-[180px] bg-white rounded-md shadow-[0px_4px_4px_0px_#C0BEBE40] z-50 pt-2"
                                onMouseEnter={() => setOpenHelpDesk(true)}
                                onMouseLeave={() => setOpenHelpDesk(false)}
                            >
                                <div className="bg-[#F8F8F8] px-6 py-4 font-avenir font-semibold text-[20px] cursor-pointer hover:bg-[#EFEFEF]">
                                    Privacy
                                </div>
                                <div className="bg-[#EFEFEF] px-6 py-4 font-avenir font-semibold text-[20px] cursor-pointer hover:bg-[#E0E0E0]">
                                    Contact
                                </div>
                            </div>
                        )}
                    </li>
                </ul>

                {/* DESKTOP USER ICON with centered dropdown */}
                <div className="hidden lg:block relative">
                    <div className="w-[180px] flex justify-center">
                        <div
                            className="cursor-pointer flex justify-end"
                            onMouseEnter={() => setOpenUserDesk(true)}
                            onMouseLeave={() => setOpenUserDesk(false)}
                        >
                            <UserIcon />
                        </div>
                    </div>

                    {openUserDesk && (
                        <div
                            className="absolute top-full right-0 w-[180px] bg-white rounded-md shadow-[0px_4px_4px_0px_#C0BEBE40] z-50 pt-2"
                            onMouseEnter={() => setOpenUserDesk(true)}
                            onMouseLeave={() => setOpenUserDesk(false)}
                        >
                            <Link to="/signin">
                                <div className="bg-[#F8F8F8] px-6 py-4 font-avenir font-semibold text-[20px] cursor-pointer hover:bg-[#EFEFEF]">
                                    Login
                                </div>
                            </Link>
                            <Link to='/signup'>
                                <div className="bg-[#EFEFEF] px-6 py-4 font-avenir font-semibold text-[20px] cursor-pointer hover:bg-[#E0E0E0]">
                                    Sign Up
                                </div>
                            </Link>
                            <div className="bg-[#F8F8F8] px-4 sm:px-6 py-4 font-avenir font-semibold text-[18px] sm:text-[20px] 
            cursor-pointer hover:bg-[#E0E0E0] rounded-[10px] w-full max-w-[300px]">

                                <div className="flex flex-col gap-4">

                                    {/* USER INFO SECTION */}
                                    <div className="flex justify-center sm:justify-start gap-4 items-center">
                                        <div className="w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] rounded-full bg-[#C5D4E2] 
                            flex items-center justify-center">
                                            <UserIcon width={20} height={20} color="#121212" />
                                        </div>

                                        <div>
                                            <h2 className="font-avenir font-semibold text-[10px] sm:text-[12px] leading-[100%] 
                               tracking-[9%] capitalize text-[#121212]">
                                                John.45
                                            </h2>

                                            <p className="pt-1 font-avenir font-normal text-[9px] sm:text-[10px] leading-[100%] 
                              tracking-[9%] capitalize text-[#1D5A0C] italic">
                                                Active Now
                                            </p>
                                        </div>
                                    </div>

                                    {/* BUTTONS SECTION */}
                                    <div className="flex flex-col gap-2 sm:gap-3">

                                        {/* Logout Button */}
                                        <button
                                            className="flex items-center justify-center gap-2 px-3 py-2 
                           font-avenir font-normal text-[9px] sm:text-[10px] leading-[100%] tracking-[9%]
                           capitalize text-[#21527D] bg-[#F6FBFF]
                           shadow-[0px_1px_4px_0px_#0000001A]
                           border border-[#21527D] border-[0.25px]
                           rounded-[100px] w-full sm:w-auto"
                                        >
                                            <RotateArrowIcon width={12} height={12} />
                                            Logout
                                        </button>

                                        {/* Add Account Button */}
                                        <button
                                            className="flex items-center justify-center gap-2 px-3 py-2 
                           font-avenir font-normal text-[9px] sm:text-[10px] leading-[100%] tracking-[9%]
                           capitalize text-[#21527D] bg-[#F6FBFF]
                           shadow-[0px_1px_4px_0px_#0000001A]
                           border border-[#21527D] border-[0.25px]
                           rounded-[100px] w-full sm:w-auto"
                                        >
                                            <PlusCircleIcon width={12} height={12} />
                                            Add Account
                                        </button>

                                    </div>

                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* MOBILE MENU BUTTON */}
                <button
                    className="lg:hidden p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>


            <div
                className={`lg:hidden bg-white shadow-md overflow-hidden transition-all duration-300 ${mobileMenuOpen ? "max-h-[600px] pb-4" : "max-h-0"
                    }`}
            >
                <ul className="flex flex-col px-6 py-4">

                    {/* Account */}
                    <Link to="/accountpage">
                        <li className="py-3 font-avenir font-semibold text-[20px] text-[#21527D] cursor-pointer">
                            Account
                        </li>
                    </Link>

                    {/* MOBILE PRICING DROPDOWN */}
                    <li className="py-3">
                        <div className="flex items-center justify-between">

                            {/* TEXT → ROUTE */}
                            <Link
                                to="/pricingpage"
                                className="font-avenir font-semibold text-[20px] text-[#21527D]"
                            >
                                Pricing
                            </Link>

                            {/* ICON → DROPDOWN TOGGLE */}
                            <button
                                onClick={() => handleMobileDropdown("pricing")}
                                className="cursor-pointer"
                            >
                                <DownArrowIcon
                                    width={20}
                                    height={14}
                                    className={`transition-all ${openPricingMobile ? "rotate-180" : ""}`}
                                />
                            </button>

                        </div>


                        {openPricingMobile && (
                            <div className="mt-3">
                                <Link to="/personalscreen">
                                    <div className="bg-[#F8F8F8] px-4 py-3 mb-1 font-avenir font-semibold text-[18px] cursor-pointer hover:bg-[#EFEFEF]">
                                        Personal
                                    </div>
                                </Link>
                                <Link to="/enterprisescreen">
                                    <div className="bg-[#EFEFEF] px-4 py-3 font-avenir font-semibold text-[18px] shadow cursor-pointer hover:bg-[#E0E0E0]">
                                        Enterprise
                                    </div>
                                </Link>
                            </div>
                        )}
                    </li>

                    {/* MOBILE HELP DROPDOWN */}
                    <li className="py-3">
                        <div
                            className="flex items-center justify-between font-avenir font-semibold text-[20px] text-[#21527D] cursor-pointer"
                            onClick={() => handleMobileDropdown('help')}
                        >
                            Help
                            <DownArrowIcon
                                width={20}
                                height={14}
                                className={`transition-all ${openHelpMobile ? "rotate-180" : ""}`}
                            />
                        </div>

                        {openHelpMobile && (
                            <div className="mt-3">
                                <LInk to=''>
                                    <div className="bg-[#F8F8F8] px-4 py-3 mb-1 font-avenir font-semibold text-[18px] cursor-pointer hover:bg-[#EFEFEF]">
                                        Privacy
                                    </div>
                                </LInk>
                                <Link to=''>
                                    <div className="bg-[#EFEFEF] px-4 py-3 font-avenir font-semibold text-[18px] shadow cursor-pointer hover:bg-[#E0E0E0]">
                                        Contact
                                    </div>
                                </Link>
                            </div>
                        )}
                    </li>

                    {/* MOBILE USER OPTIONS DROPDOWN */}
                    <li className="py-3">
                        <div
                            className="flex items-center justify-between font-avenir font-semibold text-[20px] text-[#21527D] cursor-pointer"
                            onClick={() => handleMobileDropdown('signin')}
                        >
                            <div className="flex items-center gap-2">
                                <UserIcon width={20} height={20} />
                                <span>Sign In Options</span>
                            </div>
                            <DownArrowIcon
                                width={20}
                                height={14}
                                className={`transition-all ${openSignInMobile ? "rotate-180" : ""}`}
                            />
                        </div>

                        {openSignInMobile && (
                            <div className="mt-3">
                                <Link to='signin'>
                                    <div className="bg-[#F8F8F8] px-4 py-3 mb-1 font-avenir font-semibold text-[18px] cursor-pointer hover:bg-[#EFEFEF]">
                                        Login
                                    </div>
                                </Link>
                                <Link to='signup'>
                                    <div className="bg-[#EFEFEF] px-4 py-3 font-avenir font-semibold text-[18px] shadow cursor-pointer hover:bg-[#E0E0E0]">
                                        Sign Up
                                    </div>
                                </Link>
                                <div className="bg-[#F8F8F8] px-4 sm:px-6 py-4 font-avenir font-semibold text-[18px] sm:text-[20px] 
            cursor-pointer hover:bg-[#E0E0E0] rounded-[10px] w-full max-w-[300px]">

                                    <div className="flex flex-col gap-4">

                                        {/* USER INFO SECTION */}
                                        <div className="flex justify-center sm:justify-start gap-4 items-center">
                                            <div className="w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] rounded-full bg-[#C5D4E2] 
                            flex items-center justify-center">
                                                <UserIcon width={20} height={20} color="#121212" />
                                            </div>

                                            <div>
                                                <h2 className="font-avenir font-semibold text-[10px] sm:text-[12px] leading-[100%] 
                               tracking-[9%] capitalize text-[#121212]">
                                                    John.45
                                                </h2>

                                                <p className="pt-1 font-avenir font-normal text-[9px] sm:text-[10px] leading-[100%] 
                              tracking-[9%] capitalize text-[#1D5A0C] italic">
                                                    Active Now
                                                </p>
                                            </div>
                                        </div>

                                        {/* BUTTONS SECTION */}
                                        <div className="flex flex-col gap-2 sm:gap-3">

                                            {/* Logout Button */}
                                            <button
                                                className="flex items-center justify-center gap-2 px-3 py-2 
                           font-avenir font-normal text-[9px] sm:text-[10px] leading-[100%] tracking-[9%]
                           capitalize text-[#21527D] bg-[#F6FBFF]
                           shadow-[0px_1px_4px_0px_#0000001A]
                           border border-[#21527D] border-[0.25px]
                           rounded-[100px] w-full sm:w-auto"
                                            >
                                                <RotateArrowIcon width={12} height={12} />
                                                Logout
                                            </button>

                                            {/* Add Account Button */}
                                            <button
                                                className="flex items-center justify-center gap-2 px-3 py-2 
                           font-avenir font-normal text-[9px] sm:text-[10px] leading-[100%] tracking-[9%]
                           capitalize text-[#21527D] bg-[#F6FBFF]
                           shadow-[0px_1px_4px_0px_#0000001A]
                           border border-[#21527D] border-[0.25px]
                           rounded-[100px] w-full sm:w-auto"
                                            >
                                                <PlusCircleIcon width={12} height={12} />
                                                Add Account
                                            </button>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        )}
                    </li>
                </ul>
            </div>
        </nav >
    );
};

export default Navbar;