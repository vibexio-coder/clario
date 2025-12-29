import React, { useEffect, useState, useRef } from 'react';
import MenuIcon from '../../assets/icons/uploadpage/MenuIcon';
import HomeIcon from '../../assets/icons/uploadpage/HomeIcon';
import CloseIcon from '../../assets/icons/loginpages/CloseIcon';
import PdfIcon from '../../assets/icons/uploadpage/PdfIcon';
import TrashIcon from '../../assets/icons/accountpage/TrashIcon';
import EditIcon from '../../assets/icons/accountpage/EditIcon';
import PngIcon from '../../assets/icons/uploadpage/PngIcon';
import LeftPaginationArrowIcon from '../../assets/icons/uploadpage/LeftPaginationArrowIcon';
import DiagonalSlashIcon from '../../assets/icons/uploadpage/DiagonalSlashIcon';
import RightArrowIcon from '../../assets/icons/uploadpage/RightArrowIcon';
import SearchMinusIcon from '../../assets/icons/uploadpage/SearchMinusIcon';
import SearchAddIcon from '../../assets/icons/uploadpage/SearchAddIcon';
import ExportSuccessfulPopup from '../ocrpopups/ExportSuccessfulPopup';
import WebpIcon from '../../assets/icons/uploadpage/WebpIcon';
import JpgIcon from '../../assets/icons/uploadpage/JpgIcon';
import JpegIcon from '../../assets/icons/uploadpage/JpegIcon';
import SvgIcon from '../../assets/icons/uploadpage/SvgIcon';
import Footer from '../landingpages/Footer';
import Navbar from '../landingpages/Navbar';

const OriginalExtractPage = () => {
    const [showExportPopup, setShowExportPopup] = useState(false);
    const [open, setOpen] = useState(false);
    
    // Add zoom states for both original and extracted sections
    const [originalZoom, setOriginalZoom] = useState(100);
    const [extractedZoom, setExtractedZoom] = useState(100);

    // Zoom functions for original section
    const handleOriginalZoomIn = () => {
        if (originalZoom < 200) {
            setOriginalZoom(prev => Math.min(prev + 10, 200));
        }
    };

    const handleOriginalZoomOut = () => {
        if (originalZoom > 20) {
            setOriginalZoom(prev => Math.max(prev - 10, 20));
        }
    };

    // Zoom functions for extracted section
    const handleExtractedZoomIn = () => {
        if (extractedZoom < 200) {
            setExtractedZoom(prev => Math.min(prev + 10, 200));
        }
    };

    const handleExtractedZoomOut = () => {
        if (extractedZoom > 20) {
            setExtractedZoom(prev => Math.max(prev - 10, 20));
        }
    };

    useEffect(() => {
        console.log('Popup states:', {
            exportPopup: showExportPopup,
            open: open
        });

        if (showExportPopup || open) { // Add 'open' for the off-canvas sidebar
            const scrollY = window.scrollY;
            console.log('Saving scroll position:', scrollY);

            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = "0";
            document.body.style.right = "0";
            document.body.style.width = "100%";
            document.body.style.overflow = "hidden";
        } else {
            const scrollY = document.body.style.top;
            console.log('Restoring from:', scrollY);

            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.left = "";
            document.body.style.right = "";
            document.body.style.width = "";
            document.body.style.overflow = "";

            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || "0") * -1);
            }
        }

        return () => {
            console.log('Cleanup running');
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.left = "";
            document.body.style.right = "";
            document.body.style.width = "";
            document.body.style.overflow = "";
        };
    }, [showExportPopup, open]);
    
    return (
        <div>
            <Navbar />
            <div className="bg-white p-4 sm:p-6 md:p-8 lg:p-10">
                {/* Overlay */}
                {open && (
                    <div
                        className="fixed inset-0 bg-black/40 z-40"
                        onClick={() => setOpen(false)}
                    ></div>
                )}

                {/* Main Content */}
                <div className="flex flex-col lg:flex-row  gap-6 lg:gap-10 xl:gap-20 px-0 md:px-10 xl:px-30">
                    {/* Left Column - Original */}
                    <div className="lg:w-1/2 flex flex-col gap-4 sm:gap-5 mt-4 sm:mt-6 lg:mt-0">
                        {/* Preview Section */}
                        <div className="w-full h-auto min-h-[350px] sm:min-h-[400px] bg-[#E7EDF2] p-3 sm:p-4 md:p-5 rounded-[15px] sm:rounded-[20px] flex flex-col justify-center items-center">
                            {/* Title and Pagination */}
                            <div className='w-full flex flex-col items-center mb-3 sm:mb-4'>
                                <h2 className="font-avenir font-bold text-[16px] sm:text-[18px] leading-[26px] text-[#21527D] mb-2">
                                    Original File
                                </h2>
                            </div>

                            {/* Main Display Box */}
                            <div className="w-full max-w-[400px] lg:max-w-full xl:max-w-[450px]
                                h-[300px] md:h-[310px]
                                rounded-[25px] bg-[#FDFDFD]
                                shadow-[0px_-2px_4px_0px_#21527D1A]
                                p-4 relative overflow-auto scrollbar-hide">

                                {/* Content with zoom */}
                                <div className="relative z-10 min-h-full">
                                    <div 
                                        style={{
                                            fontSize: `${originalZoom}%`,
                                            lineHeight: '1.6',
                                            transition: 'font-size 0.3s ease'
                                        }}
                                    >
                                        <p className="font-avenir text-[#000000]">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                            commodo consequat.
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora aperiam perspiciatis voluptatum rerum architecto laborum error voluptates perferendis nostrum inventore.
                                        </p>
                                    </div>
                                </div>

                            </div>

                        </div>

                        {/* Control Bar */}
                        <div className="w-full flex flex-wrap sm:flex-nowrap items-center justify-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 bg-[#E7EDF2] rounded-[12px] sm:rounded-[15px]">
                            {/* Left Zoom Controls */}
                            <div className="flex items-center gap-2 sm:gap-3 pr-3 sm:pr-4 border-r border-[#21527D]/20">
                                <button 
                                    onClick={handleOriginalZoomOut}
                                    className="hover:opacity-80 transition-opacity"
                                >
                                    <SearchMinusIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                                </button>
                                <div className="w-[45px] sm:w-[50px] h-[28px] sm:h-[30px] flex items-center justify-center rounded-[6px] sm:rounded-[8px] bg-[#FFFFFF] text-[#21527D] font-avenir font-black text-[12px] sm:text-[14px] leading-[100%] opacity-[0.70]">
                                    {originalZoom}%
                                </div>
                                <button 
                                    onClick={handleOriginalZoomIn}
                                    className="hover:opacity-80 transition-opacity"
                                >
                                    <SearchAddIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                                </button>
                            </div>

                            {/* Pagination Section */}
                            <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 border-r border-[#21527D]/20">
                                <LeftPaginationArrowIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                                <div className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] flex items-center justify-center rounded-[6px] sm:rounded-[8px] bg-[#FFFFFF] text-[#21527D] font-avenir font-black text-[12px] sm:text-[14px] leading-[100%] opacity-[0.70]">
                                    1
                                </div>
                                <DiagonalSlashIcon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" color="#21527D" />
                                <div className="font-avenir font-normal text-[14px] sm:text-[16px] leading-[100%] text-[#000000]">
                                    8
                                </div>
                                <RightArrowIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            </div>

                            {/* Right-side controls if needed */}
                            <div className="flex items-center gap-2 sm:gap-3">
                                {/* Add additional controls here if needed */}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Extracted */}
                    <div className="lg:w-1/2 flex flex-col gap-4 sm:gap-5 mt-4 sm:mt-6 lg:mt-0">
                        {/* Preview Section */}
                        <div className="w-full h-auto min-h-[350px] sm:min-h-[400px] bg-[#E7EDF2] p-3 sm:p-4 md:p-5 rounded-[15px] sm:rounded-[20px] flex flex-col justify-center items-center">
                            <div className="w-full flex items-center justify-between mb-3 sm:mb-4 relative">
                                {/* Centered Title */}
                                <h2 className="font-avenir font-bold text-[16px] sm:text-[18px] leading-[26px] text-[#21527D] absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
                                    Extracted File
                                </h2>

                                {/* Right-side Button */}
                                <button className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 font-avenir font-normal text-[14px] sm:text-[16px] leading-[26px] text-[#000000] bg-[#FCFBFB] rounded-[8px] sm:rounded-[10px] ml-auto">
                                    <EditIcon className="w-4 h-4 sm:w-5 sm:h-5" color="#000000" />
                                    <span>Edit</span>
                                </button>
                            </div>

                            {/* Main Display Box */}
                            <div className="w-full max-w-[400px] lg:max-w-full xl:max-w-[450px]
                                h-[300px] md:h-[310px]
                                rounded-[25px] bg-[#FDFDFD]
                                shadow-[0px_-2px_4px_0px_#21527D1A]
                                p-4 relative overflow-auto scrollbar-hide">
                                <div 
                                    style={{
                                        fontSize: `${extractedZoom}%`,
                                        lineHeight: '1.6',
                                        transition: 'font-size 0.3s ease'
                                    }}
                                >
                                    <p className="font-avenir text-[#000000]">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum quaerat qui voluptate recusandae omnis repellat facilis, maxime et, temporibus aut delectus. Debitis quas, nostrum quae eveniet ea, dolorum repudiandae suscipit et esse dignissimos omnis maxime reprehenderit tempore at dolores. Excepturi repellat pariatur minima dignissimos nobis velit tenetur saepe similique dolor!
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Control Bar */}
                        <div className="w-full flex flex-wrap sm:flex-nowrap items-center justify-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 bg-[#E7EDF2] rounded-[12px] sm:rounded-[15px]">
                            {/* Left Zoom Controls */}
                            <div className="flex items-center gap-2 sm:gap-3 pr-3 sm:pr-4 border-r border-[#21527D]/20">
                                <button 
                                    onClick={handleExtractedZoomOut}
                                    className="hover:opacity-80 transition-opacity"
                                >
                                    <SearchMinusIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                                </button>
                                <div className="w-[45px] sm:w-[50px] h-[28px] sm:h-[30px] flex items-center justify-center rounded-[6px] sm:rounded-[8px] bg-[#FFFFFF] text-[#21527D] font-avenir font-black text-[12px] sm:text-[14px] leading-[100%] opacity-[0.70]">
                                    {extractedZoom}%
                                </div>
                                <button 
                                    onClick={handleExtractedZoomIn}
                                    className="hover:opacity-80 transition-opacity"
                                >
                                    <SearchAddIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                                </button>
                            </div>

                            {/* Pagination Section */}
                            <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 border-r border-[#21527D]/20">
                                <LeftPaginationArrowIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                                <div className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] flex items-center justify-center rounded-[6px] sm:rounded-[8px] bg-[#FFFFFF] text-[#21527D] font-avenir font-black text-[12px] sm:text-[14px] leading-[100%] opacity-[0.70]">
                                    1
                                </div>
                                <DiagonalSlashIcon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" color="#21527D" />
                                <div className="font-avenir font-normal text-[14px] sm:text-[16px] leading-[100%] text-[#000000]">
                                    8
                                </div>
                                <RightArrowIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Navigation */}
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-4 sm:mt-6 md:mt-8 justify-between px-0 md:px-10 xl:px-30">
                    {/* Previous Button */}
                    <button className="order-2 sm:order-1 font-avenir font-bold lg:font-black text-[14px] sm:text-[16px] leading-[100%] text-[#21527D] bg-[#E7EDF2] shadow-[0px_1px_4px_0px_#00000040] w-full sm:w-auto min-w-[120px] sm:min-w-[200px] lg:min-w-[240px] lg:min-w-[260px] h-[45px] sm:h-[50px] md:h-[55px] rounded-[12px] sm:rounded-[15px] flex items-center justify-center hover:opacity-90 transition-opacity">
                        Previous
                    </button>

                    {/* Pagination Center */}
                    <div className='order-1 sm:order-2 flex flex-col lg:flex-row items-center gap-3 lg:gap-5'>
                        <h2 className='font-avenir font-semibold text-[18px] sm:text-[20px] lg:text-[24px] leading-[100%] text-[#21527D] opacity-[0.72] text-center sm:text-left'>
                            Select a File
                        </h2>
                        <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4">
                            <div className='w-[30px] lg:w-[50px] h-[30px] lg:h-[50px] bg-[#21527D] flex justify-center items-center rounded-[100%]'>
                                <LeftPaginationArrowIcon width={10} height={10} color='#FDFDFD' />
                            </div>
                            <div className="w-[22px] h-[22px] lg:w-[25px] lg:h-[25px] flex items-center justify-center rounded-[6px] sm:rounded-[8px] bg-[#DEE8F2] font-avenir font-semibold text-[16px] sm:text-[18px] md:text-[20px] leading-[100%] text-[#000000] opacity-[0.72]">
                                1
                            </div>
                            <DiagonalSlashIcon color="#21527D" />
                            <div className="font-avenir font-bold text-[16px] sm:text-[18px] lg:text-[20px] leading-[100%] text-[#000000]">
                                20
                            </div>
                            <div className='w-[30px] lg:w-[50px] h-[30px] lg:h-[50px] bg-[#21527D] flex justify-center items-center rounded-[100%]'>
                                <RightArrowIcon width={20} height={20} color='#FDFDFD' />
                            </div>
                        </div>
                    </div>

                    {/* Export Button */}
                    <button
                        onClick={() => setShowExportPopup(true)}
                        className="order-3 font-avenir font-bold lg:font-black text-[14px] sm:text-[16px] leading-[100%] text-[#FDFDFD] bg-[#21527D] shadow-[0px_1px_4px_0px_#00000040] w-full sm:w-auto min-w-[120px] sm:min-w-[200px] lg:min-w-[220px] lg:min-w-[240px] h-[45px] sm:h-[50px] md:h-[55px] rounded-[12px] sm:rounded-[15px] flex items-center justify-center hover:opacity-90 transition-opacity">
                        Export
                    </button>

                    {showExportPopup && (
                        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
                            <ExportSuccessfulPopup closePopup={() => setShowExportPopup(false)} />
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default OriginalExtractPage;