import React from 'react';
import CloseIcon from '../../assets/icons/loginpages/CloseIcon';
import { Link } from 'react-router-dom';

const LandingPopup = ({ closePopup }) => {
    return (
        <div className="relative w-[90%] max-w-[640px] h-auto rounded-[30px] bg-[#FDFDFD] 
                        shadow-[0px_0px_13px_0px_#00000040] mx-auto p-6 sm:p-12">

            <div
                className="absolute right-3 md:right-8 top-5 md:top-6 cursor-pointer"
                onClick={closePopup}
            >
                <CloseIcon />
            </div>

            {/* Heading */}
            <h2 className="font-avenir font-bold text-[20px] sm:text-[24px] leading-[30px] sm:leading-[43px] 
                           text-center text-[#121212] mb-4 px-3 md:px-0">
                Your Trial Has Ended. Keep Your Automation Running.
            </h2>

            {/* Paragraph */}
            <p className="font-avenir font-[350] text-[16px] sm:text-[20px] leading-[26px] sm:leading-[33px] 
                          text-center text-[#686565] mb-8 px-2">
                The 10 page Free Trial is over. Your access to automated workflows
                and extracted data is now paused.
            </p>

            {/* Button */}
            <Link to='/pricingpage'>
                <div className="flex justify-center">
                    <button className="font-avenir font-bold text-[18px] sm:text-[24px] leading-[100%]
                                   text-[#FDFDFD] bg-[#21527D] w-[200px] sm:w-[280px] 
                                   h-[50px] sm:h-[60px] rounded-[30px]">
                        Subscribe Now
                    </button>
                </div>
            </Link>

        </div>
    );
};

export default LandingPopup;
