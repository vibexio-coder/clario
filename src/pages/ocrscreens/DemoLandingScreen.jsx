import React from 'react';
import DemoNavbar from '../demolandingpages/DemoNavbar';
import DemoLanding from '../demolandingpages/DemoLanding';
import OcrWorksSection from '../landingpages/OcrWorksSection';
import Footer from '../landingpages/Footer';

const DemoLandingScreen = () => {
    return (
        <div>
            <DemoNavbar />
            <DemoLanding />
            <div className='w-full px-4 sm:px-6 lg:px-12 py-10'>
                <OcrWorksSection />
            </div>
            <Footer />
            <div className='pb-15 lg:pb-0'>

            </div>
        </div>
    );
}

export default DemoLandingScreen;
