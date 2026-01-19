import React from 'react';
import DemoLanding from '../demolandingpages/DemoLanding';
import OcrWorksSection from '../landingpages/OcrWorksSection';
import Footer from '../landingpages/Footer';
import Navbar from '../landingpages/Navbar';

const DemoLandingScreen = () => {
    return (
        <div>
            <Navbar />
            <DemoLanding />
            <div className='w-full px-4 sm:px-6 lg:px-12 py-10'>
                <OcrWorksSection />
            </div>
            <Footer />
            
        </div>
    );
}

export default DemoLandingScreen;
