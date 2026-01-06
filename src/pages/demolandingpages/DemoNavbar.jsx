import React, { useState, useRef, useEffect } from "react";
import icon from "../../assets/images/icon.webp";
import DownArrowIcon from "../../assets/icons/DownArrowIcon";
import UserIcon from "../../assets/icons/UserIcon";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import RotateArrowIcon from "../../assets/icons/accountpage/RotateArrowIcon";

const NAV_ITEMS = {
  Product: [
    { label: "OCR Engine", to: "/ocr-engine" },
    { label: "Handwritten Text Extraction", to: "/handwritten-ocr" },
    { label: "Invoice → Excel", to: "/invoice-to-excel" },
    { label: "API & Integrations", to: "/api-integrations" },
    { label: "Pricing", to: "/pricingpage" },
  ],
  Solutions: [
    { label: "Logistics & Shipping", to: "/solutions/logistics" },
    { label: "Finance & Accounting", to: "/solutions/finance" },
    { label: "Healthcare Records", to: "/solutions/healthcare" },
    { label: "Government & Compliance", to: "/solutions/government" },
    { label: "Custom AI Workflows", to: "/solutions/custom-ai" },
  ],
  Company: [
    { label: "About Vibexio", to: "https://www.vibexio.ai/" },
    { label: "Careers", to: "/careers" },
    { label: "Contact", to: "/contact" },
    { label: "Privacy Policy", to: "/privacy-policy" },
    { label: "Terms of Service", to: "/terms" },
  ],
  Enterprise: [
    { label: "Security & Compliance", to: "/enterprise/security" },
    { label: "SLA & Support", to: "/enterprise/sla-support" },
    { label: "Custom Deployment", to: "/enterprise/custom-deployment" },
    { label: "Contact Sales", to: "/enterprise/contact-sales" },

  ],
};

const USER_MENU = [
  { label: "Account", to: "/account" },
  { label: "Subscription", to: "/subscription" },
  { label: "Invoice", to: "/invoice" },
  { label: "Help & Support", to: "/help-support" },
  {
    label: "Logout",
    action: "logout",
    Icon: RotateArrowIcon,
  },
];

const DemoNavbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [userOpen, setUserOpen] = useState(false);

  const dropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  const userButtonRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside main nav dropdowns
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
      // Check if click is outside user dropdown area (including the button)
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(event.target)
      ) {
        setUserOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle desktop dropdown hover
  const handleDropdownEnter = (title) => {
    setActiveDropdown(title);
    setUserOpen(false); // Close user dropdown when opening nav dropdown
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  // Handle user dropdown hover
  const handleUserEnter = () => {
    setUserOpen(true);
    setActiveDropdown(null); // Close nav dropdowns when opening user dropdown
  };

  const handleUserLeave = () => {
    setUserOpen(false);
  };

  // Handle mobile menu item click
  const toggleMobileItem = (title) => {
    setMobileExpanded(mobileExpanded === title ? null : title);
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileExpanded(null);
  };

  // Handle nav item click
  const handleNavItemClick = (title) => {
    if (activeDropdown === title) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(title);
      setUserOpen(false);
    }
  };

  return (
    <nav className="w-full bg-white shadow-[0px_1px_7px_0px_#00000040] sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-12">
        {/* Main navigation container */}
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <div className="shrink-0">
            <Link to="/" onClick={closeMobileMenu}>
              <img src={icon} alt="Clario" className="h-10 w-auto lg:h-12" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center justify-center space-x-1 xl:space-x-10">
              {Object.keys(NAV_ITEMS).map((title) => (
                <div
                  key={title}
                  className="relative"
                  onMouseEnter={() => handleDropdownEnter(title)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <button
                    className="flex items-center justify-center space-x-1 xl:space-x-2 px-3 xl:px-4 py-3 
                      font-avenir font-semibold text-[16px] xl:text-[18px] leading-[26px] 
                      text-[#21527D] hover:text-[#163a5e] transition-colors
                      min-w-[130px]"
                    onClick={() => handleNavItemClick(title)}
                  >
                    <span className="text-center w-full">{title}</span>
                    <DownArrowIcon
                      width={18}
                      height={18}
                      className={`transition-transform duration-200 ${activeDropdown === title ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {/* Desktop Dropdown */}
                  {activeDropdown === title && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-full pt-1 z-50">
                      <div className="bg-[#E7EDF2] border border-[#BCD6EB] rounded-[10px] 
                        shadow-[0px_0px_5px_0px_#00000040] min-w-[260px] py-1">
                        {NAV_ITEMS[title].map((item, index) => (
                          <Link
                            key={index}
                            to={item.to}
                            className="block px-6 py-3.5 font-avenir font-semibold 
                              text-[16px] leading-[24px] text-[#464646] 
                              border-b border-[#BCD6EB] last:border-b-0 
                              hover:bg-[#DEE6ED] transition-colors whitespace-nowrap"
                            onClick={() => {
                              console.log(item.to);
                              setActiveDropdown(null);
                            }}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* API Link - No Dropdown */}
              <Link
                to="/api"
                className="flex items-center justify-center px-4 py-3 
                  font-avenir font-semibold text-[18px] leading-[26px] 
                  text-[#21527D] hover:text-[#163a5e] transition-colors
                  min-w-[90px]"
              >
                API
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 xl:gap-4">
            <Link
              to="/signin"
              className="font-avenir font-semibold text-[16px] xl:text-[18px] text-white border border-[#21527D] px-2.5 lg:px-10 py-2 rounded-[10px] bg-[#21527D] hover:opacity-90 transition cursor-pointer"
            >
              Sign In
            </Link>
          </div>


          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md 
                text-[#21527D] hover:text-[#163a5e] hover:bg-gray-100 
                focus:outline-none transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {mobileOpen ? (
                <X className="block h-7 w-7" aria-hidden="true" />
              ) : (
                <Menu className="block h-7 w-7" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden ${mobileOpen ? 'block' : 'hidden'}`}>
        <div className="px-4 pt-2 pb-4 space-y-1 border-t border-gray-200 bg-white">
          {Object.keys(NAV_ITEMS).map((title) => (
            <div key={title} className="mb-2">
              <button
                onClick={() => toggleMobileItem(title)}
                className="flex items-center justify-between w-full px-4 py-4 
                  font-avenir font-semibold text-[17px] text-[#21527D] 
                  bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span>{title}</span>
                <DownArrowIcon
                  width={18}
                  height={18}
                  className={`transition-transform duration-200 ${mobileExpanded === title ? "rotate-180" : ""
                    }`}
                />
              </button>

              {mobileExpanded === title && (
                <div className="mt-1 ml-5 space-y-1">
                  {NAV_ITEMS[title].map((item, index) => (
                    <Link
                      key={index}
                      to={item.to}
                      className="block px-4 py-3 font-avenir font-medium 
                        text-[16px] text-[#464646] rounded-lg 
                        hover:bg-gray-100 transition-colors"
                      onClick={closeMobileMenu}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* API Link - Mobile */}
          <Link
            to="/api"
            className="block px-4 py-4 font-avenir font-semibold text-[17px] 
              text-[#21527D] bg-gray-50 rounded-lg hover:bg-gray-100 
              transition-colors mb-2"
            onClick={closeMobileMenu}
          >
            API
          </Link>

          {/* MOBILE AUTH BUTTONS */}
          <div className="flex flex-col gap-3 pt-4">
            <Link
              to="/signin"
              className="w-full text-center font-avenir font-semibold text-[18px] text-[#21527D] border border-[#21527D] py-3 rounded-[10px]"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav >
  );
};

export default DemoNavbar;