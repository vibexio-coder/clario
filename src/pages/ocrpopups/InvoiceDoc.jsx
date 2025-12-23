import React, { useState } from "react";
import CloseIcon from "../../assets/icons/loginpages/CloseIcon";
import { Link } from "react-router-dom";

const InvoiceDoc = ({ onClose }) => {
  // null = default (Card 2 blue)
  // 1 = Card 1 blue
  // 2 = Card 2 blue
  const [hoveredCard, setHoveredCard] = useState(null);

  // Decide active card
  const activeCard = hoveredCard ?? 2;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 px-4">
      {/* Modal */}
      <div className="w-full max-w-[700px] bg-white rounded-[30px] shadow-[0px_4px_20px_0px_#00000040] p-6 sm:p-8 md:p-10 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-avenir font-semibold text-[20px] sm:text-[24px] text-[#121212]">
            Choose a format
          </h2>
          <button onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        {/* Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onMouseLeave={() => setHoveredCard(null)} // back to default
        >
          {/* ================= Card 1 ================= */}
          <Link to="/uploadpage">
            <div
              onMouseEnter={() => setHoveredCard(1)}
              className={`
                ${activeCard === 1 ? "bg-[#21527D]" : "bg-[#EDF2F8]"}
                shadow-[inset_0px_0px_4px_0px_#80628E7A]
                rounded-[12px]
                p-6 text-center flex flex-col gap-3
                transition-all duration-200 cursor-pointer
              `}
            >
              <h3 className={`font-avenir font-bold text-[16px] ${activeCard === 1 ? "text-white" : "text-[#21527D]"}`}>
                Invoice OCR
              </h3>

              <p className={`font-avenir font-semibold px-8 text-[12px] ${activeCard === 1 ? "text-white" : "text-[#121212]"}`}>
                Extract structured invoice data with high accuracy.
              </p>

              <p className={`font-avenir font-semibold text-[10px] ${activeCard === 1 ? "text-white" : "text-[#121212]"}`}>
                Auto detect fields and export to Excel
              </p>

              <div className="mt-3">
                <p className={`font-avenir font-bold text-[10px] ${activeCard === 1 ? "text-white" : "text-[#121212]"}`}>
                  Input formats
                </p>
                <p className={`font-avenir italic text-[10px] ${activeCard === 1 ? "text-white" : "text-[#21527D]"}`}>
                  PDF · Image
                </p>
              </div>
            </div>
          </Link>

          {/* ================= Card 2 ================= */}
          <Link to="/uploadpage">
            <div
              onMouseEnter={() => setHoveredCard(2)}
              className={`
                ${activeCard === 2 ? "bg-[#21527D]" : "bg-[#EDF2F8]"}
                shadow-[inset_0px_0px_4px_0px_#80628E7A]
                rounded-[12px]
                p-6 text-center flex flex-col gap-3
                transition-all duration-200 cursor-pointer
              `}
            >
              <h3 className={`font-avenir font-bold text-[16px] ${activeCard === 2 ? "text-white" : "text-[#21527D]"}`}>
                Document OCR
              </h3>

              <p className={`font-avenir font-semibold px-8 text-[12px] ${activeCard === 2 ? "text-white" : "text-[#121212]"}`}>
                Convert documents into clean, searchable text.
              </p>

              <p className={`font-avenir font-semibold text-[10px] ${activeCard === 2 ? "text-white" : "text-[#121212]"}`}>
                Works with printed and handwritten content.
              </p>

              <div className="mt-3">
                <p className={`font-avenir font-bold text-[10px] ${activeCard === 2 ? "text-white" : "text-[#121212]"}`}>
                  Input formats
                </p>
                <p className={`font-avenir italic text-[10px] ${activeCard === 2 ? "text-white" : "text-[#21527D]"}`}>
                  PDF · Image
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDoc;
