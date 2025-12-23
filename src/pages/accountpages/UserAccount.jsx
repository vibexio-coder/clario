import React from 'react';
import EditIcon from '../../assets/icons/accountpage/EditIcon';
import PlusCircleIcon from '../../assets/icons/accountpage/PlusCircleIcon';
import RotateArrowIcon from '../../assets/icons/accountpage/RotateArrowIcon';
import TrashIcon from '../../assets/icons/accountpage/TrashIcon';

const UserAccount = () => {
    return (
        <div>
            <h1 className='font-avenir font-semibold lg:font-bold text-[20px] lg:text-[24px] leading-[26px] text-[#21527D] mb-5'>
                ACCOUNT
            </h1>

            {/* INPUTS SECTION */}
            <div className='flex flex-col gap-4'>

                {/* USERNAME */}
                <div className="w-full h-[60px] md:h-[70px] bg-[#FDFDFD] rounded-[20px] 
                shadow-[0px_0px_12.4px_2px_#5757571A] flex items-center px-4 md:px-6">
                    <input
                        type="text"
                        placeholder="User Name"
                        className="w-full h-full bg-transparent outline-none font-avenir font-[600] 
                        text-[18px] md:text-[20px] leading-[24px] md:leading-[26px] placeholder:text-[#8D8D8D]"
                    />
                    <EditIcon width={24} height={24} className="cursor-pointer hidden md:block" />
                </div>

                {/* EMAIL */}
                <div className="w-full h-[60px] md:h-[70px] bg-[#FDFDFD] rounded-[20px] 
                shadow-[0px_0px_12.4px_2px_#5757571A] flex items-center px-4 md:px-6">
                    <input
                        type="text"
                        placeholder="E Mail"
                        className="w-full h-full bg-transparent outline-none font-avenir font-[600]  
                        text-[18px] md:text-[20px] leading-[24px] md:leading-[26px] placeholder:text-[#8D8D8D]"
                    />
                </div>

                {/* MOBILE NUMBER */}
                <div className="w-full h-[60px] md:h-[70px] bg-[#FDFDFD] rounded-[20px] 
                shadow-[0px_0px_12.4px_2px_#5757571A] flex items-center px-4 md:px-6">
                    <input
                        type="text"
                        placeholder="Mobile Number"
                        className="w-full h-full bg-transparent outline-none font-avenir font-[600] 
                        text-[18px] md:text-[20px] leading-[24px] md:leading-[26px] placeholder:text-[#8D8D8D]"
                    />
                </div>

                {/* PASSWORD */}
                <div className="w-full h-[60px] md:h-[70px] bg-[#FDFDFD] rounded-[20px] 
                shadow-[0px_0px_12.4px_2px_#5757571A] flex items-center px-4 md:px-6">
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full h-full bg-transparent outline-none font-avenir font-[600] 
                        text-[18px] md:text-[20px] leading-[24px] md:leading-[26px] placeholder:text-[#8D8D8D]"
                    />
                    <EditIcon width={24} height={24} className="cursor-pointer hidden md:block" />
                </div>

            </div>

            {/* BUTTONS */}
           
        </div>
    );
};

export default UserAccount;
