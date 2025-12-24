import React from "react";
import icon from "../../assets/images/icon.webp";
import GoogleIcon from "../../assets/icons/loginpages/GoogleIcon";
import MailIcon from "../../assets/icons/loginpages/MailIcon";

const SignIn = () => {
  return (
    <div className="w-full max-w-[420px] bg-white shadow-[0px_0px_7px_0px_#00000040] md:rounded-[20px] px-6 py-8 flex flex-col gap-5">
      
      {/* Logo */}
      <div className="flex justify-center">
        <img src={icon} alt="logo" className="w-[150px] h-[60px] object-contain" />
      </div>

      {/* Title */}
      <h2 className="font-kollektif font-semibold lg:font-bold text-[24px] leading-[26px] text-[#21527D]">
        Sign in to Clario
      </h2>

      {/* Description + Input */}
      <div className="flex flex-col gap-2">
        <p className="font-avenir text-[12px] leading-[26px] text-[#000000]">
          Enter your email or phone number to continue.
        </p>

        <input
          type="text"
          placeholder="name@company.com"
          className="w-full bg-[#F2F2F2] border border-[0.5px] border-[#21527D] rounded-[6px] px-4 py-3 font-avenir text-[16px] leading-[26px] text-[#21527D] placeholder:text-[#21527D] outline-none focus:ring-1 focus:ring-[#21527D]"
        />
      </div>

      {/* Continue Button */}
      <button className="w-full font-avenir font-bold text-[16px] leading-[26px] text-white bg-[#21527D] rounded-[10px] py-3 cursor-pointer">
        Continue
      </button>

      {/* OR Divider */}
      <div className="flex items-center justify-center gap-3">
        <div className="flex-1 border-t border-[#C7C7C7]" />
        <span className="font-avenir font-bold text-[16px] text-[#C7C7C7]">
          Or
        </span>
        <div className="flex-1 border-t border-[#C7C7C7]" />
      </div>

      {/* Social Buttons */}
      <div className="flex justify-center gap-4">
        <button className="w-[50px] h-[50px] bg-[#FDFDFD] shadow-[0px_0px_7px_0px_#21527D40] rounded-full flex items-center justify-center cursor-pointer">
          <GoogleIcon />
        </button>

        <button className="w-[50px] h-[50px] bg-[#FDFDFD] shadow-[0px_0px_7px_0px_#21527D40] rounded-full flex items-center justify-center cursor-pointer">
          <MailIcon />
        </button>
      </div>

      {/* Footer */}
      <p className="text-center font-avenir text-[16px] leading-[26px] text-[#121212]">
        Don’t have an account?{" "}
        <span className="text-[#21527D] font-bold cursor-pointer hover:underline">
          Create one
        </span>
      </p>
    </div>
  );
};

export default SignIn;
