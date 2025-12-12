import React, { useEffect, useState } from 'react';
import img1 from '../../assets/images/clarioimg.webp';
import bgimg from '../../assets/images/backgroundimg.webp';
import LandingPopup from '../ocrpopups/LandingPopup';

const LandingSection = () => {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        if (showPopup) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [showPopup]);

    return (
        <div
            className="w-full flex justify-center items-center 
                       bg-cover bg-center bg-no-repeat py-5"
            style={{ backgroundImage: `url(${bgimg})` }}
        >
            <div className="
                w-full max-w-[900px] 
                bg-[#FDFDFD] 
                shadow-[0px_0px_22.8px_2px_#57575740]
                rounded-[20px] 
                flex flex-col items-center 
                px-4 sm:px-6 md:px-10 
                py-8 sm:py-10 md:py-12
            ">

                {/* IMAGE */}
                <img
                    src={img1}
                    alt="Landing Visual"
                    className="
                        w-[240px] h-[180px] 
                        sm:w-[300px] sm:h-[180px] 
                        md:w-[380px] md:h-[180px] 
                        lg:w-[450px] lg:h-[210px] 
                        object-contain mb-6 sm:mb-8
                    "
                />

                {/* TEXT WRAPPER */}
                <div className="flex flex-col items-center gap-4 sm:gap-5 px-2 sm:px-4">

                    {/* HEADING */}
                    <h2 className="
                        font-avenir font-semibold lg:font-bold
                        text-[18px] sm:text-[20px] md:text-[22px] 
                        leading-[26px] text-[#121212] text-center
                    ">
                        Intelligent OCR, built for efficiency.
                    </h2>

                    {/* DESCRIPTION */}
                    <p className="
                        font-avenir font-light 
                        text-[14px] sm:text-[15px] md:text-[16px] 
                        leading-[26px] sm:leading-[28px] md:leading-[29px] 
                        text-[#121212] max-w-[750px] text-center
                    ">
                        Convert documents, images, and handwritten text into structured, editable content
                        with exceptional accuracy and speed. Preserve layouts, detect tables, and export
                        seamlessly all from a single, streamlined platform.
                    </p>

                    {/* BUTTON */}
                    <button
                        className="
                            mt-3 sm:mt-4 
                            font-avenir font-[700] 
                            text-[16px] sm:text-[18px] md:text-[20px] 
                            leading-[100%] text-[#EDECE9] 
                            bg-[#21527D] rounded-[30px] 
                            px-8 sm:px-10 py-3 
                            hover:opacity-90 transition
                        "
                        onClick={() => setShowPopup(true)}
                    >
                        Extract
                    </button>

                    {showPopup && (
                        <div className="
        fixed inset-0 flex items-center justify-center 
        bg-black/40 backdrop-blur-sm 
        z-50
    ">
                            <LandingPopup closePopup={() => setShowPopup(false)} />
                        </div>
                    )}


                </div>
            </div>
        </div>
    );
};

export default LandingSection;
