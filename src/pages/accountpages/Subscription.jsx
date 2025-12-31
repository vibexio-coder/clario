import React from 'react';
import Navbar from '../landingpages/Navbar';

const Subscription = () => {
    return (
        <div>
            <Navbar/>
            <div className="w-full px-4 sm:px-6 lg:px-8 py-5 lg:py-10">
                {/* Header */}
                <h2 className="font-avenir font-normal text-2xl sm:text-3xl lg:text-[32px] leading-[26px] text-[#21527D] mb-4 sm:mb-6">
                    Subscription
                </h2>

                <p className="font-avenir font-normal text-base sm:text-[15px] lg:text-[16px] leading-[26px] text-[#21527D] mb-4 sm:mb-6">
                    Current plan
                </p>

                {/* Plan Card */}
                <div className="bg-[#21527D] shadow-[0px_0px_4px_0px_#00000040] rounded-[20px] p-5 sm:p-6 md:p-8 max-w-[350px]">
                    {/* Plan Title */}
                    <h2 className="font-avenir font-bold text-lg sm:text-xl md:text-[20px] leading-[100%] text-white mb-3 sm:mb-4">
                        Starter Plan
                    </h2>

                    {/* Plan Details */}
                    <div className="space-y-2 sm:space-y-3 mb-5 sm:mb-6">
                        <p className="font-avenir font-[750] text-base sm:text-[15px] md:text-[16px] leading-[26px] text-white">
                            <span className="font-normal">Usage:</span> 10 pages free per day
                        </p>

                        <p className="font-avenir font-normal text-base sm:text-[15px] md:text-[16px] leading-[26px] text-white/90">
                            Expires on 25 Nov 2025
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <button
                            className="font-avenir font-bold text-xs sm:text-[12px] leading-[26px] text-white border border-white w-full sm:w-[140px] h-[36px] sm:h-[30px] rounded-[10px] cursor-pointer"
                        >
                            Deactivate
                        </button>

                        <button
                            className="font-avenir font-bold text-xs sm:text-[12px] leading-[26px] text-[#21527D] bg-white w-full sm:w-[140px] h-[36px] sm:h-[30px] rounded-[10px] cursor-pointer"
                        >
                            Change plan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Subscription;