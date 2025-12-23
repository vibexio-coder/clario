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
    // Default button color (for inactive state)
    defaultButtonBg: "bg-[#E7EDF2]",
    defaultButtonTextColor: "text-[#121212]",
    // Button color when card is highlighted
    highlightedButtonBg: "bg-white",
    highlightedButtonTextColor: "text-[#21527D]",
    // Default features section color (for inactive state)
    defaultFeatureBg: "bg-[#E7EDF2]",
    // Features section color when card is highlighted
    highlightedFeatureBg: "bg-white",
    // Text colors
    originalPriceColor: "text-[#5B7C99]",
    originalTextColor: "text-[#21527D]",
    originalSubtitleColor: "text-[#121212]",
    link: "/signup",
    isLink: true,
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
    link: "/signup",
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
    link: "/signup",
  },
];

// Define the special color for highlighted card
const HIGHLIGHTED_COLOR = {
  cardBg: "bg-[#21527D]",
  textColor: "text-white",
  priceColor: "text-white",
  subtitleColor: "text-white",
};

const PlanCard = ({ plan, isHighlighted, onClick }) => {
  const ButtonComponent = plan.isLink ? Link : 'button';
  const buttonProps = plan.isLink
    ? { to: plan.link }
    : { type: "button" };

  // Determine colors based on whether this card is highlighted
  const cardBg = isHighlighted ? HIGHLIGHTED_COLOR.cardBg : "bg-[#FDFDFD]";
  const textColor = isHighlighted ? HIGHLIGHTED_COLOR.textColor : plan.originalTextColor;
  const subtitleColor = isHighlighted ? HIGHLIGHTED_COLOR.subtitleColor : plan.originalSubtitleColor;
  const priceColor = isHighlighted ? HIGHLIGHTED_COLOR.priceColor : plan.originalPriceColor;

  // Button colors based on highlighted state
  const buttonBg = isHighlighted ? plan.highlightedButtonBg : plan.defaultButtonBg;
  const buttonTextColor = isHighlighted ? plan.highlightedButtonTextColor : plan.defaultButtonTextColor;

  // Features section background based on highlighted state
  const featureBg = isHighlighted ? plan.highlightedFeatureBg : plan.defaultFeatureBg;
  const navigate = useNavigate();
  return (
    <div
      className={`flex-1 min-w-[280px] ${cardBg} rounded-[20px] shadow-[0px_0px_4px_0px_#00000040] p-4 md:p-5 lg:p-6 flex flex-col h-full cursor-pointer transition-colors duration-300`}
      onClick={onClick}
    >
      {/* TITLE */}
      <h2 className={`font-avenir font-semibold lg:font-bold text-[20px] leading-tight mb-3 ${textColor}`}>
        {plan.name}
      </h2>

      {/* SUBTITLE */}
      <p className={`font-avenir font-[600] text-[16px] leading-snug mb-4 ${subtitleColor}`}>
        {plan.subtitle}
      </p>

      {/* PRICE */}
      <div className="flex items-end gap-1 mb-4">
        <span className={`font-avenir font-semibold lg:font-bold text-[32px] leading-none ${priceColor}`}>
          {plan.price}
        </span>
        <span className={`font-avenir font-semibold lg:font-bold text-[16px] leading-none mb-1 ${priceColor}`}>
          {plan.period}
        </span>
      </div>

      {/* BUTTON */}
      <div className="mt-auto mb-4">
        <button
          className={`w-full max-w-[200px] mx-auto h-[50px] flex items-center justify-center 
  font-avenir font-semibold text-[20px] rounded-full ${buttonTextColor} ${buttonBg}`}
          onClick={(e) => {
            e.stopPropagation();
            navigate(plan.link);
          }}
        >
          {plan.buttonText}
        </button>

        {plan.extra && (
          <p className={`font-avenir font-bold italic text-[12px] text-center mt-2 ${isHighlighted ? "text-white/80" : "text-[#B6B6B6]"
            }`}>
            {plan.extra}
          </p>
        )}
      </div>

      {/* FEATURES SECTION */}
      <div className={`${featureBg} rounded-[20px] shadow-[0px_0px_4px_0px_#00000040] p-4 md:p-5 flex-1 transition-colors duration-300`}>
        <ul className="space-y-1">
          {plan.features.map((feature, i) => (
            <li key={i} className="font-avenir italic text-[14px] md:text-[15px] text-[#6E6E6E] leading-relaxed">
              • {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const PersonalScreen = () => {
  // Start with card 2 highlighted by default
  const [highlightedCardId, setHighlightedCardId] = useState(2);

  const handleCardClick = (cardId) => {
    // Only update if clicking a different card
    if (cardId !== highlightedCardId) {
      setHighlightedCardId(cardId);
    }
  };

  return (
    <div className="bg-[#FDFDFD] px-4 sm:px-6 md:px-8 lg:px-10 py-8 md:py-10">
      {/* HEADING */}
      <div className="mb-8 md:mb-12">
        <h1 className="font-avenir font-semibold lg:font-bold text-2xl md:text-3xl lg:text-4xl text-[#121212] mb-2">
          Scale Your Document Processing
        </h1>
        <p className="font-avenir italic text-base md:text-lg lg:text-xl text-[#464646]">
          Select the speed and volume your business needs, or build your own solution.
        </p>
      </div>

      {/* CARDS CONTAINER */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch px-0 xl:px-15">
          {basePlans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isHighlighted={plan.id === highlightedCardId}
              onClick={() => handleCardClick(plan.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalScreen;