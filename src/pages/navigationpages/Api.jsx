import React from "react";
import Navbar from "../landingpages/Navbar";

const Api = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-xl">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-[#21527D]/10 flex items-center justify-center">
              <span className="text-[40px]">🚧</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="font-['Kollektif'] font-bold text-[28px] sm:text-[32px] leading-[120%] tracking-[0.04em] text-[#21527D]">
            Coming Soon
          </h1>

          {/* Description */}
          <p className="mt-4 font-['Avenir_LT_Std'] font-[350] text-[15px] sm:text-[16px] leading-[28px] tracking-[0.05em] text-black">
            We’re currently building something powerful for you. Our Contact
            Sales experience is under construction and will be live shortly.
          </p>

          {/* Sub note */}
          <p className="mt-6 font-['Avenir_LT_Std'] font-[350] text-[14px] tracking-[0.06em] text-black/60">
            Stay tuned. Great things are on the way.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Api;
