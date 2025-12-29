import React from "react";
import CloseIcon from "../../assets/icons/loginpages/CloseIcon";

const Logout = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 px-4">
      {/* Card */}
      <div
        className="relative w-full max-w-[420px] bg-[#FDFDFD]
        shadow-[0px_0px_13px_0px_#00000040]
        rounded-[30px] px-6 py-12"
      >
        {/* Close */}
        <button className="absolute right-6 top-6">
          <CloseIcon />
        </button>

        {/* Title */}
        <h2 className="font-avenir font-bold text-[24px] leading-[43px] text-center text-[#121212] mb-8">
          Are you sure want to logout
        </h2>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            className="font-avenir font-bold text-[16px] leading-[100%]
            text-[#21527D] bg-[#FDFDFD]
            border border-[#21527D]
            w-[120px] h-[40px] rounded-[10px]
            hover:opacity-90 transition cursor-pointer"
          >
            No
          </button>

          <button
            className="font-avenir font-bold text-[16px] leading-[100%]
            text-[#FDFDFD] bg-[#21527D]
            w-[120px] h-[40px] rounded-[10px]
            hover:opacity-90 transition cursor-pointer"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
