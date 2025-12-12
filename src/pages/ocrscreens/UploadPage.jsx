import React, { useEffect, useState } from 'react';
import MenuIcon from '../../assets/icons/uploadpage/MenuIcon';
import TrashIcon from '../../assets/icons/accountpage/TrashIcon';
import EyeIcon from '../../assets/icons/loginpages/EyeIcon';
import RightArrowIcon from '../../assets/icons/uploadpage/RightArrowIcon';
import SearchAddIcon from '../../assets/icons/uploadpage/SearchAddIcon';
import SearchMinusIcon from '../../assets/icons/uploadpage/SearchMinusIcon';
import HomeIcon from '../../assets/icons/uploadpage/HomeIcon';
import TextIcon from '../../assets/icons/uploadpage/TextIcon';
import RefreshRotateIcon from '../../assets/icons/uploadpage/RefreshRotateIcon';
import DiagonalSlashIcon from '../../assets/icons/uploadpage/DiagonalSlashIcon';
import PdfIcon from '../../assets/icons/uploadpage/PdfIcon';
import UploadCloudIcon from '../../assets/icons/uploadpage/UploadCloudIcon';
import LeftPaginationArrowIcon from '../../assets/icons/uploadpage/LeftPaginationArrowIcon';
import EditIcon from '../../assets/icons/accountpage/EditIcon';
import PngIcon from '../../assets/icons/uploadpage/PngIcon';
import CloseIcon from '../../assets/icons/loginpages/CloseIcon';
import WebpIcon from '../../assets/icons/uploadpage/WebpIcon';
import SvgIcon from '../../assets/icons/uploadpage/SvgIcon';
import JpgIcon from '../../assets/icons/uploadpage/JpgIcon';
import JpegIcon from '../../assets/icons/uploadpage/JpegIcon';
import ChooseAFormatPopup from '../ocrpopups/ChooseAFormatPopup';
import ExtractingFilesPopup from '../ocrpopups/ExtractingFilesPopup';

const UploadPage = () => {
    const [open, setOpen] = useState(false);
    const [showChooseFormatPopup, setShowChooseFormatPopup] = useState(false);
    const [showExtractingPopup, setShowExtractingPopup] = useState(false);

    useEffect(() => {
        document.body.style.overflow = showChooseFormatPopup ? "hidden" : "auto";
    }, [showChooseFormatPopup]);
    return (
        <div className="bg-white p-6 md:p-10 relative">
            {/* Top Navigation */}
            <div className='flex justify-between items-center mb-6 md:mb-8'>
                <div
                    onClick={() => setOpen(true)}
                    className='z-20 w-16 h-16 md:w-[75px] md:h-[75px] bg-[#D6E0EA] rounded-[10px] flex justify-center items-center cursor-pointer'>
                    <MenuIcon />
                </div>
                <div className='w-16 h-16 md:w-[75px] md:h-[75px] bg-[#D6E0EA] rounded-[10px] flex justify-center items-center'>
                    <HomeIcon />
                </div>
            </div>

            {/* Main Content Container */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 xl:gap-20 px-0 md:px-10 xl:px-30">

                {/* Left Column */}
                <div className="lg:w-1/2 flex flex-col gap-6 md:gap-8">
                    {/* Upload Section */}
                    <div className="z-20 flex flex-col items-center gap-4 text-center px-4 bg-[#F4FAFF] rounded-[20px] py-6 md:py-8 border-2 border-dashed border-[#21527D]">
                        <div>
                            <UploadCloudIcon width={70} height={70} className="md:w-[90px] md:h-[90px]" />
                        </div>

                        <p className="font-avenir text-[12px] leading-[21px] text-[#121212] font-normal max-w-[350px]">
                            Convert documents, images, and handwritten text into structured, editable
                            content with exceptional accuracy and speed. Preserve layouts, detect
                            tables, and export seamlessly, all from a single, streamlined platform.
                        </p>

                        <button className="w-full max-w-[280px] h-[54px] font-avenir font-bold text-[20px] leading-[100%] text-[#FDFDFD] bg-[#21527D] rounded-[30px] hover:opacity-90 transition-opacity">
                            Upload
                        </button>
                    </div>

                    {/* Files List Section */}
                    <div className="bg-[#FDFDFD] rounded-[20px] shadow-[0px_3px_6.9px_2px_#6C5E5E26] p-5 flex flex-col gap-4">
                        {/* PDF Row */}
                        <div className="bg-[#C5D4E2]/70 flex items-center rounded-[20px] px-4 py-3 md:px-5 md:py-4 w-full gap-4">
                            <PdfIcon color="#21527D" width={40} height={40} opacity={1} />
                            <div className="flex-1">
                                <h2 className="font-avenir font-bold text-[12px] leading-[100%] text-[#000000]">
                                    File.pdf
                                </h2>
                                <div className="w-full max-w-[200px] h-[3px] bg-[#FFFFFF] rounded-[10px] mt-2 relative">
                                    <div
                                        className="h-full bg-[#21527D] rounded-[10px]"
                                        style={{ width: "60%" }}
                                    ></div>
                                </div>
                                <p className="font-avenir font-normal text-[10px] leading-[100%] text-[#000000] mt-1">
                                    Not able to Upload
                                </p>
                            </div>
                            <div className="flex items-center gap-3 md:gap-4">
                                <TrashIcon color="#21527D" width={20} height={20} />
                                <EyeIcon color="#21527D" width={20} height={20} />
                            </div>
                        </div>

                        {/* CSV Row */}
                        <div className="bg-[#EADBAF]/70 flex items-center rounded-[20px] px-4 py-3 md:px-5 md:py-4 w-full gap-4">
                            <JpegIcon color="#D4A10D" width={40} height={40} opacity={1} />
                            <div className="flex-1">
                                <h2 className="font-avenir font-bold text-[12px] leading-[100%] text-[#000000]">
                                    File.jpeg
                                </h2>
                                <div className="w-full max-w-[200px] h-[3px] bg-[#FFFFFF] rounded-[10px] mt-2 relative">
                                    <div
                                        className="h-full bg-[#D4A10D] rounded-[10px]"
                                        style={{ width: "65%" }}
                                    ></div>
                                </div>
                                <p className="font-avenir font-normal text-[10px] leading-[100%] text-[#000000] mt-1">
                                    65% done
                                </p>
                            </div>
                            <div className="flex items-center gap-3 md:gap-4">
                                <TrashIcon color="#D4A10D" width={20} height={20} />
                                <EyeIcon color="#D4A10D" width={20} height={20} />
                            </div>
                        </div>

                        {/* Excel Row */}
                        <div className="bg-[#DCD2E0]/70 flex items-center rounded-[20px] px-4 py-3 md:px-5 md:py-4 w-full gap-4">
                            <PngIcon color="#80628E" width={40} height={40} opacity={1} />
                            <div className="flex-1">
                                <h2 className="font-avenir font-bold text-[12px] leading-[100%] text-[#000000]">
                                    File.png
                                </h2>
                                <div className="w-full max-w-[200px] h-[3px] bg-[#FFFFFF] rounded-[10px] mt-2 relative">
                                    <div
                                        className="h-full bg-[#80628E] rounded-[10px]"
                                        style={{ width: "100%" }}
                                    ></div>
                                </div>
                                <p className="font-avenir font-normal text-[10px] leading-[100%] text-[#000000] mt-1">
                                    Completed
                                </p>
                            </div>
                            <div className="flex items-center gap-3 md:gap-4">
                                <TrashIcon color="#80628E" width={20} height={20} />
                                <EyeIcon color="#80628E" width={20} height={20} />
                            </div>
                        </div>
                        <div className="bg-[#DCD2E0]/70 flex items-center rounded-[20px] px-4 py-3 md:px-5 md:py-4 w-full gap-4">
                            <WebpIcon color="#80628E" width={40} height={40} opacity={1} />
                            <div className="flex-1">
                                <h2 className="font-avenir font-bold text-[12px] leading-[100%] text-[#000000]">
                                    File.Webp
                                </h2>
                                <div className="w-full max-w-[200px] h-[3px] bg-[#FFFFFF] rounded-[10px] mt-2 relative">
                                    <div
                                        className="h-full bg-[#80628E] rounded-[10px]"
                                        style={{ width: "100%" }}
                                    ></div>
                                </div>
                                <p className="font-avenir font-normal text-[10px] leading-[100%] text-[#000000] mt-1">
                                    Completed
                                </p>
                            </div>
                            <div className="flex items-center gap-3 md:gap-4">
                                <TrashIcon color="#80628E" width={20} height={20} />
                                <EyeIcon color="#80628E" width={20} height={20} />
                            </div>
                        </div>
                        <div className="bg-[#EADBAF]/70 flex items-center rounded-[20px] px-4 py-3 md:px-5 md:py-4 w-full gap-4">
                            <JpgIcon color="#D4A10D" width={40} height={40} opacity={1} />
                            <div className="flex-1">
                                <h2 className="font-avenir font-bold text-[12px] leading-[100%] text-[#000000]">
                                    File.jpg
                                </h2>
                                <div className="w-full max-w-[200px] h-[3px] bg-[#FFFFFF] rounded-[10px] mt-2 relative">
                                    <div
                                        className="h-full bg-[#D4A10D] rounded-[10px]"
                                        style={{ width: "65%" }}
                                    ></div>
                                </div>
                                <p className="font-avenir font-normal text-[10px] leading-[100%] text-[#000000] mt-1">
                                    65% done
                                </p>
                            </div>
                            <div className="flex items-center gap-3 md:gap-4">
                                <TrashIcon color="#80628E" width={20} height={20} />
                                <EyeIcon color="#80628E" width={20} height={20} />
                            </div>
                        </div>
                        <div className="bg-[#C5D4E2]/70 flex items-center rounded-[20px] px-4 py-3 md:px-5 md:py-4 w-full gap-4">
                            <SvgIcon color="#21527D" width={40} height={40} opacity={1} />
                            <div className="flex-1">
                                <h2 className="font-avenir font-bold text-[12px] leading-[100%] text-[#000000]">
                                    File.pdf
                                </h2>
                                <div className="w-full max-w-[200px] h-[3px] bg-[#FFFFFF] rounded-[10px] mt-2 relative">
                                    <div
                                        className="h-full bg-[#21527D] rounded-[10px]"
                                        style={{ width: "60%" }}
                                    ></div>
                                </div>
                                <p className="font-avenir font-normal text-[10px] leading-[100%] text-[#000000] mt-1">
                                    Not able to Upload
                                </p>
                            </div>
                            <div className="flex items-center gap-3 md:gap-4">
                                <TrashIcon color="#21527D" width={20} height={20} />
                                <EyeIcon color="#21527D" width={20} height={20} />
                            </div>
                        </div>
                        {/* View All */}
                        <div className="font-avenir font-semibold text-[14px] leading-[100%] text-[#000000] text-end cursor-pointer hover:text-[#21527D] transition-colors">
                            View All
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="lg:w-1/2 flex flex-col gap-5 mt-6 lg:mt-0">
                    {/* Preview Section */}
                    <div className="w-full h-auto min-h-[400px] bg-[#E7EDF2] p-4 md:p-5 rounded-[20px] flex flex-col justify-center items-center">
                        {/* Title and Pagination */}
                        <div className='w-full flex flex-col items-end pr-4 md:pr-12 mb-4'>
                            <h2 className="font-avenir font-normal text-[16px] text-[#21527D] mb-2">
                                Uploaded Files
                            </h2>
                            <div className="flex items-center gap-2">
                                <LeftPaginationArrowIcon />
                                <div className="w-[22px] h-[22px] flex items-center justify-center rounded-[8px] bg-[#FFFFFF] text-[#21527D] font-avenir font-black text-[14px] leading-[100%] opacity-[0.70]">
                                    1
                                </div>
                                <DiagonalSlashIcon width={18} height={18} color="#21527D" />
                                <div className="font-avenir font-normal text-[16px] leading-[100%] text-[#000000]">
                                    20
                                </div>
                                <RightArrowIcon />
                            </div>
                        </div>

                        {/* Main Display Box */}
                        <div className="w-full max-w-[400px] lg:max-w-full xl:max-w-[450px] h-[300px] md:h-[500px] rounded-[25px] bg-[#FDFDFD] shadow-[0px_-2px_4px_0px_#21527D1A] p-4">
                            {/* This would contain the document preview */}
                        </div>
                    </div>

                    {/* Control Bar */}
                    <div className="gap-y-3 flex flex-wrap md:flex-nowrap items-center justify-center md:justify-between w-full px-4 py-3 bg-[#E7EDF2] rounded-[15px]">
                        {/* Left Zoom Controls */}
                        <div className="flex items-center gap-2 sm:gap-3 pr-4 border-r border-[#21527D]/20">
                            <SearchMinusIcon />
                            <div className="w-[50px] h-[30px] flex items-center justify-center rounded-[8px] bg-[#FFFFFF] text-[#21527D] font-avenir font-black text-[14px] leading-[100%] opacity-[0.70]">
                                90%
                            </div>
                            <SearchAddIcon />
                        </div>

                        {/* Pagination Section */}
                        <div className="flex items-center gap-1 xm:gap-2 px-4 border-r border-[#21527D]/20">
                            <LeftPaginationArrowIcon />
                            <div className="w-[22px] h-[22px] flex items-center justify-center rounded-[8px] bg-[#FFFFFF] text-[#21527D] font-avenir font-black text-[14px] leading-[100%] opacity-[0.70]">
                                1
                            </div>
                            <DiagonalSlashIcon width={18} height={18} color="#21527D" />
                            <div className="font-avenir font-normal text-[16px] leading-[100%] text-[#000000]">
                                8
                            </div>
                            <RightArrowIcon />
                        </div>

                        {/* Right Action Buttons */}
                        <div className="flex items-center gap-3 pl-4">
                            <TextIcon />
                            <RefreshRotateIcon />
                            <TrashIcon width={24} height={24} color="#000000" />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 justify-center">
                        <button
                            onClick={() => setShowChooseFormatPopup(true)}
                            className="font-avenir font-black text-[16px] leading-[100%] text-[#21527D] bg-[#E7EDF2] shadow-[0px_1px_4px_0px_#00000040] w-full sm:w-[260px] h-[55px] rounded-[15px] flex items-center justify-center hover:opacity-90 transition-opacity"
                        >
                            Extract This File
                        </button>
                        <button
                            onClick={() => setShowChooseFormatPopup(true)}
                            className="font-avenir font-black text-[16px] leading-[100%] text-[#FDFDFD] bg-[#21527D] shadow-[0px_1px_4px_0px_#00000040] w-full sm:w-[250px] h-[55px] rounded-[15px] flex items-center justify-center hover:opacity-90 transition-opacity"
                        >
                            Extract All
                        </button>
                    </div>
                </div>
            </div>

            {showChooseFormatPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
                    <ChooseAFormatPopup
                        closePopup={() => setShowChooseFormatPopup(false)}
                        openExtracting={() => {
                            setShowChooseFormatPopup(false);
                            setShowExtractingPopup(true);
                        }}
                    />
                </div>
            )}
            {showExtractingPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
                    <ExtractingFilesPopup closePopup={() => setShowExtractingPopup(false)} />
                </div>
            )}

            {/* Off-canvas Sidebar */}
            <div className={`fixed top-0 left-0 h-full w-[300px] md:w-[350px] bg-[#E2E9F0] z-50 shadow-xl transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}>
                <div className='absolute top-5 right-5 cursor-pointer' onClick={() => setOpen(false)}>
                    <CloseIcon width={24} height={24} color='#000000' />
                </div>
                <div className='pt-20 flex justify-between items-center px-4 py-3 bg-[#D6E0EA] border-b border-[#6E6B6B]/25'>
                    <div className='flex justify-center items-center gap-4'>
                        <WebpIcon width={24} height={24} />
                        <div className='font-avenir font-bold text-[16px] leading-[100%] text-[#000000]'>File.webp</div>
                    </div>
                    <div className='flex justify-center items-center gap-4'>
                        <TrashIcon width={20} height={20} color='#21527D' />
                        <EditIcon width={20} height={20} color='#21527D' />
                    </div>
                </div>
                <div className='flex justify-between items-center px-4 py-3 bg-[#E4EBF2] border-b border-[#6E6B6B]/25'>
                    <div className='flex justify-center items-center gap-4'>
                        <PngIcon width={24} height={24} />
                        <div className='font-avenir font-bold text-[16px] leading-[100%] text-[#000000]'>File.png</div>
                    </div>
                    <div className='flex justify-center items-center gap-4'>
                        <TrashIcon width={20} height={20} color='#21527D' />
                        <EditIcon width={20} height={20} color='#21527D' />
                    </div>
                </div>
                <div className='flex justify-between items-center px-4 py-3 bg-[#D6E0EA] border-b border-[#6E6B6B]/25'>
                    <div className='flex justify-center items-center gap-4'>
                        <JpgIcon width={24} height={24} />
                        <div className='font-avenir font-bold text-[16px] leading-[100%] text-[#000000]'>File.jpg</div>
                    </div>
                    <div className='flex justify-center items-center gap-4'>
                        <TrashIcon width={20} height={20} color='#21527D' />
                        <EditIcon width={20} height={20} color='#21527D' />
                    </div>
                </div>
                <div className='flex justify-between items-center px-4 py-3 bg-[#E4EBF2] border-b border-[#6E6B6B]/25'>
                    <div className='flex justify-center items-center gap-4'>
                        <JpegIcon width={24} height={24} />
                        <div className='font-avenir font-bold text-[16px] leading-[100%] text-[#000000]'>File.Jpeg</div>
                    </div>
                    <div className='flex justify-center items-center gap-4'>
                        <TrashIcon width={20} height={20} color='#21527D' />
                        <EditIcon width={20} height={20} color='#21527D' />
                    </div>
                </div>
                <div className='flex justify-between items-center px-4 py-3 bg-[#D6E0EA] border-b border-[#6E6B6B]/25'>
                    <div className='flex justify-center items-center gap-4'>
                        <SvgIcon width={24} height={24} />
                        <div className='font-avenir font-bold text-[16px] leading-[100%] text-[#000000]'>File.svg</div>
                    </div>
                    <div className='flex justify-center items-center gap-4'>
                        <TrashIcon width={20} height={20} color='#21527D' />
                        <EditIcon width={20} height={20} color='#21527D' />
                    </div>
                </div>
                <div className='flex justify-between items-center px-4 py-3 bg-[#D6E0EA] border-b border-[#6E6B6B]/25'>
                    <div className='flex justify-center items-center gap-4'>
                        <PdfIcon width={24} height={24} opacity={0.7} />
                        <div className='font-avenir font-bold text-[16px] leading-[100%] text-[#000000]'>File.pdf</div>
                    </div>
                    <div className='flex justify-center items-center gap-4'>
                        <TrashIcon width={20} height={20} color='#21527D' />
                        <EditIcon width={20} height={20} color='#21527D' />
                    </div>
                </div>
            </div>

            {/* Overlay */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40"
                    onClick={() => setOpen(false)}
                ></div>
            )}
        </div>
    );
}

export default UploadPage;