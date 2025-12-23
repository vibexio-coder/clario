import React from 'react';
import PlusCircleIcon from '../../assets/icons/accountpage/PlusCircleIcon';
import RotateArrowIcon from '../../assets/icons/accountpage/RotateArrowIcon';
import TrashIcon from '../../assets/icons/accountpage/TrashIcon';

const Subscription = () => {
    return (
        <div>
            <h1 className='font-avenir font-semibold lg:font-bold text-[20px] lg:text-[24px] leading-[26px] tracking-[0] text-[#21527D] mb-5'>
                SUBSCRIPTION
            </h1>

            <div className="
                w-full 
                flex flex-col md:flex-row 
                justify-between 
                items-start
                gap-6 
                py-8 md:py-10 
                px-5 md:px-10 
                shadow-[0px_0px_22.8px_2px_#57575740] 
                bg-[#FDFDFD] 
                rounded-[20px]
            ">

                {/* LEFT SIDE */}
                <h2 className="
                    font-avenir font-semibold 
                    text-[18px] md:text-[20px] 
                    leading-[30px] md:leading-[50px] 
                    tracking-[0.24em] 
                    capitalize 
                    text-[#121212]
                    text-left
                ">
                    YOUR CURRENT PLAN IS <br />
                    <span className='
                        font-avenir font-semibold lg:font-bold 
                        text-[26px] md:text-[30px] 
                        leading-8 md:leading-10 
                        tracking-[0.24em] 
                        capitalize 
                        text-[#21527D]
                    '>
                        Starter
                    </span>
                </h2>

                {/* RIGHT SIDE */}
                <div className="flex flex-col items-start md:items-end gap-3 w-full md:w-auto">

                    {/* EXPIRY SECTION */}
                    <div className="text-left bg-[#C5D4E2]/30 rounded-[10px] px-3 py-2 w-full md:w-auto">
                        <div className='font-avenir font-semibold text-[12px] leading-[25px] tracking-[0.25em] capitalize text-[#21527D]'>
                            EXPIRES ON
                        </div>
                        <div className='font-avenir font-[750] text-[16px] leading-[25px] tracking-[0.24em] capitalize text-[#21527D]'>
                            25 NOV 2025
                        </div>
                    </div>

                    {/* BUTTONS */}
                    <div className="flex flex-col sm:flex-row gap-5 mt-6 md:mt-10 w-full md:w-auto">
                        <button className='
                            w-full sm:w-[150px] 
                            h-[45px] 
                            font-avenir font-semibold 
                            text-[16px] 
                            leading-[100%] 
                            tracking-[0] 
                            text-[#FDFDFD] 
                            bg-[#21527D] 
                            rounded-[10px]
                        '>
                            Upgrade
                        </button>

                        <button className='
                            w-full sm:w-[180px] 
                            h-[45px] 
                            font-avenir font-semibold 
                            text-[16px] 
                            leading-[100%] 
                            tracking-[0] 
                            text-[#D45757] 
                            bg-[#FFF4F4] 
                            border border-[0.25px] border-[#D45757] 
                            rounded-[10px]
                        '>
                            Cancel Subscription
                        </button>
                    </div>

                </div>

            </div>
            <div className='flex flex-row flex-wrap gap-5 mt-10 justify-center'>

                {/* LOGOUT */}
                <button
                    className="
    w-full sm:w-[235px] h-[55px] md:h-[65px]
    flex items-center justify-center gap-3
    font-avenir font-[350] text-[20px] md:text-[24px]
    leading-[100%] tracking-[0.09em] capitalize
    text-[#21527D] bg-[#E9F5FF]
    border border-[0.25px] border-[#21527D]
    shadow-[0px_1px_4px_0px_#0000001A]
    rounded-[100px]
  "
                >
                    <RotateArrowIcon width={32} height={32} />
                    Logout
                </button>



                {/* DELETE ACCOUNT */}
                <button className='w-full sm:w-[235px] h-[55px] md:h-[65px] flex items-center justify-center gap-3 
                font-avenir font-[350] text-[20px] md:text-[24px] leading-[100%] tracking-[0.09em] capitalize 
                text-[#C62525] bg-[#FFF4F4] border border-[0.25px] border-[#D25B5C] 
                shadow-[0px_1px_4px_0px_#0000001A] rounded-[100px]'>
                    <TrashIcon width={32} height={32} />
                    Delete
                </button>

            </div>
        </div>

    );
}

export default Subscription;
