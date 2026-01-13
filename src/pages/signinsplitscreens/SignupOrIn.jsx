import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../../assets/images/icon.webp";
import GoogleIcon from "../../assets/icons/loginpages/GoogleIcon";
import MailIcon from "../../assets/icons/loginpages/MailIcon";
import api from "../../api/axios";
import { useGoogleLogin } from "@react-oauth/google";

const SignupOrIn = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("loginValue");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);
  // 🔹 Gmail validation
  const validateEmail = (value) => {
    const trimmed = value.trim().toLowerCase();

    if (!trimmed) return "Email is required";
    if (!trimmed.endsWith("@gmail.com")) return "Use Gmail only";

    const regex = /^[a-z0-9._%+-]+@gmail\.com$/;
    if (!regex.test(trimmed)) return "Invalid Gmail address";

    return "";
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await api.post("/auth/google", {
          access_token: tokenResponse.access_token,
        });

        const { email } = res.data;

        localStorage.setItem("loginType", "google");
        localStorage.setItem("loginValue", email);

        // 🔥 Always go to landing page
        navigate("/landingpage");
      } catch (err) {
        setError("Google sign-in failed. Please try again.");
      }
    },
    onError: () => {
      setError("Google sign-in was cancelled or failed.");
    },
  });

  const handleContinue = async () => {
    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    const payload = { email: email.trim().toLowerCase() };

    localStorage.setItem("loginType", "email");
    localStorage.setItem("loginValue", payload.email);

    try {
      const res = await api.post("/auth/check-user", payload);

      if (res.data.exists) {
        navigate("/password");
      } else {
        navigate("/fullname");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleContinue();
  };

  const getInputStyles = () => {
    const base =
      "w-full border rounded-[6px] px-4 py-3 font-avenir text-[16px] leading-[26px] outline-none focus:ring-1";

    return error
      ? `${base} bg-white border-[#F1511B] text-[#F1511B] focus:ring-[#F1511B]`
      : `${base} bg-[#F2F2F2] border-[#21527D] text-[#21527D] focus:ring-[#21527D]`;
  };

  return (
    <div className="w-full max-w-[500px] bg-white shadow-[0px_0px_7px_0px_#00000040] md:rounded-[20px] px-10 py-8 flex flex-col gap-5">
      <div className="flex justify-center">
        <img
          src={icon}
          alt="logo"
          className="w-[150px] h-[60px] object-contain"
        />
      </div>

      <h2 className="font-kollektif font-semibold lg:font-bold text-[24px] text-[#21527D]">
        Sign in to Clario
      </h2>

      <div className="flex flex-col gap-2">
        <p className="font-avenir text-[12px] text-black">
          Enter your email address to continue.
        </p>

        <input
          type="email"
          placeholder="name@gmail.com"
          value={email}
          onChange={(e) => {
            const value = e.target.value.toLowerCase();
            setEmail(value);
            localStorage.setItem("loginValue", value);
            localStorage.setItem("loginType", "email");
            if (error) setError("");
          }}
          onKeyPress={handleKeyPress}
          className={getInputStyles()}
        />

        {error && (
          <span className="font-avenir text-[12px] text-[#F1511B] italic">
            {error}
          </span>
        )}
      </div>

      <button
        onClick={handleContinue}
        className="w-full font-avenir font-bold text-[16px] text-white bg-[#21527D] rounded-[10px] py-3"
      >
        Continue
      </button>

      <div className="flex items-center justify-center gap-3">
        <div className="flex-1 border-t border-[#C7C7C7]" />
        <span className="font-avenir font-bold text-[16px] text-[#C7C7C7]">
          Or
        </span>
        <div className="flex-1 border-t border-[#C7C7C7]" />
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={googleLogin}
          className="w-[50px] h-[50px] bg-[#FDFDFD] shadow rounded-full flex items-center justify-center"
        >
          <GoogleIcon />
        </button>

        <button className="w-[50px] h-[50px] bg-[#FDFDFD] shadow rounded-full flex items-center justify-center">
          <MailIcon />
        </button>
      </div>

      <p className="text-center font-avenir text-[16px] text-[#121212]">
        Don't have an account?{" "}
        <span
          onClick={() => navigate("/fullname")}
          className="text-[#21527D] font-bold cursor-pointer hover:underline"
        >
          Create one
        </span>
      </p>
    </div>
  );
};

export default SignupOrIn;
