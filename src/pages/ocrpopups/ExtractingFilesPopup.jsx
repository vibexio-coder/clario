import React, { useEffect, useState } from "react";
import CircularProgress from "../../assets/icons/popupscreens/CircularProgress";
import CloseIcon from "../../assets/icons/loginpages/CloseIcon";
import { useNavigate } from "react-router-dom";

const ExtractingFilesPopup = ({ closePopup }) => {
  const [percentage, setPercentage] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10); // seconds
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          navigate("/originalextractPage");
          return 100;
        }
        return prev + 10; // ⬅️ step
      });

      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000); // 1 second

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="w-[90%] max-w-[400px] rounded-[40px]
                    shadow-[0px_16px_25.2px_7px_#1A55701A]
                    p-6 sm:p-10 bg-[#FDFDFD]
                    relative flex flex-col items-center gap-6">

      {/* Close Button */}
      <div
        className="absolute right-6 top-6 cursor-pointer"
        onClick={closePopup}
      >
        <CloseIcon />
      </div>

      {/* Title */}
      <h2 className="font-avenir font-bold text-[18px] sm:text-[20px] text-black">
        Extracting 20 Files
      </h2>

      {/* Circular Progress */}
      <div className="flex justify-center">
        <CircularProgress percentage={percentage} />
      </div>

      {/* Status */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
        <div className="font-avenir font-semibold text-[16px] leading-[100%] text-[#307B52]">
          {percentage}% completed
        </div>

        <span className="hidden sm:block text-[#7D7D7D] text-[20px]">•</span>

        <div className="font-avenir font-semibold text-[16px] leading-[100%] text-[#C76E0F]">
          {timeLeft} sec Left
        </div>
      </div>

    </div>
  );
};

export default ExtractingFilesPopup;
