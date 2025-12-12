import React from 'react';
import bgimg from '../../assets/images/personalbgimg.webp';
import { Link } from 'react-router-dom';

const PersonalScreen = () => {
    return (
        <div className="w-full min-h-screen py-10 bg-[#FDFDFD]  bg-cover bg-center  px-5 md:px-8 lg:px-10"
            style={{ backgroundImage: `url(${bgimg})` }}>
            {/* Heading */}
            <div className='w-full flex justify-center'>
                <div className='w-full lg:w-[950px]'>
                    <h1 className="font-avenir font-semibold lg:font-bold text-[28px] lg:text-[36px] leading-[36px] text-[#121212] text-center lg:text-start">
                        Scale Your Document Processing
                    </h1>

                    <p className="font-avenir font-[400] italic text-[18px] lg:text-[24px] leading-[26px] text-[#464646] mt-5 text-center lg:text-start">
                        Select the speed and volume your business needs, or build your own solution.
                    </p>

                </div>
            </div>

            {/* Cards Wrapper */}
            <div className="relative mt-10 flex flex-wrap gap-8 justify-center items-center">

                {/* ------------------- CARD 1 ---------------------- */}
                <div className="relative rounded-[20px] p-[5px] w-[300px] h-[445px] 
                    border border-transparent transition-all duration-300  
                    hover:border-[#D6BF7C] hover:shadow-[0px_0px_4px_6px_#CEA73340]"
                >
                    <div className="relative w-full h-full bg-[#EADBAF] rounded-[20px] flex flex-col items-center py-6 gap-6">
                        <div className="bg-[#D6BF7C] w-full h-[300px] absolute bottom-0 rounded-t-[100%] rounded-b-[20px]"></div>

                        <h2 className="w-full font-avenir font-[700] text-[24px] text-[#121212] z-10 pl-6">
                            Free
                        </h2>

                        <div className="bg-[#F8F4F4] z-10 rounded-[25px] w-[240px] h-[260px] flex flex-col items-center gap-6 text-center px-5 py-8">
                            {/* Title - Row 1 */}
                            <h2 className="font-avenir font-[600] text-[20px] text-[#464646] h-[48px] flex items-center">
                                50 pages / month free
                            </h2>

                            {/* Description - Row 2 */}
                            <p className="font-avenir font-[400] italic text-[16px] text-[#6E6E6E] leading-[24px] min-h-[72px] flex items-center">
                                Basic OCR, community support, web UI + sandbox API access
                            </p>

                            {/* Price - Row 3 */}
                            <div className="flex flex-col items-center justify-center h-[72px]">
                                <h2 className="font-avenir font-[700] text-[24px] text-[#634C08]">
                                    $0 / month
                                </h2>
                                {/* Empty div for alignment */}
                                <div className="h-[24px]"></div>
                            </div>
                        </div>

                        <Link to='/uploadpage' className="font-avenir font-[600] text-[18px] bg-[#FFF5D9] border border-[#FFE9A8] shadow-[0px_0px_4px_2px_#FFE085] rounded-[100px] px-8 py-2 z-10">
                            Subscribe
                        </Link>
                    </div>
                </div>

                {/* ------------------- CARD 2 ---------------------- */}
                <div className="relative rounded-[20px] p-[5px] w-[300px] h-[445px] 
                    border border-transparent transition-all duration-300  
                    hover:border-[#4C90CC] hover:shadow-[0px_0px_4px_6px_#5B7C9940]"
                >
                    <div className="relative w-full h-full bg-[#C5D4E2] rounded-[20px] flex flex-col items-center py-6 gap-6">
                        <div className="bg-[#5B7C99] w-full h-[300px] absolute bottom-0 rounded-t-[100%] rounded-b-[20px]"></div>

                        <h2 className="w-full pl-6 font-avenir font-[700] text-[24px] text-[#121212] z-10">
                            Starter
                        </h2>

                        <div className="bg-[#F8F4F4] z-10 rounded-[25px] w-[240px] h-[260px] flex flex-col items-center gap-6 text-center px-5 py-8">
                            {/* Title - Row 1 */}
                            <h2 className="font-avenir font-[600] text-[20px] text-[#464646] h-[48px] flex items-center">
                                1,000 pages included
                            </h2>

                            {/* Description - Row 2 */}
                            <p className="font-avenir font-[400] italic text-[16px] text-[#6E6E6E] leading-[24px] min-h-[72px] flex items-center">
                                API access, email support
                            </p>

                            {/* Price - Row 3 */}
                            <div className="flex flex-col items-center justify-center h-[72px]">
                                <h2 className="font-avenir font-[700] text-[24px] text-[#19456B]">
                                    $29 / month
                                </h2>
                                <p className="font-avenir font-[700] italic text-[12px] leading-[24px] text-[#464646]/60">
                                    $0.02 / extra page
                                </p>
                            </div>
                        </div>

                        <button className="font-avenir font-[600] text-[18px] bg-[#E1F0FF] border border-[#47A6FF] backdrop-blur-[300px] shadow-[0px_0px_6.2px_2px_#7AB4EA] rounded-[100px] px-8 py-2 z-10">
                            Subscribe
                        </button>
                    </div>
                </div>

                {/* ------------------- CARD 3 ---------------------- */}
                <div className="relative rounded-[20px] p-[5px] w-[300px] h-[445px] 
                    border border-transparent transition-all duration-300  
                    hover:border-[#9A8DA0] hover:shadow-[0px_0px_4px_6px_#704B8140]"
                >
                    <div className="relative w-full h-full bg-[#DCD2E0] rounded-[20px] flex flex-col items-center py-6 gap-6">
                        <div className="bg-[#9A8DA0] w-full h-[300px] absolute bottom-0 rounded-t-[100%] rounded-b-[20px] z-10"></div>

                        <h2 className="w-full pl-6 font-avenir font-[700] text-[24px] text-[#121212] z-10">
                            Pro
                        </h2>

                        <div className="bg-[#F8F4F4] z-10 rounded-[25px] w-[240px] h-[260px] flex flex-col items-center gap-6 text-center px-5 py-8">
                            {/* Title - Row 1 */}
                            <h2 className="font-avenir font-[600] text-[20px] text-[#464646] h-[48px] flex items-center">
                                10,000 pages included
                            </h2>

                            {/* Description - Row 2 */}
                            <p className="font-avenir font-[400] italic text-[16px] text-[#6E6E6E] leading-[24px] min-h-[72px] flex items-center">
                                Priority support, advanced export options
                            </p>

                            {/* Price - Row 3 */}
                            <div className="flex flex-col items-center justify-center h-[72px]">
                                <h2 className="font-avenir font-[700] text-[24px] text-[#563B60]">
                                    $199 / month
                                </h2>
                                <p className="font-avenir font-[700] italic text-[12px] leading-[24px] text-[#464646]/60">
                                    $0.01 / extra page
                                </p>
                            </div>
                        </div>

                        <button className="font-avenir font-[600] text-[18px] bg-[#FCF3FF] border border-[#9E8BAD] backdrop-blur-[300px] shadow-[0px_0px_5.2px_2px_#D3B1E1] rounded-[100px] px-8 py-2 z-10">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PersonalScreen;