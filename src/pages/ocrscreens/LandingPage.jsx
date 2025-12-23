import React from 'react';
import LandingSection from '../landingpages/LandingSection';
import Navbar from '../landingpages/Navbar';
import OcrWorksSection from '../landingpages/OcrWorksSection';
import Footer from '../landingpages/Footer';

const LandingPage = () => {
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className='w-full px-4 sm:px-6 lg:px-0'>
                <LandingSection />
            </div>
            <div className='w-full px-4 sm:px-6 lg:px-12 py-10'>
                <OcrWorksSection />
            </div>
            <div className=''>
                <Footer />
            </div>
        </div >
    );
}

export default LandingPage;
