import React, { useState } from "react";
import LeftArrowIcon from "../../assets/icons/pricingpage/LeftArrowIcon";
import PersonalScreen from "../PricingPages/PersonalScreen";
import EnterpriseScreen from "../PricingPages/EnterpriseScreen";
import { Link } from "react-router-dom";

const PricingPage = () => {
  const [active, setActive] = useState("personal");

  return (
    <div className="w-full py-10 relative">

      {/* LEFT ARROW */}
      <Link 
      to='/'
      className="absolute left-3 md:left-10 xl:left-30 top-14">
        <LeftArrowIcon width={20} height={20} />
      </Link>

      <div className="flex  justify-center">
        {/* TOGGLE + ARROW */}
        <div className="w-full max-w-[950px] px-4 md:px-8 flex justify-center lg:justify-end items-center">
          {/* SWITCH BUTTON */}
          <div
            className="w-[220px] h-[50px] bg-[#F0F0F0] rounded-[100px] flex items-center cursor-pointer relative"
            onClick={() =>
              setActive(active === "personal" ? "enterprise" : "personal")
            }
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

      {/* SCREEN DISPLAY (CONDITIONAL RENDERING) */}
      {active === "personal" && <PersonalScreen />}

      {active === "enterprise" && <EnterpriseScreen />}

    </div>
  );
};

export default PricingPage;
