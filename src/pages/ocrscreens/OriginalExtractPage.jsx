import React, { useEffect, useState } from 'react';
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

    // State for files - NOW LOADING ONLY FROM uploadPageFiles
    const [originalFiles, setOriginalFiles] = useState([]);
    const [currentFileIndex, setCurrentFileIndex] = useState(0);
    const [originalZoom, setOriginalZoom] = useState(100);
    const [rotation, setRotation] = useState(0);
    const [fastapiResponse, setFastapiResponse] = useState(null);
    const [extractedText, setExtractedText] = useState('');
    const [exportData, setExportData] = useState(null);

    // State for extracted section
    const [extractedZoom, setExtractedZoom] = useState(100);

    // Helper function to convert base64 back to File
    const base64ToFile = (base64Data, filename, mimeType) => {
        const arr = base64Data.split(',');
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mimeType });
    };

    // Load files from uploadPageFiles (SINGLE SOURCE OF TRUTH)
    useEffect(() => {
        const loadFilesFromUploadPageStorage = () => {
            // ✅ Load ONLY from uploadPageFiles (this is the sync source)
            const uploadPageFiles = localStorage.getItem('uploadPageFiles');

            if (uploadPageFiles) {
                try {
                    const parsedFiles = JSON.parse(uploadPageFiles);

                    // Convert base64 to File objects
                    const filesWithObjects = parsedFiles.map(fileData => {
                        const file = base64ToFile(fileData.base64, fileData.name, fileData.type);

                        return {
                            id: fileData.id,
                            name: fileData.name,
                            file: file,
                            type: fileData.type,
                            pageCount: fileData.pageCount || 1,
                            isImage: fileData.type.startsWith('image/'),
                            isPDF: fileData.type === 'application/pdf'
                        };
                    });

                    setOriginalFiles(filesWithObjects);

                    // If there are no files in uploadPageFiles but there are in originalExtractFiles,
                    // clear originalExtractFiles to maintain sync
                    if (parsedFiles.length === 0) {
                        localStorage.removeItem('originalExtractFiles');
                    }

                } catch (error) {
                    console.error('Error loading uploadPage files:', error);
                }
            } else {
                // If uploadPageFiles doesn't exist, check originalExtractFiles (for backward compatibility)
                const originalExtractFiles = localStorage.getItem('originalExtractFiles');
                if (originalExtractFiles) {
                    try {
                        const parsedFiles = JSON.parse(originalExtractFiles);

                        const filesWithObjects = parsedFiles.map(fileData => {
                            const file = base64ToFile(fileData.base64, fileData.name, fileData.type);

                            return {
                                id: fileData.id,
                                name: fileData.name,
                                file: file,
                                type: fileData.type,
                                pageCount: fileData.pageCount || 1,
                                isImage: fileData.type.startsWith('image/'),
                                isPDF: fileData.type === 'application/pdf'
                            };
                        });

                        setOriginalFiles(filesWithObjects);
                    } catch (error) {
                        console.error('Error loading originalExtract files:', error);
                    }
                }
            }
        };

        loadFilesFromUploadPageStorage();

        // ✅ Listen for storage changes from UploadPage
        const handleStorageChange = (e) => {
            if (e.key === 'uploadPageFiles' || e.key === 'originalExtractFiles') {
                loadFilesFromUploadPageStorage();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // Get current file
    const currentFile = originalFiles[currentFileIndex];

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

    // Rotate function (anti-clockwise)
    const handleRotate = () => {
        setRotation(prev => {
            const newRotation = prev - 90;
            return newRotation < -360 ? newRotation + 360 : newRotation;
        });
    };

    // Handle file navigation
    const handlePreviousFile = () => {
        if (currentFileIndex > 0) {
            setCurrentFileIndex(prev => prev - 1);
            setRotation(0);
            setOriginalZoom(100);
        }
    };

    const handleNextFile = () => {
        if (currentFileIndex < originalFiles.length - 1) {
            setCurrentFileIndex(prev => prev + 1);
            setRotation(0);
            setOriginalZoom(100);
        }
    };

    // Render preview content based on file type
    const renderPreviewContent = () => {
        if (!currentFile) {
            return (
                <div className="flex items-center justify-center h-full text-gray-500 italic">
                    No files uploaded yet.
                </div>
            );
        }

        if (currentFile.isImage) {
            // For images, show the image preview
            const imageUrl = URL.createObjectURL(currentFile.file);
            return (
                <div className="h-full w-full flex items-center justify-center overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={currentFile.name}
                        className="max-h-full max-w-full object-contain transition-transform duration-300"
                        style={{
                            transform: `rotate(${rotation}deg) scale(${originalZoom / 100})`,
                            transformOrigin: 'center center'
                        }}
                    />
                </div>
            );
        } else if (currentFile.isPDF) {
            // For PDFs, show text content
            return (
                <div className="h-full w-full flex flex-col">
                    <div
                        className="flex-1 overflow-auto scrollbar-hide"
                        style={{
                            transform: `rotate(${rotation}deg)`,
                            transformOrigin: 'center center',
                            transition: 'transform 0.3s ease'
                        }}
                    >
                        <div
                            style={{
                                fontSize: `${originalZoom}%`,
                                lineHeight: '1.5',
                                padding: '10px',
                                transition: 'font-size 0.3s ease'
                            }}
                            className='scrollbar-hide overflow-auto h-full'
                        >
                            <div className="text-gray-800">
                                <p className="mb-3">PDF Document: {currentFile.name}</p>
                                <p className="mb-3">This is the original content from the uploaded PDF file.</p>
                                <p className="mb-3">Page 1 of {currentFile.pageCount || 1}</p>
                                <p className="mb-3">File {currentFileIndex + 1} of {originalFiles.length}</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="h-full w-full flex items-center justify-center">
                <div className="text-gray-500">
                    <p>File: {currentFile.name}</p>
                    <p>Type: {currentFile.type}</p>
                </div>
            </div>
        );
    };

    // Get file icon based on file extension
    const getFileIcon = () => {
        if (!currentFile?.name) return null;

        const fileName = currentFile.name.toLowerCase();
        if (fileName.endsWith('.pdf')) return <PdfIcon width={24} height={24} color="#21527D" />;
        if (fileName.endsWith('.png')) return <PngIcon width={24} height={24} color="#21527D" />;
        if (fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) return <JpgIcon width={24} height={24} color="#21527D" />;
        if (fileName.endsWith('.webp')) return <WebpIcon width={24} height={24} color="#21527D" />;
        if (fileName.endsWith('.svg')) return <SvgIcon width={24} height={24} color="#21527D" />;
        return <PdfIcon width={24} height={24} color="#21527D" />;
    };

    useEffect(() => {
        if (showExportPopup || open) {
            const scrollY = window.scrollY;
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = "0";
            document.body.style.right = "0";
            document.body.style.width = "100%";
            document.body.style.overflow = "hidden";
        } else {
            const scrollY = document.body.style.top;
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
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.left = "";
            document.body.style.right = "";
            document.body.style.width = "";
            document.body.style.overflow = "";
        };
    }, [showExportPopup, open]);

    // Add this useEffect to load FastAPI response
    useEffect(() => {
        // Load FastAPI response from localStorage
        const savedResponse = localStorage.getItem('fastapiResponse');
        if (savedResponse) {
            try {
                const parsedResponse = JSON.parse(savedResponse);
                setFastapiResponse(parsedResponse);

                // Extract text based on OCR type
                if (parsedResponse.ocrType === 'invoice') {
                    // For invoice OCR, format the structured data
                    const results = parsedResponse.response.results || [];
                    const formattedText = results.map((result, index) => {
                        if (result.status === 'success') {
                            return `File: ${result.filename}\nData: ${JSON.stringify(result.data, null, 2)}\n`;
                        } else {
                            return `File: ${result.filename}\nError: ${result.error}\n`;
                        }
                    }).join('\n');
                    setExtractedText(formattedText);

                    // Store export data for invoices (Excel)
                    setExportData({
                        type: 'excel',
                        data: parsedResponse.response.excel_file,
                        filename: parsedResponse.response.excel_filename || 'extractions.xlsx'
                    });
                } else {
                    // For document OCR (raw_ocr)
                    const results = parsedResponse.response.results || [];
                    const formattedText = results.map((result, index) => {
                        if (result.status === 'success') {
                            return `File: ${result.filename}\n\n${result.extracted_text || 'No text extracted'}\n`;
                        } else {
                            return `File: ${result.filename}\nError: ${result.error}\n`;
                        }
                    }).join('\n---\n');
                    setExtractedText(formattedText);

                    // Store export data for documents (Word/PDF)
                    if (results.length > 0 && results[0].status === 'success') {
                        setExportData({
                            type: 'document',
                            wordBase64: results[0].word_file_base64,
                            pdfBase64: results[0].pdf_file_base64,
                            wordFilename: results[0].word_filename || 'document.docx',
                            pdfFilename: results[0].pdf_filename || 'document.pdf'
                        });
                    }
                }
            } catch (error) {
                console.error('Error parsing FastAPI response:', error);
                setExtractedText('Error loading extracted data');
            }
        }
    }, []);

    // Add export/download functions
    const handleExport = () => {
        if (!exportData) {
            alert('No data to export. Please process files first.');
            return;
        }

        if (exportData.type === 'excel') {
            // Export Excel file
            downloadBase64File(exportData.data, exportData.filename, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        } else {
            // For document OCR, show options for Word or PDF
            const exportFormat = window.confirm('Export as Word document? Click OK for Word, Cancel for PDF');
            if (exportFormat) {
                downloadBase64File(exportData.wordBase64, exportData.wordFilename, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            } else {
                downloadBase64File(exportData.pdfBase64, exportData.pdfFilename, 'application/pdf');
            }
        }

        // Show export successful popup
        setShowExportPopup(true);
    };

    // Helper function to download base64 files
    const downloadBase64File = (base64Data, filename, mimeType) => {
        const link = document.createElement('a');
        link.href = `data:${mimeType};base64,${base64Data}`;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

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
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 xl:gap-20 px-0 md:px-10 xl:px-30">
                    {/* Left Column - Original */}
                    <div className="lg:w-1/2 flex flex-col gap-4 sm:gap-5 mt-4 sm:mt-6 lg:mt-0">
                        {/* Preview Section */}
                        <div className="w-full h-auto min-h-[350px] sm:min-h-[400px] bg-[#E7EDF2] p-3 sm:p-4 md:p-5 rounded-[15px] sm:rounded-[20px] flex flex-col justify-center items-center">
                            {/* Title and File Info */}
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

                                {/* File Preview Content */}
                                {renderPreviewContent()}
                            </div>
                        </div>

                        {/* Control Bar */}
                        <div className="w-full flex flex-wrap sm:flex-nowrap items-center justify-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 bg-[#E7EDF2] rounded-[12px] sm:rounded-[15px]">
                            {/* Left Zoom Controls */}
                            <div className="flex items-center gap-2 sm:gap-3 pr-3 sm:pr-4 border-r border-[#21527D]/20">
                                <button
                                    onClick={handleOriginalZoomOut}
                                    className={`hover:opacity-80 transition-opacity ${originalZoom <= 20 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'} ${!currentFile ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={!currentFile}
                                >
                                    <SearchMinusIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                                </button>

                                <div className="w-[45px] sm:w-[50px] h-[28px] sm:h-[30px] flex items-center justify-center rounded-[6px] sm:rounded-[8px] bg-[#FFFFFF] text-[#21527D] font-avenir font-black text-[12px] sm:text-[14px] leading-[100%] opacity-[0.70]">
                                    {originalZoom}%
                                </div>

                                <button
                                    onClick={handleOriginalZoomIn}
                                    className={`hover:opacity-80 transition-opacity ${originalZoom >= 200 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'} ${!currentFile ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={!currentFile}
                                >
                                    <SearchAddIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                                </button>
                            </div>

                            {/* Pagination Section */}
                            <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 border-r border-[#21527D]/20">
                                <button
                                    onClick={handlePreviousFile}
                                    disabled={currentFileIndex === 0 || originalFiles.length === 0}
                                    className={currentFileIndex === 0 || originalFiles.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}
                                >
                                    <LeftPaginationArrowIcon color="#000000" />
                                </button>
                                <div className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] flex items-center justify-center rounded-[6px] sm:rounded-[8px] bg-[#FFFFFF] text-[#21527D] font-avenir font-black text-[12px] sm:text-[14px] leading-[100%] opacity-[0.70]">
                                    {originalFiles.length > 0 ? currentFileIndex + 1 : 1}
                                </div>
                                <DiagonalSlashIcon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" color="#21527D" />
                                <div className="font-avenir font-normal text-[14px] sm:text-[16px] leading-[100%] text-[#000000]">
                                    {originalFiles.length || 1}
                                </div>
                                <button
                                    onClick={handleNextFile}
                                    disabled={currentFileIndex >= originalFiles.length - 1 || originalFiles.length === 0}
                                    className={currentFileIndex >= originalFiles.length - 1 || originalFiles.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}
                                >
                                    <RightArrowIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                            </div>

                            {/* Rotate Button */}
                            <div className="flex items-center gap-2 sm:gap-3 pl-3 sm:pl-4">
                                <button
                                    onClick={handleRotate}
                                    className={`hover:opacity-80 ${!currentFile ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={!currentFile}
                                >
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Extracted */}
                    <div className="lg:w-1/2 flex flex-col gap-4 sm:gap-5 mt-4 sm:mt-6 lg:mt-0">
                        {/* Preview Section */}
                        <div className="w-full h-auto min-h-[350px] sm:min-h-[400px] bg-[#E7EDF2] p-3 sm:p-4 md:p-5 rounded-[15px] sm:rounded-[20px] flex flex-col justify-center items-center">
                            <div className="w-full flex items-center justify-between mb-3 sm:mb-4 relative">
                                <h2 className="font-avenir font-bold text-[16px] sm:text-[18px] leading-[26px] text-[#21527D] absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
                                    Extracted File
                                </h2>
                                <button className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 font-avenir font-normal text-[14px] sm:text-[16px] leading-[26px] text-[#000000] bg-[#FCFBFB] rounded-[8px] sm:rounded-[10px] ml-auto">
                                    <EditIcon className="w-4 h-4 sm:w-5 sm:h-5" color="#000000" />
                                    <span>Edit</span>
                                </button>
                            </div>

                            <div className="w-full max-w-[400px] lg:max-w-full xl:max-w-[450px]
    h-[300px] md:h-[310px]
    rounded-[25px] bg-[#FDFDFD]
    shadow-[0px_-2px_4px_0px_#21527D1A]
    p-4 relative overflow-auto scrollbar-hide">
                                <div
                                    style={{
                                        fontSize: `${extractedZoom}%`,
                                        lineHeight: '1.6',
                                        transition: 'font-size 0.3s ease',
                                        whiteSpace: 'pre-wrap',
                                        fontFamily: 'Avenir, sans-serif'
                                    }}
                                    className="text-gray-800"
                                >
                                    {fastapiResponse ? (
                                        extractedText || 'No extracted text available'
                                    ) : (
                                        <div className="text-center text-gray-500 italic h-full flex items-center justify-center">
                                            <div>
                                                <p>No extracted data available yet.</p>
                                                <p className="text-sm mt-2">Please process files in Upload Page first.</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Control Bar */}
                        <div className="w-full flex flex-wrap sm:flex-nowrap items-center justify-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 bg-[#E7EDF2] rounded-[12px] sm:rounded-[15px]">
                            <div className="flex items-center gap-2 sm:gap-3 pr-3 sm:pr-4 border-r border-[#21527D]/20">
                                <button
                                    onClick={handleExtractedZoomOut}
                                    className={`hover:opacity-80 transition-opacity ${extractedZoom <= 20 ? 'invisible' : 'visible'}`}
                                >
                                    <SearchMinusIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                                </button>

                                <div className="w-[45px] sm:w-[50px] h-[28px] sm:h-[30px] flex items-center justify-center rounded-[6px] sm:rounded-[8px] bg-[#FFFFFF] text-[#21527D] font-avenir font-black text-[12px] sm:text-[14px] leading-[100%] opacity-[0.70]">
                                    {extractedZoom}%
                                </div>

                                <button
                                    onClick={handleExtractedZoomIn}
                                    className={`hover:opacity-80 transition-opacity ${extractedZoom >= 200 ? 'invisible' : 'visible'}`}
                                >
                                    <SearchAddIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                                </button>
                            </div>
                            <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 border-r border-[#21527D]/20">
                                <LeftPaginationArrowIcon color="#000000" />
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
                                {originalFiles.length > 0 ? currentFileIndex + 1 : 1}
                            </div>
                            <DiagonalSlashIcon color="#21527D" />
                            <div className="font-avenir font-bold text-[16px] sm:text-[18px] lg:text-[20px] leading-[100%] text-[#000000]">
                                {originalFiles.length || 20}
                            </div>
                            <div className='w-[30px] lg:w-[50px] h-[30px] lg:h-[50px] bg-[#21527D] flex justify-center items-center rounded-[100%]'>
                                <RightArrowIcon width={20} height={20} color='#FDFDFD' />
                            </div>
                        </div>
                    </div>

                    {/* Export Button */}
                    <button
                        onClick={() => {
                            if (fastapiResponse && exportData) {
                                handleExport();
                            } else {
                                alert('Please wait for files to be processed and extracted data to load.');
                            }
                        }}
                        disabled={!fastapiResponse || !exportData}
                        className={`order-3 font-avenir font-bold lg:font-black text-[14px] sm:text-[16px] leading-[100%] text-[#FDFDFD] bg-[#21527D] shadow-[0px_1px_4px_0px_#00000040] w-full sm:w-auto min-w-[120px] sm:min-w-[200px] lg:min-w-[220px] lg:min-w-[240px] h-[45px] sm:h-[50px] md:h-[55px] rounded-[12px] sm:rounded-[15px] flex items-center justify-center hover:opacity-90 transition-opacity ${!fastapiResponse || !exportData ? 'opacity-50 cursor-not-allowed' : ''}`}>
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