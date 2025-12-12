import React from 'react';
import bgimg from '../../assets/images/enterpricebgimg.webp'

const EnterpriseScreen = () => {
    return (
        <div className="w-full flex justify-center relative overflow-hidden py-10 px-5 md:px-8 lg:px-10">
            <div className="w-full max-w-[950px]">

                {/* Title Section */}
                <h1 className="font-avenir  font-semibold lg:font-bold text-[28px] lg:text-[36px] leading-[36px] text-[#121212] text-center lg:text-start">
                    Flexible Plans for Every Business Need
                </h1>

                <p className="font-avenir font-[400] italic text-[18px] lg:text-[24px] leading-[26px] text-[#464646] mt-3 text-center lg:text-start">
                    Adapt your OCR to the way your business works.
                </p>

                {/* Main Grey Card */}
                <div className="mt-6 md:mt-10 bg-[#494949] rounded-[20px] py-8 md:py-10 px-4 md:px-5 flex flex-col items-center justify-center relative overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url(${bgimg})` }}>

                    {/* Enterprise Title */}
                    <h2 className="font-avenir font-[700] text-[22px] md:text-[24px] leading-[26px] text-[#FDFDFD] text-center">
                        Enterprise <span className="font-[400] italic">(Custom pricing)</span>
                    </h2>

                    {/* White Center Box */}
                    <div className="mt-6 md:mt-10 bg-[#F8F4F4] rounded-[20px] md:rounded-[24px] w-full max-w-[700px] py-6 md:py-8 px-4 md:px-6 text-center shadow-md">

                        <h2 className="font-avenir font-[400] italic text-[16px] md:text-[20px] leading-[26px] md:leading-[32px] text-[#464646]">
                            Dedicated infra, SSO, custom SLAs, on-prem or VPC options <br /> Dedicated onboarding, SOC 2/HIPAA contracts
                        </h2>

                       <h1 className="font-avenir font-semibold lg:font-bold text-[20px] md:text-[24px] leading-[32px] md:leading-[38px] text-[#464646] mt-4 md:mt-5">
                            Typical per-page<br />
                            $0.005–$0.008 at scale
                        </h1>

                        <h3 className="font-avenir font-semibold lg:font-bold italic text-[18px] md:text-[20px] leading-[26px] md:leading-[29px] text-[#464646]/40 opacity-60 mt-4 md:mt-5">
                            Volume discounts
                        </h3>
                    </div>

                    {/* Contact Sales Button */}
                    <button className="mt-6 md:mt-10 w-[200px] md:w-[250px] h-[45px] md:h-[50px] font-avenir font-[750] text-[18px] md:text-[20px] leading-[24px] md:leading-[26px] text-[#FFFFFF]
                        bg-[#373737] border border-[#DCDCDC80] shadow-[0px_0px_4px_4px_#FFFFFF40] rounded-[100px]">
                        Contact Sales
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EnterpriseScreen;