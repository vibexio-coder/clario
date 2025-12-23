import React from "react"; // Remove useState import
import CloseIcon from "../../assets/icons/loginpages/CloseIcon";
import PdfIcon from "../../assets/icons/uploadpage/PdfIcon";
import XlsxIcon from "../../assets/icons/uploadpage/XlsxIcon";
import DocIcon from "../../assets/icons/uploadpage/DocIcon";
// Remove ExtractingFilesPopup import

const ChooseAFormatPopup = ({ closePopup, openExtracting }) => {
    // Remove: const [showExtractingPopup, setShowExtractingPopup] = useState(false);

    return (
        <div className="w-[90%] max-w-[540px] rounded-[40px] shadow-[0px_16px_25.2px_7px_#1A55701A] p-6 sm:p-10 bg-[#FDFDFD] relative flex flex-col items-center gap-6">
            {/* Close Button */}
            <div className="absolute right-6 top-6 cursor-pointer" onClick={closePopup}>
                <CloseIcon />
            </div>

            {/* Title */}
            <h2 className="font-avenir font-semibold text-[24px] sm:text-[32px] leading-[32px] text-[#000000] text-center">
                Choose a format
            </h2>

            {/* 3 Formats */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-2">
                <div className="w-[90px] h-[90px] sm:w-[100px] sm:h-[100px] bg-[#EDF2F8] shadow-[0px_0px_4px_0px_#21527D40_inset] rounded-[10px] flex justify-center items-center">
                    <PdfIcon width={40} height={40} color="#21527D" opacity={1} />
                </div>
                <div className="w-[90px] h-[90px] sm:w-[100px] sm:h-[100px] bg-[#EDF2F8] shadow-[0px_0px_4px_0px_#21527D40_inset] rounded-[10px] flex justify-center items-center">
                    <DocIcon width={40} height={40} color="#21527D" opacity={1} />
                </div>
            </div>

            {/* Extract Button */}
            <button
                onClick={() => {
                    closePopup();
                    openExtracting(); // Call the prop from UploadPage
                }}
                className="font-avenir font-bold text-[18px] sm:text-[20px] text-[#FDFDFD] bg-[#21527D] rounded-[10px] w-[150px] sm:w-[165px] h-[45px] sm:h-[50px] mt-2"
            >
                Extract
            </button>
        </div>
        // Remove the entire ExtractingFilesPopup rendering block at the end
    );
};

export default ChooseAFormatPopup;