import React from "react";
import CloseIcon from "../../assets/icons/loginpages/CloseIcon";

const Logout = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 px-4">
      {/* Card */}
      <div
        className="relative w-[90%] max-w-[500px] bg-[#FDFDFD]
        shadow-[0px_0px_13px_0px_#00000040]
        rounded-[30px] px-6 py-12"
      >
        {/* Close */}
        <button 
          className="absolute right-6 top-6"
          onClick={onCancel}
        >
          <CloseIcon />
        </button>

        {/* Title */}
        <h2 className="font-avenir font-semibold lg:font-bold text-[24px] leading-[43px] text-center text-[#121212] mb-8">
          Are you sure you want to logout ?
        </h2>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="font-avenir font-bold text-[16px] leading-[100%]
            text-[#21527D] bg-[#FDFDFD]
            border border-[#21527D]
            w-[120px] h-[40px] rounded-[10px] cursor-pointer"
          >
            No
          </button>

          <button
            onClick={onConfirm}
            className="font-avenir font-bold text-[16px] leading-[100%]
            text-[#FDFDFD] bg-[#21527D]
            w-[120px] h-[40px] rounded-[10px] cursor-pointer"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;