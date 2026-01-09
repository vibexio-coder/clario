import React, { useEffect } from 'react';
import CheckCircleIcon from '../../assets/icons/popupscreens/CheckCircleIcon';
import CloseIcon from '../../assets/icons/loginpages/CloseIcon';

const ExportSuccessfulPopup = ({ closePopup }) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            closePopup();
        }, 1000); // ⏱️ 1 minute = 60000 ms

        return () => clearTimeout(timer); // cleanup
    }, [closePopup]);

    return (
        <div className="w-[90%] max-w-[400px] rounded-[40px] 
                        shadow-[0px_16px_25.2px_7px_#1A55701A]
                        p-8 sm:p-10 flex flex-col items-center gap-6 relative bg-[#FDFDFD]">

            {/* Close Button */}
            <div
                className="absolute right-6 top-6 cursor-pointer"
                onClick={closePopup}
            >
                <CloseIcon />
            </div>

            {/* Title */}
            <h2 className="font-avenir font-medium md:font-semibold text-[22px] sm:text-[32px] leading-[26px] text-[#000000] text-center">
                Export Successful
            </h2>

            {/* Icon */}
            <div className="flex justify-center bg-[linear-gradient(205.4deg,#D0DFEB_36.54%,rgba(253,253,253,0.6)_180%)] rounded-[100%] p-2">
                <CheckCircleIcon width={100} height={100} />
            </div>
        </div>
    );
};

export default ExportSuccessfulPopup;
