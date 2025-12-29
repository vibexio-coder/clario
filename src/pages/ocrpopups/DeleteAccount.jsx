import React from "react";
import CloseIcon from "../../assets/icons/loginpages/CloseIcon";

const DeleteAccount = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 px-4">
      {/* Card */}
      <div
        className="relative w-full max-w-[620px] bg-[#FDFDFD]
        shadow-[0px_0px_13px_0px_#00000040]
        rounded-[30px]
        px-5 sm:px-8 lg:px-12
        py-10"
      >
        {/* Close */}
        <button className="absolute right-4 sm:right-6 top-4 sm:top-6">
          <CloseIcon />
        </button>

        {/* Title */}
        <h2
          className="font-avenir font-semibold lg:font-bold text-[18px] sm:text-[20px] lg:text-[22px]
          leading-7 sm:leading-[34px] lg:leading-[43px]
          text-center text-[#121212]
          mb-8 px-2"
        >
          Are you sure you want to delete your account ?
          This action cannot be undone
        </h2>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            className="font-avenir font-semibold lg:font-bold text-[16px] leading-[100%]
            text-[#21527D] bg-[#FDFDFD]
            border border-[#21527D]
            w-full sm:w-[220px] h-[40px] rounded-[10px]
            hover:opacity-90 transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            className="font-avenir font-semibold lg:font-bold text-[16px] leading-[100%]
            text-[#FDFDFD] bg-[#21527D]
            w-full sm:w-[220px] h-[40px] rounded-[10px]
            hover:opacity-90 transition cursor-pointer"
          >
            Yes, Delete my Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
