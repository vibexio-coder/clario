import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../../assets/images/icon.webp";
import api from "../../api/axios";

const FullName = () => {
  const [input, setInput] = useState("");
  const [fullName, setFullName] = useState("");
  const [inputError, setInputError] = useState("");
  const [nameError, setNameError] = useState("");
  const [inputType, setInputType] = useState(""); // "email" or "phone"
  const navigate = useNavigate();

  // 🔹 Format phone number as 00000 00000
  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, "");
    const limitedDigits = digits.slice(0, 10);

    if (limitedDigits.length <= 5) {
      return limitedDigits;
    }
    return `${limitedDigits.slice(0, 5)} ${limitedDigits.slice(5)}`;
  };

  // 🔹 Detect input type (email or phone)
  const detectInputType = (value) => {
    const trimmedValue = value.trim();

    if (/^\d+$/.test(trimmedValue.replace(/\s/g, ""))) {
      return "phone";
    }

    if (trimmedValue.includes("@")) {
      return "email";
    }

    if (/[a-zA-Z]/.test(trimmedValue)) {
      return "email";
    }

    return "";
  };

  // 🔹 Email validation
  const validateEmail = (email) => {
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      return "Email required";
    }

    if (!trimmedEmail.endsWith("@gmail.com")) {
      return "Use Gmail only";
    }

    const emailRegex = /^[a-z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(trimmedEmail)) {
      return "Invalid Gmail";
    }

    return "";
  };

  // 🔹 Indian Phone Number validation
  const validateIndianPhone = (phone) => {
    const cleanedPhone = phone.replace(/\s/g, "");

    if (!cleanedPhone) {
      return "Phone required";
    }

    if (!/^\d{10}$/.test(cleanedPhone)) {
      return "10 digits required";
    }

    if (!/^[789]/.test(cleanedPhone)) {
      return "Invalid number";
    }

    return "";
  };

  // 🔹 Full name validation
  const validateFullName = (name) => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      return "Name required";
    }

    if (!/^[A-Za-z\s]+$/.test(trimmedName)) {
      return "Letters only";
    }

    if (trimmedName.length < 2) {
      return "Too short";
    }

    return "";
  };

  const handleInputChange = (e) => {
    let value = e.target.value;
    const detectedType = detectInputType(value);
    setInputType(detectedType);

    if (detectedType === "phone") {
      value = formatPhoneNumber(value);
    } else if (detectedType === "email") {
      value = value.toLowerCase();
    }

    setInput(value);
    if (inputError) setInputError("");
  };

  const handleContinue = () => {
    setInputError("");
    setNameError("");

    const detectedType = detectInputType(input);
    setInputType(detectedType);

    let inputValidationError = "";

    if (detectedType === "email") {
      inputValidationError = validateEmail(input.toLowerCase());
    } else if (detectedType === "phone") {
      inputValidationError = validateIndianPhone(input.replace(/\s/g, ""));
    } else {
      setInputError("Enter email or phone");
      return;
    }

    if (inputValidationError) {
      setInputError(inputValidationError);
      return;
    }

    const nameValidationError = validateFullName(fullName);
    if (nameValidationError) {
      setNameError(nameValidationError);
      return;
    }

    // 🔥 STORE DATA LOCALLY (NOT DB)
    const signupData = {
      fullName: fullName,
      email: detectedType === "email" ? input.toLowerCase() : null,
      phone: detectedType === "phone" ? input.replace(/\s/g, "") : null,
    };

    localStorage.setItem("signupData", JSON.stringify(signupData));

    console.log("🟡 Step 1 saved:", signupData);

    navigate("/createpassword");
  };

  const handleNameChange = (e) => {
    setFullName(e.target.value);
    if (nameError) setNameError("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleContinue();
    }
  };

  const getInputStyles = () => {
    const base =
      "w-full bg-[#F2F2F2] border rounded-[6px] px-4 py-3 font-avenir text-[16px] leading-[26px] outline-none focus:ring-1";

    if (inputError) {
      return `${base} border-[#F1511B] text-[#F1511B] focus:ring-[#F1511B] bg-white`;
    }

    return `${base} border-[#21527D] text-[#21527D] focus:ring-[#21527D]`;
  };

  const getNameInputStyles = () => {
    const base =
      "w-full bg-[#F2F2F2] border rounded-[6px] px-4 py-3 font-avenir text-[16px] leading-[26px] outline-none focus:ring-1";

    if (nameError) {
      return `${base} border-[#F1511B] text-[#F1511B] focus:ring-[#F1511B] bg-white`;
    }

    return `${base} border-[#21527D] text-[#21527D] focus:ring-[#21527D]`;
  };

  const getPlaceholder = () => {
    if (inputType === "phone") {
      return "00000 00000";
    }
    return "name@gmail.com";
  };

  const getInstructionText = () => {
    if (inputType === "phone") {
      return "Enter Phone number";
    } else if (inputType === "email") {
      return "Enter email address";
    }
    return "Enter your email or phone number to continue.";
  };

  return (
    <div className="h-full md:min-h-screen flex items-center justify-center py-1 md:py-0 bg-[#FAFDFF]">
      <div className="w-full max-w-[500px] bg-white shadow-[0px_0px_7px_0px_#00000040] md:rounded-[20px] px-10 py-8 flex flex-col gap-5">
        <div className="flex justify-center">
          <img
            src={icon}
            alt="logo"
            className="w-[150px] h-[60px] object-contain"
          />
        </div>

        <div>
          <h2 className="font-kollektif font-semibold lg:font-bold text-[20px] md:text-[24px] leading-[26px] text-[#21527D] mb-1">
            Create your Clario account
          </h2>
          <p className="font-avenir font-normal text-[16px] leading-[26px] text-black">
            Just a few details to get started.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-avenir text-[12px] leading-[26px] text-black">
            {getInstructionText()}
          </p>
          <input
            type="text"
            placeholder={getPlaceholder()}
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className={getInputStyles()}
          />
          {inputError && (
            <span className="text-[#F1511B] text-[12px] italic">
              {inputError}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-avenir text-[12px] leading-[26px] text-black">
            Full name
          </p>
          <input
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={handleNameChange}
            onKeyPress={handleKeyPress}
            className={getNameInputStyles()}
          />
          {nameError && (
            <span className="text-[#F1511B] text-[12px] italic">
              {nameError}
            </span>
          )}
        </div>

        <button
          onClick={handleContinue}
          className="w-full font-avenir font-bold text-[16px] leading-[26px] text-white bg-[#21527D] rounded-[10px] py-3"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default FullName;
