import React from "react";
import CloseIcon from "../../assets/icons/loginpages/CloseIcon";
import PdfIcon from "../../assets/icons/uploadpage/PdfIcon";
import DocIcon from "../../assets/icons/uploadpage/DocIcon";

const ChooseAFormatPopup = ({ closePopup, openExtracting }) => {
    const handleFormatSelect = () => {
        closePopup();
        openExtracting();
    };

    return (
        <div className="w-full max-w-[400px] rounded-[40px]
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
            <h2 className="font-avenir font-semibold text-[24px] sm:text-[32px]
                     leading-[32px] text-black text-center">
                Choose a format
            </h2>

            {/* Formats */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 mt-2">

                {/* PDF */}
                <div
                    onClick={handleFormatSelect}
                    className="w-[90px] h-[90px] sm:w-[100px] sm:h-[100px]
           bg-[#EDF2F8]
           rounded-[10px]
           flex justify-center items-center
           cursor-pointer
           shadow-[0px_0px_4px_0px_#21527D40_inset]
           transition-all duration-300 ease-out
           hover:bg-[#FDFDFD]
           hover:ring-[0.5px] hover:ring-[#21527D]
           hover:shadow-[0px_0px_6px_0px_#21527D80_inset]
           hover:scale-[1.05]"

                >
                    <PdfIcon width={40} height={40} color="#21527D" opacity={1} />
                </div>


                {/* DOC */}
                <div
                    onClick={handleFormatSelect}
                    className="w-[90px] h-[90px] sm:w-[100px] sm:h-[100px]
           bg-[#EDF2F8]
           rounded-[10px]
           flex justify-center items-center
           cursor-pointer
           shadow-[0px_0px_4px_0px_#21527D40_inset]
           transition-all duration-300 ease-out
           hover:bg-[#FDFDFD]
           hover:ring-[0.5px] hover:ring-[#21527D]
           hover:shadow-[0px_0px_6px_0px_#21527D80_inset]
           hover:scale-[1.05]"

                >
                    <DocIcon width={40} height={40} color="#21527D" />
                </div>

            </div>
        </div>
    );
};

export default ChooseAFormatPopup;
