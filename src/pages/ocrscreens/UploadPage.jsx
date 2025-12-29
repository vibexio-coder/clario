import React, { useEffect, useState, useRef } from 'react';
import TrashIcon from '../../assets/icons/accountpage/TrashIcon';
import EyeIcon from '../../assets/icons/loginpages/EyeIcon';
import RightArrowIcon from '../../assets/icons/uploadpage/RightArrowIcon';
import SearchAddIcon from '../../assets/icons/uploadpage/SearchAddIcon';
import SearchMinusIcon from '../../assets/icons/uploadpage/SearchMinusIcon';
import TextIcon from '../../assets/icons/uploadpage/TextIcon';
import RefreshRotateIcon from '../../assets/icons/uploadpage/RefreshRotateIcon';
import DiagonalSlashIcon from '../../assets/icons/uploadpage/DiagonalSlashIcon';
import PdfIcon from '../../assets/icons/uploadpage/PdfIcon';
import LeftPaginationArrowIcon from '../../assets/icons/uploadpage/LeftPaginationArrowIcon';
import PngIcon from '../../assets/icons/uploadpage/PngIcon';
import WebpIcon from '../../assets/icons/uploadpage/WebpIcon';
import SvgIcon from '../../assets/icons/uploadpage/SvgIcon';
import JpgIcon from '../../assets/icons/uploadpage/JpgIcon';
import JpegIcon from '../../assets/icons/uploadpage/JpegIcon';
import ChooseAFormatPopup from '../ocrpopups/ChooseAFormatPopup';
import ExtractingFilesPopup from '../ocrpopups/ExtractingFilesPopup';
import Footer from '../landingpages/Footer';
import Navbar from '../landingpages/Navbar';
import PlusIcon from '../../assets/icons/uploadpage/PlusIcon';

const UploadPage = () => {
    const [open, setOpen] = useState(false);
    const [showChooseFormatPopup, setShowChooseFormatPopup] = useState(false);
    const [showExtractingPopup, setShowExtractingPopup] = useState(false);

    // New state variables for the features
    const [zoomLevel, setZoomLevel] = useState(100); // Default zoom 100%
    const [isCropping, setIsCropping] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [isTextDeleted, setIsTextDeleted] = useState(false);
    const [cropArea, setCropArea] = useState({ x: 100, y: 100, width: 200, height: 150 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [cropResizeMode, setCropResizeMode] = useState(null);
    const previewRef = useRef(null);
    const textContainerRef = useRef(null);

    // Zoom functions - only affect text size
    const handleZoomIn = () => {
        if (zoomLevel < 200) {
            setZoomLevel(prev => Math.min(prev + 10, 200));
        }
    };

    const handleZoomOut = () => {
        if (zoomLevel > 20) {
            setZoomLevel(prev => Math.max(prev - 10, 20));
        }
    };

    // Rotate function (anti-clockwise) - smooth rotation
    const handleRotate = () => {
        setRotation(prev => {
            const newRotation = prev - 90;
            return newRotation < -360 ? newRotation + 360 : newRotation;
        });
    };

    // Delete function (soft delete)
    const handleDelete = () => {
        setIsTextDeleted(true);
    };

    // Crop functions - simplified
    const handleCropStart = () => {
        setIsCropping(!isCropping); // Toggle crop mode
        if (!isCropping) {
            // Set initial crop area to cover most of the content
            setCropArea({ x: 50, y: 50, width: 300, height: 200 });
        }
    };

    const handleCropApply = () => {
        setIsCropping(false);
        // Crop logic would go here
        console.log("Crop area selected:", cropArea);
    };

    // Mouse event handlers for crop area
    const handleMouseDown = (e, mode) => {
        if (!isCropping) return;
        e.stopPropagation();
        setIsDragging(true);
        setCropResizeMode(mode);
        const rect = previewRef.current?.getBoundingClientRect();
        if (rect) {
            setDragStart({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }
    };

    const handleMouseMove = (e) => {
        if (!isDragging || !previewRef.current || !isCropping) return;

        const rect = previewRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const deltaX = x - dragStart.x;
        const deltaY = y - dragStart.y;

        setCropArea(prev => {
            const newArea = { ...prev };
            
            if (cropResizeMode === 'move') {
                newArea.x = Math.max(0, Math.min(rect.width - newArea.width, prev.x + deltaX));
                newArea.y = Math.max(0, Math.min(rect.height - newArea.height, prev.y + deltaY));
            } 
            else if (cropResizeMode === 'nw') {
                newArea.width = Math.max(50, prev.width - deltaX);
                newArea.height = Math.max(50, prev.height - deltaY);
                newArea.x = Math.max(0, prev.x + deltaX);
                newArea.y = Math.max(0, prev.y + deltaY);
            }
            else if (cropResizeMode === 'ne') {
                newArea.width = Math.max(50, prev.width + deltaX);
                newArea.height = Math.max(50, prev.height - deltaY);
                newArea.y = Math.max(0, prev.y + deltaY);
            }
            else if (cropResizeMode === 'sw') {
                newArea.width = Math.max(50, prev.width - deltaX);
                newArea.height = Math.max(50, prev.height + deltaY);
                newArea.x = Math.max(0, prev.x + deltaX);
            }
            else if (cropResizeMode === 'se') {
                newArea.width = Math.max(50, prev.width + deltaX);
                newArea.height = Math.max(50, prev.height + deltaY);
            }

            setDragStart({ x, y });
            return newArea;
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setCropResizeMode(null);
    };

    // Add event listeners for mouse movements
    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging, cropResizeMode, dragStart]);

    useEffect(() => {
        console.log('Popup states:', {
            chooseFormat: showChooseFormatPopup,
            extracting: showExtractingPopup
        });

        if (showChooseFormatPopup || showExtractingPopup) {
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
    }, [showChooseFormatPopup, showExtractingPopup]);


    const fileList = [
        { id: 1, name: "File.pdf", Icon: PdfIcon },
        { id: 2, name: "File.jpeg", Icon: JpegIcon },
        { id: 3, name: "File.png", Icon: PngIcon },
        { id: 4, name: "File.webp", Icon: WebpIcon },
        { id: 5, name: "File.jpg", Icon: JpgIcon },
        { id: 6, name: "File.svg", Icon: SvgIcon },
    ];

    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        console.log('showPopup changed:', showPopup);

        if (showPopup) {
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
    }, [showPopup]);

    // Original text content
    const originalText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit soluta provident doloremque, sit ad eius dolorum omnis? Ducimus dolore mollitia repellendus laboriosam ut doloribus, nulla temporibus placeat illo ratione adipisci maxime fugit beatae, illum eaque eveniet fuga. Cum ullam ratione debitis eum architecto. Quod porro animi dolore rem, optio numquam.";

    return (
        <div>
            <Navbar />
            <div className="bg-white p-0 md:p-10 relative h-full lg:h-[620px]">
                {/* Main Content Container */}
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 xl:gap-20 px-0 xl:px-20">
                    {/* Left Column */}
                    <div className="lg:w-1/2 flex flex-col gap-6 md:gap-8">

                        <div className="bg-[#FDFDFD] rounded-[20px] shadow-[0px_3px_6.9px_2px_#6C5E5E26]
                p-5 h-[550px] flex flex-col overflow-hidden">

                            {/* Add Files Button */}
                            <div className="flex justify-center mb-4">
                                <button
                                    type="button"
                                    className="w-[280px] h-[55px] bg-[#21527D] rounded-[10px]
                 flex items-center justify-center gap-2
                 font-avenir font-bold text-[20px] leading-[100%]
                 text-[#FDFDFD]
                 hover:opacity-90 transition-opacity"
                                >
                                    <PlusIcon width={20} height={20} />
                                    <span>Add Files</span>
                                </button>
                            </div>

                            {/* File List (Scroll Only Here) */}
                            <div className="flex-1 overflow-y-auto pr-2 custom-scroll">
                                <div className="flex flex-col gap-4">
                                    {fileList.map(({ id, name, Icon }) => (
                                        <div
                                            key={id}
                                            className="bg-[#C5D4E2]/70 rounded-[20px]
                     flex items-center gap-4
                     px-4 py-3 md:px-5 md:py-4"
                                        >
                                            <Icon width={40} height={40} color="#21527D" opacity={1} />

                                            {/* File Info */}
                                            <div className="flex-1">
                                                <h2 className="font-avenir font-bold text-[12px] text-black">
                                                    {name}
                                                </h2>

                                                {/* Progress */}
                                                <div className="w-full max-w-[200px] h-[3px] bg-white rounded-[10px] mt-2">
                                                    <div
                                                        className="h-full bg-[#21527D] rounded-[10px]"
                                                        style={{ width: "60%" }}
                                                    />
                                                </div>

                                                <p className="font-avenir text-[10px] text-black mt-1">
                                                    Not able to upload
                                                </p>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-3">
                                                <TrashIcon width={20} height={20} color="#21527D" />
                                                <EyeIcon width={20} height={20} color="#21527D" opacity={1} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-5 mt-6 lg:mt-0 px-2 md:px-0">
                        {/* Preview Section */}
                        <div className="w-full h-auto bg-[#E7EDF2] p-4 md:p-5 rounded-[20px] flex flex-col justify-center items-center">
                            {/* Title and Pagination */}
                            <div className='w-full flex items-center justify-center mb-4 gap-5'>
                                <h2 className="font-avenir font-normal text-[16px] text-[#21527D]">
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
                            <div 
                                ref={previewRef}
                                className="relative w-full h-[400px] lg:h-[310px] rounded-[25px] bg-[#FDFDFD] shadow-[0px_-2px_4px_0px_#21527D1A] p-4 overflow-hidden scrollbar-hide"
                            >
                                {/* Display deleted message or content */}
                                {isTextDeleted ? (
                                    <div className="flex items-center justify-center h-full text-gray-400 italic">
                                        Text has been temporarily deleted
                                    </div>
                                ) : (
                                    <div 
                                        ref={textContainerRef}
                                        className="h-full w-full overflow-auto"
                                        style={{
                                            transform: `rotate(${rotation}deg)`,
                                            transformOrigin: 'center center',
                                            transition: 'transform 0.3s ease'
                                        }}
                                    >
                                        <div 
                                            style={{
                                                fontSize: `${zoomLevel}%`,
                                                lineHeight: '1.5',
                                                padding: '10px',
                                                transition: 'font-size 0.3s ease '
                                            }}
                                            className='scrollbar-hide overflow-auto h-full'
                                        >
                                            {originalText}
                                        </div>
                                    </div>
                                )}

                                {/* Crop Overlay - simplified */}
                                {isCropping && !isTextDeleted && (
                                    <div 
                                        className="absolute border-2 border-blue-500 border-dashed z-20 cursor-move"
                                        style={{
                                            left: `${cropArea.x}px`,
                                            top: `${cropArea.y}px`,
                                            width: `${cropArea.width}px`,
                                            height: `${cropArea.height}px`
                                        }}
                                        onMouseDown={(e) => handleMouseDown(e, 'move')}
                                    >
                                        {/* Resize handles */}
                                        <div 
                                            className="absolute w-3 h-3 bg-blue-500 -left-1.5 -top-1.5 cursor-nw-resize"
                                            onMouseDown={(e) => handleMouseDown(e, 'nw')}
                                        />
                                        <div 
                                            className="absolute w-3 h-3 bg-blue-500 -right-1.5 -top-1.5 cursor-ne-resize"
                                            onMouseDown={(e) => handleMouseDown(e, 'ne')}
                                        />
                                        <div 
                                            className="absolute w-3 h-3 bg-blue-500 -left-1.5 -bottom-1.5 cursor-sw-resize"
                                            onMouseDown={(e) => handleMouseDown(e, 'sw')}
                                        />
                                        <div 
                                            className="absolute w-3 h-3 bg-blue-500 -right-1.5 -bottom-1.5 cursor-se-resize"
                                            onMouseDown={(e) => handleMouseDown(e, 'se')}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Control Bar */}
                        <div className="gap-y-3 flex flex-wrap md:flex-nowrap items-center justify-center w-full px-4 py-3 bg-[#E7EDF2] rounded-[15px] md:gap-3">
                            {/* Left Zoom Controls */}
                            <div className="flex items-center gap-2 sm:gap-3 pr-4 border-r border-[#21527D]/20">
                                <button onClick={handleZoomOut} className="hover:opacity-80">
                                    <SearchMinusIcon />
                                </button>
                                <div className="w-[70px] h-[30px] flex items-center justify-center rounded-[8px] bg-[#FFFFFF] text-[#21527D] font-avenir font-black text-[14px] leading-[100%] opacity-[0.70]">
                                    {zoomLevel}%
                                </div>
                                <button onClick={handleZoomIn} className="hover:opacity-80">
                                    <SearchAddIcon />
                                </button>
                            </div>

                            {/* Pagination Section */}
                            <div className="flex items-center gap-1 xm:gap-2 px-4 border-r border-[#21527D]/20">
                                <LeftPaginationArrowIcon color="#21527D" />
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
                            <div className="flex items-center gap-10 pl-4">
                                <button 
                                    onClick={handleCropStart} 
                                    className="hover:opacity-80"
                                    style={{ opacity: isCropping ? 1 : 0.7 }}
                                >
                                    <TextIcon width={24} height={24} color="#000000" />
                                </button>
                                <button onClick={handleRotate} className="hover:opacity-80">
                                    <RefreshRotateIcon />
                                </button>
                                <button onClick={handleDelete} className="hover:opacity-80">
                                    <TrashIcon width={24} height={24} color="#000000" />
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 justify-center">
                            <button
                                onClick={() => setShowChooseFormatPopup(true)}
                                className="font-avenir font-semibold lg:font-bold text-[16px] leading-[100%] text-[#21527D] bg-[#E7EDF2] shadow-[0px_1px_4px_0px_#00000040] w-full sm:w-[260px] h-[55px] rounded-[15px] flex items-center justify-center cursor-pointer"
                            >
                                Extract This File
                            </button>
                            <button
                                onClick={() => setShowChooseFormatPopup(true)}
                                className="font-avenir font-semibold lg:font-bold text-[16px] leading-[100%] text-[#FDFDFD] bg-[#21527D] shadow-[0px_1px_4px_0px_#00000040] w-full sm:w-[250px] h-[55px] rounded-[15px] flex items-center justify-center cursor-pointer"
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

                {/* Overlay */}
                {open && (
                    <div
                        className="fixed inset-0 bg-black/40 z-40"
                        onClick={() => setOpen(false)}
                    ></div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default UploadPage;