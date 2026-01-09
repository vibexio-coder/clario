import React, { useEffect, useState } from "react";
import CircularProgress from "../../assets/icons/popupscreens/CircularProgress";
import CloseIcon from "../../assets/icons/loginpages/CloseIcon";
import { useNavigate } from "react-router-dom";

const TOTAL_STEPS = 10;

const ExtractingFilesPopup = ({ closePopup, fileCount = 0 }) => {
  const [percentage, setPercentage] = useState(0);
  const navigate = useNavigate();

  const timeLeft = TOTAL_STEPS - percentage / 10;

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          navigate("/originalextractPage");
          return 100;
        }
        return prev + 10; // 10,20...100
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div
      className="w-[90%] max-w-[400px] rounded-[40px]
                 shadow-[0px_16px_25.2px_7px_#1A55701A]
                 p-6 sm:p-10 bg-[#FDFDFD]
                 relative flex flex-col items-center gap-6"
    >
      {/* Close */}
      <div
        className="absolute right-6 top-6 cursor-pointer"
        onClick={closePopup}
      >
        <CloseIcon />
      </div>

      {/* Title */}
      <h2 className="font-avenir font-bold text-[18px] sm:text-[20px] text-black text-center">
        Extracting {fileCount} {fileCount === 1 ? "File" : "Files"}
      </h2>

      {/* Progress */}
      <CircularProgress percentage={percentage} />

      {/* Status */}
      <div className="flex gap-4 items-center">
        <div className="font-avenir font-semibold text-[16px] text-[#307B52]">
          {percentage}% completed
        </div>

        <span className="text-[#7D7D7D] text-[20px]">•</span>

        <div className="font-avenir font-semibold text-[16px] text-[#C76E0F]">
          {timeLeft} sec Left
        </div>
      </div>
    </div>
  );
};

export default ExtractingFilesPopup;
