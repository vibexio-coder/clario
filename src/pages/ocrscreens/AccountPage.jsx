import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Subscription from '../accountpages/Subscription';
import UserAccount from '../accountpages/UserAccount';
import Navbar from '../landingpages/Navbar';
import Footer from '../landingpages/Footer';
import RightArrowIcon from '../../assets/icons/uploadpage/RightArrowIcon';
import LeftPaginationArrowIcon from '../../assets/icons/uploadpage/LeftPaginationArrowIcon';

const AccountPage = () => {
     const navigate = useNavigate();
    return (
        <div className='relative'>
            <Navbar />
            <div className="w-full px-4 md:px-10 lg:px-20 xl:px-50 py-8 flex flex-col gap-12 ">
                <div className='pt-10 lg:pt-0'>
                    <UserAccount />
                </div>
                <Subscription />
            </div>
            <Footer />
        </div>
    );
};

export default AccountPage;
