import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../../assets/images/icon.webp";

const FullName = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const navigate = useNavigate();

  // 🔹 Gmail validation
  const validateEmail = (value) => {
    const trimmed = value.trim().toLowerCase();

    if (!trimmed) return "Email required";
    if (!trimmed.endsWith("@gmail.com")) return "Use Gmail only";

    const regex = /^[a-z0-9._%+-]+@gmail\.com$/;
    if (!regex.test(trimmed)) return "Invalid Gmail address";

    return "";
  };

  // 🔹 Full name validation
  const validateFullName = (name) => {
    const trimmed = name.trim();

    if (!trimmed) return "Name required";
    if (!/^[A-Za-z\s]+$/.test(trimmed)) return "Letters only";
    if (trimmed.length < 2) return "Too short";

    return "";
  };

  const handleContinue = () => {
    setEmailError("");
    setNameError("");

    const emailValidationError = validateEmail(email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      return;
    }

    const nameValidationError = validateFullName(fullName);
    if (nameValidationError) {
      setNameError(nameValidationError);
      return;
    }

    // 🔥 STORE LOCALLY
    const signupData = {
      fullName,
      email: email.toLowerCase(),
      phone: null,
    };

    localStorage.setItem("signupData", JSON.stringify(signupData));
    console.log("🟡 Step 1 saved:", signupData);

    navigate("/createpassword");
  };

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("signupData"));

    if (savedData) {
      if (savedData.email) setEmail(savedData.email);
      if (savedData.fullName) setFullName(savedData.fullName);
    }
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleContinue();
  };

  const getInputStyles = (hasError) => {
    const base =
      "w-full bg-[#F2F2F2] border rounded-[6px] px-4 py-3 font-avenir text-[16px] leading-[26px] outline-none focus:ring-1";

    return hasError
      ? `${base} border-[#F1511B] text-[#F1511B] focus:ring-[#F1511B] bg-white`
      : `${base} border-[#21527D] text-[#21527D] focus:ring-[#21527D]`;
  };

  return (
    <div className="h-full md:min-h-screen flex items-center justify-center py-1 md:py-0 bg-[#FAFDFF]">
      <div className="w-full max-w-[500px] bg-white shadow-[0px_0px_7px_0px_#00000040] md:rounded-[20px] px-10 py-8 flex flex-col gap-5">

        <div className="flex justify-center">
          <img src={icon} alt="logo" className="w-[150px] h-[60px] object-contain" />
        </div>

        <div>
          <h2 className="font-kollektif font-semibold lg:font-bold text-[20px] md:text-[24px] text-[#21527D] mb-1">
            Create your Clario account
          </h2>
          <p className="font-avenir text-[16px] text-black">
            Just a few details to get started.
          </p>
        </div>

        {/* EMAIL INPUT */}
        <div className="flex flex-col gap-2">
          <p className="font-avenir text-[12px] text-black">
            Enter email address
          </p>
          <input
            type="email"
            placeholder="name@gmail.com"
            value={email}
            onChange={(e) => {
              const value = e.target.value.toLowerCase();
              setEmail(value);

              const existing = JSON.parse(localStorage.getItem("signupData")) || {};
              localStorage.setItem(
                "signupData",
                JSON.stringify({ ...existing, email: value })
              );

              if (emailError) setEmailError("");
            }}

            onKeyPress={handleKeyPress}
            className={getInputStyles(emailError)}
          />
          {emailError && (
            <span className="text-[#F1511B] text-[12px] italic">
              {emailError}
            </span>
          )}
        </div>

        {/* FULL NAME INPUT */}
        <div className="flex flex-col gap-2">
          <p className="font-avenir text-[12px] text-black">
            Full name
          </p>
          <input
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => {
              const value = e.target.value;
              setFullName(value);

              const existing = JSON.parse(localStorage.getItem("signupData")) || {};
              localStorage.setItem(
                "signupData",
                JSON.stringify({ ...existing, fullName: value })
              );

              if (nameError) setNameError("");
            }}
            onKeyPress={handleKeyPress}
            className={getInputStyles(nameError)}
          />
          {nameError && (
            <span className="text-[#F1511B] text-[12px] italic">
              {nameError}
            </span>
          )}
        </div>

        <button
          onClick={handleContinue}
          className="w-full font-avenir font-bold text-[16px] text-white bg-[#21527D] rounded-[10px] py-3"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default FullName;
