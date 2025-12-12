import React from "react";
import CircularProgress from "../../assets/icons/popupscreens/CircularProgress";
import CloseIcon from "../../assets/icons/loginpages/CloseIcon";
import { Link } from "react-router-dom";

const ExtractingFilesPopup = ({ closePopup, percentage = 40, timeLeft = "10 sec" }) => {
    return (
        <div className="bg-[#FFFFFF] w-[90%] max-w-[500px] min-h-[320px] shadow-[0px_0px_13px_0px_#00000040] rounded-[20px] p-6 sm:p-8 mx-auto flex flex-col items-center gap-6 relative">
            {/* Close Button - Add onClick handler */}
            <div className="absolute right-6 top-6 cursor-pointer" onClick={closePopup}>
                <CloseIcon />
            </div>

            {/* Title */}
            <h2 className="font-avenir font-bold text-[18px] sm:text-[20px] text-[#000]">
                Extracting 20 Files
            </h2>

            {/* Pie Chart */}
            <div className="flex justify-center">
                <CircularProgress percentage={percentage} />
            </div>

            {/* Status (Percentage + Time Left) */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
                <div className="font-avenir font-semibold text-[16px] leading-[100%] text-[#307B52]">
                    {percentage}% completed
                </div>
                <span className="hidden sm:block text-[#7D7D7D] text-[20px]">•</span>
                <div className="font-avenir font-semibold text-[16px] leading-[100%] text-[#C76E0F]">
                    {timeLeft} Left
                </div>
            </div>

            <Link
                to="/originalextractPage"
                className="font-avenir font-bold text-[18px] sm:text-[20px]
               text-[#FDFDFD] bg-[#21527D] rounded-[10px]
               w-[150px] sm:w-[165px] h-[45px] sm:h-[50px] mt-2
               flex items-center justify-center hover:opacity-90 transition"
            >
                Extract
            </Link>
        </div>
    );
};

export default ExtractingFilesPopup;