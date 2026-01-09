import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Base plans data
const basePlans = [
  {
    id: 1,
    name: "Free Plan",
    subtitle: "10 pages per day Always free",
    price: "$0",
    period: "/ month",
    buttonText: "Get Started Free",
    defaultButtonBg: "bg-[#E7EDF2]",
    defaultButtonTextColor: "text-[#121212]",
    highlightedButtonBg: "bg-white",
    highlightedButtonTextColor: "text-[#21527D]",
    defaultFeatureBg: "bg-[#E7EDF2]",
    highlightedFeatureBg: "bg-white",
    originalPriceColor: "text-[#5B7C99]",
    originalTextColor: "text-[#21527D]",
    originalSubtitleColor: "text-[#121212]",
    link: "/fullname",
    features: [
      "10 pages/day OCR processing",
      "Printed and handwritten text extraction",
      "Invoice data extraction → Excel",
      "Standard OCR accuracy",
      "Community support",
      "Secure sandbox access",
    ],
  },
  {
    id: 2,
    name: "Starter Plan",
    subtitle: "Built for growing teams",
    price: "$29",
    period: "/ month",
    extra: "$0.02 / extra page",
    buttonText: "Subscribe",
    defaultButtonBg: "bg-[#E7EDF2]",
    defaultButtonTextColor: "text-[#121212]",
    highlightedButtonBg: "bg-white",
    highlightedButtonTextColor: "text-[#21527D]",
    defaultFeatureBg: "bg-[#E7EDF2]",
    highlightedFeatureBg: "bg-white",
    originalPriceColor: "text-[#5B7C99]",
    originalTextColor: "text-[#21527D]",
    originalSubtitleColor: "text-[#121212]",
    features: [
      "1,000 pages/month included",
      "Printed + handwritten OCR",
      "Invoice extraction to Excel & CSV",
      "API access",
      "Email support",
    ],
  },
  {
    id: 3,
    name: "Pro Plan",
    subtitle: "For production-grade document workflows",
    price: "$199",
    period: "/ month",
    extra: "$0.01 / extra page",
    buttonText: "Subscribe",
    defaultButtonBg: "bg-[#E7EDF2]",
    defaultButtonTextColor: "text-[#121212]",
    highlightedButtonBg: "bg-white",
    highlightedButtonTextColor: "text-[#21527D]",
    defaultFeatureBg: "bg-[#E7EDF2]",
    highlightedFeatureBg: "bg-white",
    originalPriceColor: "text-[#5B7C99]",
    originalTextColor: "text-[#21527D]",
    originalSubtitleColor: "text-[#121212]",
    features: [
      "10,000 pages/month included",
      "High-accuracy handwritten OCR",
      "Advanced invoice & structured data extraction",
      "Priority support",
      "Advanced export options",
    ],
  },
];

// Highlight color
const HIGHLIGHTED_COLOR = {
  cardBg: "bg-[#21527D]",
  textColor: "text-white",
  priceColor: "text-white",
  subtitleColor: "text-white",
};

// CARD COMPONENT (UI SAME)
const PlanCard = ({ plan, isHighlighted, onSubscribe }) => {
  const navigate = useNavigate();

  const cardBg = isHighlighted ? HIGHLIGHTED_COLOR.cardBg : "bg-[#FDFDFD]";
  const textColor = isHighlighted ? HIGHLIGHTED_COLOR.textColor : plan.originalTextColor;
  const subtitleColor = isHighlighted ? HIGHLIGHTED_COLOR.subtitleColor : plan.originalSubtitleColor;
  const priceColor = isHighlighted ? HIGHLIGHTED_COLOR.priceColor : plan.originalPriceColor;
  const buttonBg = isHighlighted ? plan.highlightedButtonBg : plan.defaultButtonBg;
  const buttonTextColor = isHighlighted ? plan.highlightedButtonTextColor : plan.defaultButtonTextColor;
  const featureBg = isHighlighted ? plan.highlightedFeatureBg : plan.defaultFeatureBg;

  return (
    <div
      className={`flex-1 min-w-[280px] ${cardBg} rounded-[20px] shadow-[0px_0px_4px_0px_#00000040] p-4 md:p-5 lg:p-6 flex flex-col h-full cursor-pointer transition-colors duration-300`}
    >
      <h2 className={`font-avenir font-semibold lg:font-bold text-[20px] mb-3 ${textColor}`}>
        {plan.name}
      </h2>

      <p className={`font-avenir font-[600] text-[16px] mb-4 ${subtitleColor}`}>
        {plan.subtitle}
      </p>

      <div className="flex items-end gap-1 mb-4">
        <span className={`font-avenir font-bold text-[32px] ${priceColor}`}>
          {plan.price}
        </span>
        <span className={`font-avenir font-bold text-[16px] mb-1 ${priceColor}`}>
          {plan.period}
        </span>
      </div>

      {/* BUTTON – LOGIC ONLY */}
      <div className="mt-auto mb-4">
        <button
          className={`w-full max-w-[200px] mx-auto h-[50px] flex items-center justify-center hover:opacity-70 transition
          font-avenir font-semibold text-[20px] rounded-full ${buttonTextColor} ${buttonBg}`}
          onClick={(e) => {
            e.stopPropagation();
            if (plan.id === 1) {
              navigate("/fullname");
            } else {
              onSubscribe(plan);
            }
          }}
        >
          {plan.buttonText}
        </button>

        {plan.extra && (
          <p className={`font-avenir font-bold italic text-[12px] text-center mt-2 ${isHighlighted ? "text-white/80" : "text-[#B6B6B6]"}`}>
            {plan.extra}
          </p>
        )}
      </div>

      <div className={`${featureBg} rounded-[20px] shadow p-4 flex-1`}>
        <ul className="space-y-1">
          {plan.features.map((f, i) => (
            <li key={i} className="font-avenir italic text-[14px] text-[#6E6E6E]">
              • {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// MAIN SCREEN
const PersonalScreen = () => {
  const [highlightedCardId, setHighlightedCardId] = useState(2);

  // ✅ PAYMENT LOGIC - EXACTLY FROM OLD CODE
  const handlePayment = async (plan) => {
    const amount = plan.id === 2 ? 29 : 199;

    const res = await fetch("http://localhost:5000/api/auth/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    const order = await res.json();

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "Your Company Name",
      description: plan.name,
      order_id: order.id,

      handler: async function (response) {
        await fetch("/api/auth/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            plan: plan.name,
            amount,
            user_id: 1,
          }),
        });

        alert("Payment successful 🎉");
      },
    };

    new window.Razorpay(options).open();
  };

  const handleCardClick = (cardId) => {
    if (cardId !== highlightedCardId) {
      setHighlightedCardId(cardId);
    }
  };

  return (
    <div className="bg-[#FDFDFD] px-4 py-10">
      <h1 className="font-avenir font-bold text-3xl mb-2">
        Scale Your Document Processing
      </h1>
      <p className="font-avenir italic text-lg text-[#464646] mb-10">
        Select the speed and volume your business needs.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:px-10">
        {basePlans.map((plan) => (
          <div key={plan.id} onClick={() => handleCardClick(plan.id)}>
            <PlanCard
              plan={plan}
              isHighlighted={plan.id === highlightedCardId}
              onSubscribe={handlePayment}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalScreen;