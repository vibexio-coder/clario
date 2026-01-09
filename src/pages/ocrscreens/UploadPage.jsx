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
import { useNavigate } from 'react-router-dom';

const UploadPage = () => {
    const [open, setOpen] = useState(false);
    const [showChooseFormatPopup, setShowChooseFormatPopup] = useState(false);
    const [showExtractingPopup, setShowExtractingPopup] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();

    // New state variables for the features
    const [zoomLevel, setZoomLevel] = useState(100);
    const [isCropping, setIsCropping] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [isTextDeleted, setIsTextDeleted] = useState(false);
    const [cropArea, setCropArea] = useState({ x: 100, y: 100, width: 200, height: 150 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [cropResizeMode, setCropResizeMode] = useState(null);
    const previewRef = useRef(null);
    const textContainerRef = useRef(null);

    // State for uploaded files
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);
    const [uploadProgress, setUploadProgress] = useState({});
    const [uploadStatus, setUploadStatus] = useState({});
    const [totalPages, setTotalPages] = useState(0);
    const [ocrType, setOcrType] = useState(null);

    // Allowed file types
    const ALLOWED_TYPES = [
        'application/pdf',
        'image/png',
        'image/svg+xml',
        'image/webp',
        'image/jpeg',
        'image/jpg'
    ];

    // File extension to icon mapping
    const fileIconMap = {
        'pdf': PdfIcon,
        'png': PngIcon,
        'svg': SvgIcon,
        'webp': WebpIcon,
        'jpg': JpgIcon,
        'jpeg': JpegIcon
    };

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

    // Helper function to convert File to base64
    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    // ✅ CRITICAL FUNCTION: Save current state to sync storage
    const saveToSyncStorage = async (filesArray) => {
        if (filesArray.length === 0) {
            // Clear both storages if no files
            localStorage.removeItem('uploadPageFiles');
            localStorage.removeItem('originalExtractFiles');
            return;
        }

        try {
            // Convert File objects to base64 for storage
            const savePromises = filesArray.map(async (file) => {
                const base64 = await fileToBase64(file.file);
                return {
                    id: file.id,
                    name: file.name,
                    type: file.file.type,
                    base64: base64,
                    size: file.file.size,
                    lastModified: file.file.lastModified,
                    pageCount: file.pageCount || 1
                };
            });

            const filesToSave = await Promise.all(savePromises);

            // ✅ Save to BOTH storage locations with SAME data
            localStorage.setItem('uploadPageFiles', JSON.stringify(filesToSave));
            localStorage.setItem('originalExtractFiles', JSON.stringify(filesToSave));

        } catch (error) {
            console.error('Error saving to sync storage:', error);
        }
    };

    // Load files from localStorage on component mount
    useEffect(() => {
        const loadFilesFromStorage = () => {
            // Check for files from InvoiceDoc.jsx FIRST
            const invoiceDocFiles = localStorage.getItem('invoiceDocFiles');
            const currentOCRType = localStorage.getItem('currentOCRType');

            // Check for existing uploadPageFiles
            const existingUploadPageFiles = localStorage.getItem('uploadPageFiles');

            let filesToLoad = [];

            if (existingUploadPageFiles) {
                // Load existing uploadPageFiles (already in sync with OriginalExtractPage)
                try {
                    const parsedFiles = JSON.parse(existingUploadPageFiles);
                    filesToLoad = [...filesToLoad, ...parsedFiles];
                } catch (error) {
                    console.error('Error loading existing files:', error);
                }
            } else if (invoiceDocFiles) {
                // First time loading from InvoiceDoc
                try {
                    const parsedFiles = JSON.parse(invoiceDocFiles);
                    filesToLoad = [...filesToLoad, ...parsedFiles];

                    // Immediately save to sync storage for OriginalExtractPage
                    localStorage.setItem('uploadPageFiles', JSON.stringify(parsedFiles));
                    localStorage.setItem('originalExtractFiles', JSON.stringify(parsedFiles));

                    // Clean up InvoiceDoc storage
                    localStorage.removeItem('invoiceDocFiles');

                } catch (error) {
                    console.error('Error loading InvoiceDoc files:', error);
                }
            }

            // Process loaded files
            if (filesToLoad.length > 0) {
                const filesWithObjects = filesToLoad.map(fileData => {
                    const file = base64ToFile(fileData.base64, fileData.name, fileData.type);

                    // Get the icon component
                    const fileExtension = fileData.name.split('.').pop().toLowerCase();
                    const IconComponent = fileIconMap[fileExtension] || PdfIcon;

                    return {
                        id: fileData.id || Date.now() + Math.random(),
                        name: fileData.name,
                        file: file,
                        Icon: IconComponent,
                        progress: 100,
                        status: 'uploaded',
                        pageCount: fileData.pageCount || 1
                    };
                });

                // Set files in state
                setUploadedFiles(filesWithObjects);
                setTotalPages(filesWithObjects.reduce((sum, file) => sum + file.pageCount, 0));
            }

            // Get OCR type
            if (currentOCRType) {
                setOcrType(currentOCRType);
                localStorage.removeItem('currentOCRType');
            }
        };

        loadFilesFromStorage();
    }, []);

    // ✅ Save to sync storage whenever uploadedFiles changes
    useEffect(() => {
        saveToSyncStorage(uploadedFiles);
    }, [uploadedFiles]);

    // Handle Add Files button click
    const handleAddFiles = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.multiple = true;
        fileInput.accept = '.pdf,.png,.svg,.webp,.jpg,.jpeg';

        fileInput.onchange = async (e) => {
            const files = Array.from(e.target.files);

            for (const [index, file] of files.entries()) {
                // Check if file type is allowed
                if (!ALLOWED_TYPES.includes(file.type) && !file.name.toLowerCase().match(/\.(pdf|png|svg|webp|jpg|jpeg)$/)) {
                    alert(`File ${file.name} is not a supported type. Please upload PDF, PNG, SVG, WEBP, JPEG, or JPG files only.`);
                    continue;
                }

                // Check for duplicate file
                const isDuplicate = uploadedFiles.some(uploadedFile =>
                    uploadedFile.name === file.name &&
                    uploadedFile.file.size === file.size
                );

                if (isDuplicate) {
                    alert(`File "${file.name}" is already uploaded.`);
                    continue;
                }

                // Generate a unique ID for the file
                const fileId = Date.now() + index;

                // Get file extension for icon
                const fileExtension = file.name.split('.').pop().toLowerCase();
                const IconComponent = fileIconMap[fileExtension] || PdfIcon;

                // Calculate page count based on file type
                let pageCount = 1;

                if (file.type === 'application/pdf') {
                    pageCount = Math.floor(Math.random() * 20) + 1;
                }

                // Add file to uploaded files list
                const newFile = {
                    id: fileId,
                    name: file.name,
                    file: file,
                    Icon: IconComponent,
                    progress: 0,
                    status: 'uploading',
                    pageCount: pageCount
                };

                setUploadedFiles(prev => [...prev, newFile]);
                setTotalPages(prev => prev + pageCount);

                // Start upload simulation
                simulateUpload(fileId);
            }
        };

        fileInput.click();
    };

    // Simulate file upload progress
    const simulateUpload = (fileId) => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 5;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);

                setUploadStatus(prev => ({
                    ...prev,
                    [fileId]: 'Uploaded'
                }));
            }

            setUploadProgress(prev => ({
                ...prev,
                [fileId]: progress
            }));
        }, 200);
    };

    // ✅ Handle file deletion from left side file list
    const handleDeleteFile = (fileId) => {
        const fileToDelete = uploadedFiles.find(file => file.id === fileId);
        if (fileToDelete) {
            // Subtract page count from total
            setTotalPages(prev => prev - (fileToDelete.pageCount || 1));
        }

        // Remove from state
        setUploadedFiles(prev => prev.filter(file => file.id !== fileId));

        // If we're deleting the currently previewed file
        if (uploadedFiles[currentPreviewIndex]?.id === fileId) {
            setCurrentPreviewIndex(prev => {
                if (prev >= uploadedFiles.length - 1 && prev > 0) {
                    return prev - 1;
                }
                return Math.min(prev, uploadedFiles.length - 2);
            });
        }
    };

    // Get current preview file
    const currentPreviewFile = uploadedFiles[currentPreviewIndex];

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

    // ✅ Delete function (right side delete icon)
    const handleDelete = () => {
        setIsTextDeleted(true);

        // If there's a current preview file, delete it
        if (currentPreviewFile) {
            handleDeleteFile(currentPreviewFile.id);
        }
    };

    // Crop functions - simplified
    const handleCropStart = () => {
        setIsCropping(!isCropping);
        if (!isCropping) {
            setCropArea({ x: 50, y: 50, width: 300, height: 200 });
        }
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

    // Handle popup scroll lock/unlock
    useEffect(() => {
        if (showChooseFormatPopup || showExtractingPopup) {
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
    }, [showChooseFormatPopup, showExtractingPopup]);

    // Render preview content based on file type
    const renderPreviewContent = () => {
        if (!currentPreviewFile) {
            return (
                <div className="flex items-center justify-center h-full text-gray-500 italic">
                    No file uploaded yet. Click "Add Files" to upload a file.
                </div>
            );
        }

        const file = currentPreviewFile.file;
        const isImage = file.type.startsWith('image/');
        const isPDF = file.type === 'application/pdf';

        if (isImage) {
            const imageUrl = URL.createObjectURL(file);
            return (
                <div className="h-full w-full flex items-center justify-center overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={file.name}
                        className="max-h-full max-w-full object-contain transition-transform duration-300"
                        style={{
                            transform: `rotate(${rotation}deg) scale(${zoomLevel / 100})`,
                            transformOrigin: 'center center'
                        }}
                    />
                </div>
            );
        } else if (isPDF) {
            return (
                <div className="h-full w-full flex flex-col">
                    <div
                        ref={textContainerRef}
                        className="flex-1 overflow-auto scrollbar-hide"
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
                                transition: 'font-size 0.3s ease'
                            }}
                            className='scrollbar-hide overflow-auto h-full'
                        >
                            <div className="text-gray-800">
                                <p className="mb-3">PDF Document Content (Page 1)</p>
                                <p className="mb-3">This is the extracted text from the uploaded PDF file.</p>
                                <p className="mb-3">The text is displayed here without showing any file names.</p>
                                <p className="mb-3">Actual PDF text extraction would be implemented here.</p>
                                <p className="mb-3">All text content from the PDF appears in this preview area.</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="h-full w-full flex items-center justify-center">
                <div className="text-gray-500">Preview not available for this file type</div>
            </div>
        );
    };

    const callFastAPI = async (filesToProcess) => {
        if (!ocrType || filesToProcess.length === 0) {
            alert('No files to process or OCR type not selected');
            return null;
        }

        setIsProcessing(true);

        try {
            // ✅ USE THE NGROK URL, NOT localhost
            const FASTAPI_URL = "https://3f82dbe259ce.ngrok-free.app";
            const endpoint = ocrType === 'invoice' ? 'invoice' : 'raw_ocr';

            console.log(`Calling FastAPI: ${FASTAPI_URL}/${endpoint}`);

            // Create FormData object
            const formData = new FormData();
            filesToProcess.forEach(file => {
                formData.append('files', file.file);
                console.log(`Adding file: ${file.name}`);
            });

            // Call FastAPI with ngrok URL
            const response = await fetch(`${FASTAPI_URL}/${endpoint}`, {
                method: 'POST',
                body: formData,
                // Add timeout
                signal: AbortSignal.timeout(60000) // 60 seconds timeout
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Response error:', errorText);
                throw new Error(`API Error: ${response.status} - ${errorText}`);
            }

            const apiResponse = await response.json();
            console.log('FastAPI response received:', apiResponse);

            // Store API response for OriginalExtractPage
            localStorage.setItem('fastapiResponse', JSON.stringify({
                response: apiResponse,
                ocrType: ocrType,
                processedFiles: filesToProcess.map(f => ({
                    id: f.id,
                    name: f.name,
                    type: f.file.type
                }))
            }));

            return apiResponse;

        } catch (error) {
            console.error('FastAPI call failed:', error);

            // Check if it's a connection error
            if (error.name === 'AbortError' || error.message.includes('Failed to fetch')) {
                alert(
                    `⚠️ Cannot connect to FastAPI server.\n\n` +
                    `Please check:\n` +
                    `1. The ngrok URL: https://67f02d4dfa1a.ngrok-free.app\n` +
                    `2. Ask your AI developer if server is running\n` +
                    `3. Try again in a few moments`
                );
            } else {
                alert(`Error processing files: ${error.message}`);
            }
            return null;
        } finally {
            setIsProcessing(false);
        }
    };

    const handleExtractAction = async (extractAll = false) => {
        if (uploadedFiles.length === 0) return;

        // Determine which files to process
        const filesToProcess = extractAll
            ? uploadedFiles
            : [uploadedFiles[currentPreviewIndex]];

        // Show extracting popup for BOTH invoice and document
        setShowExtractingPopup(true); // ← ALWAYS show ExtractingFilesPopup

        // Call FastAPI
        const apiResponse = await callFastAPI(filesToProcess);

        if (apiResponse) {
            // Close popups
            setShowChooseFormatPopup(false);
            setShowExtractingPopup(false);

            // Navigate to OriginalExtractPage
            navigate('/originalextractPage');
        } else {
            // Close popups on error
            setShowChooseFormatPopup(false);
            setShowExtractingPopup(false);
        }
    };
    
    const processFilesWithFastAPI = async (filesToProcess) => {
        if (!ocrType || filesToProcess.length === 0) {
            alert('Please select files to process');
            return null;
        }

        setIsProcessing(true);

        try {
            // First, test if FastAPI is reachable
            console.log('Testing FastAPI connection...');

            // Try different URLs
            const possibleUrls = [
                `https://67f02d4dfa1a.ngrok-free.app`,
                `https://3f82dbe259ce.ngrok-free.app`,
                'http://localhost:8010',
                'http://127.0.0.1:8010',
                'http://0.0.0.0:8010'
            ];

            let fastapiUrl = '';
            for (const url of possibleUrls) {
                try {
                    const testResponse = await fetch(`${url}/docs`, { method: 'HEAD' });
                    if (testResponse.ok) {
                        fastapiUrl = url;
                        console.log(`Found FastAPI at: ${url}`);
                        break;
                    }
                } catch (e) {
                    console.log(`Not reachable: ${url}`);
                }
            }

            if (!fastapiUrl) {
                throw new Error('FastAPI server not found. Make sure it\'s running on port 8010.');
            }

            // Determine endpoint based on OCR type
            const endpoint = ocrType === 'invoice' ? 'invoice' : 'raw_ocr';

            console.log(`Calling FastAPI: ${fastapiUrl}/${endpoint}`);

            // Create FormData
            const formData = new FormData();
            filesToProcess.forEach(file => {
                formData.append('files', file.file);
                console.log(`Adding file: ${file.name}, size: ${file.file.size} bytes`);
            });

            // Call FastAPI
            const response = await fetch(`${fastapiUrl}/${endpoint}`, {
                method: 'POST',
                body: formData,
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Response error:', errorText);
                throw new Error(`API Error: ${response.status} - ${errorText}`);
            }

            const apiResponse = await response.json();
            console.log('FastAPI response received:', apiResponse);

            // Store the API response for OriginalExtractPage
            localStorage.setItem('fastapiResponse', JSON.stringify({
                response: apiResponse,
                ocrType: ocrType,
                processedFiles: filesToProcess.map(f => ({
                    id: f.id,
                    name: f.name,
                    type: f.file.type
                }))
            }));

            return apiResponse;

        } catch (error) {
            console.error('FastAPI processing error:', error);

            // More user-friendly error message
            let errorMessage = error.message;
            if (error.message.includes('Failed to fetch') || error.message.includes('ERR_CONNECTION_REFUSED')) {
                errorMessage = 'Cannot connect to FastAPI server. Please make sure:\n1. FastAPI is running on port 8010\n2. Run: python main.py or uvicorn main:app --port 8010\n3. Check firewall/antivirus settings';
            }

            alert(`Error: ${errorMessage}`);
            return null;
        } finally {
            setIsProcessing(false);
        }
    };
    return (
        <div>
            <Navbar />
            <div className="bg-white p-0 md:p-10 relative h-full lg:h-[620px]">
                {/* Main Content Container */}
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 xl:gap-20 px-0 xl:px-20">
                    {/* Left Column */}
                    <div className="lg:w-1/2 flex flex-col gap-6 md:gap-8">
                        <div className="bg-[#FDFDFD] rounded-[20px] shadow-[0px_3px_6.9px_2px_#6C5E5E26] p-5 h-[550px] flex flex-col overflow-hidden">
                            {/* Add Files Button */}
                            <div className="flex justify-center mb-4">
                                <button
                                    type="button"
                                    onClick={handleAddFiles}
                                    className="w-[200px] md:w-[280px] h-[40px] md:h-[55px] bg-[#21527D] rounded-[10px] flex items-center justify-center gap-2 font-avenir font-semibold md:font-bold text-[18px] md:text-[20px] leading-[100%] text-[#FDFDFD] cursor-pointer"
                                >
                                    <PlusIcon width={20} height={20} />
                                    <span>Add Files</span>
                                </button>
                            </div>

                            {/* File List */}
                            <div className="flex-1 overflow-y-auto pr-2 custom-scroll">
                                <div className="flex flex-col gap-4">
                                    {uploadedFiles.length === 0 ? (
                                        <div className="flex items-center justify-center h-full min-h-[200px]">
                                            <p className="font-avenir text-[14px] text-gray-500 italic">
                                                No files uploaded yet. Click "Add Files" to upload.
                                            </p>
                                        </div>
                                    ) : (
                                        uploadedFiles.map((file) => {
                                            const progress = uploadProgress[file.id] || file.progress || 0;
                                            const status = uploadStatus[file.id] || file.status || (progress < 100 ? 'Uploading...' : 'Uploaded');

                                            return (
                                                <div
                                                    key={file.id}
                                                    className="bg-[#C5D4E2]/70 rounded-[20px] flex items-center gap-4 px-4 py-3 md:px-5 md:py-4 cursor-pointer hover:bg-[#C5D4E2]/90 transition-colors"
                                                    onClick={() => setCurrentPreviewIndex(uploadedFiles.findIndex(f => f.id === file.id))}
                                                >
                                                    <file.Icon width={40} height={40} color="#21527D" opacity={1} />
                                                    <div className="flex-1">
                                                        <h2 className="font-avenir font-bold text-[12px] text-black">
                                                            {file.name}
                                                        </h2>
                                                        <div className="w-full max-w-[200px] h-[3px] bg-white rounded-[10px] mt-2">
                                                            <div
                                                                className="h-full bg-[#21527D] rounded-[10px] transition-all duration-200"
                                                                style={{ width: `${progress}%` }}
                                                            />
                                                        </div>
                                                        <p className="font-avenir text-[10px] text-black mt-1">
                                                            {progress < 100 ? `Uploading... ${Math.round(progress)}%` : 'Uploaded'}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDeleteFile(file.id);
                                                            }}
                                                            className="hover:opacity-80"
                                                        >
                                                            <TrashIcon width={20} height={20} color="#21527D" />
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-5 mt-6 lg:mt-0 px-2 md:px-0">
                        {/* Preview Section */}
                        <div className="w-full h-auto bg-[#E7EDF2] p-4 md:p-5 rounded-[20px] flex flex-col justify-center items-center">
                            <div className='w-full flex items-center justify-center mb-4 gap-5'>
                                <h2 className="font-avenir font-normal text-[16px] text-[#21527D]">
                                    Uploaded Files
                                </h2>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setCurrentPreviewIndex(prev => Math.max(0, prev - 1))}
                                        disabled={currentPreviewIndex === 0 || uploadedFiles.length === 0}
                                    >
                                        <LeftPaginationArrowIcon />
                                    </button>
                                    <div className="w-[22px] h-[22px] flex items-center justify-center rounded-[8px] bg-[#FFFFFF] text-[#21527D] font-avenir font-black text-[14px] leading-[100%] opacity-[0.70]">
                                        {uploadedFiles.length > 0 ? currentPreviewIndex + 1 : 0}
                                    </div>
                                    <DiagonalSlashIcon width={18} height={18} color="#21527D" />
                                    <div className="font-avenir font-normal text-[16px] leading-[100%] text-[#000000]">
                                        {uploadedFiles.length > 0 ? uploadedFiles.length : 0}
                                    </div>
                                    <button
                                        onClick={() => setCurrentPreviewIndex(prev => Math.min(uploadedFiles.length - 1, prev + 1))}
                                        disabled={currentPreviewIndex >= uploadedFiles.length - 1 || uploadedFiles.length === 0}
                                    >
                                        <RightArrowIcon />
                                    </button>
                                </div>
                            </div>

                            {/* Main Display Box */}
                            <div
                                ref={previewRef}
                                className="relative w-full h-[400px] lg:h-[310px] rounded-[25px] bg-[#FDFDFD] shadow-[0px_-2px_4px_0px_#21527D1A] p-4 overflow-hidden scrollbar-hide"
                            >
                                {isTextDeleted ? (
                                    <div className="flex items-center justify-center h-full text-gray-400 italic">
                                        Text has been temporarily deleted
                                    </div>
                                ) : (
                                    renderPreviewContent()
                                )}

                                {isCropping && !isTextDeleted && currentPreviewFile && currentPreviewFile.file.type.startsWith('image/') && (
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
                                        <div className="absolute w-3 h-3 bg-blue-500 -left-1.5 -top-1.5 cursor-nw-resize" onMouseDown={(e) => handleMouseDown(e, 'nw')} />
                                        <div className="absolute w-3 h-3 bg-blue-500 -right-1.5 -top-1.5 cursor-ne-resize" onMouseDown={(e) => handleMouseDown(e, 'ne')} />
                                        <div className="absolute w-3 h-3 bg-blue-500 -left-1.5 -bottom-1.5 cursor-sw-resize" onMouseDown={(e) => handleMouseDown(e, 'sw')} />
                                        <div className="absolute w-3 h-3 bg-blue-500 -right-1.5 -bottom-1.5 cursor-se-resize" onMouseDown={(e) => handleMouseDown(e, 'se')} />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Control Bar */}
                        <div className="gap-y-3 flex flex-wrap md:flex-nowrap items-center justify-center w-full px-4 py-3 bg-[#E7EDF2] rounded-[15px] md:gap-3">
                            <div className="flex items-center gap-2 sm:gap-3 pr-4 border-r border-[#21527D]/20">
                                <button
                                    onClick={handleZoomOut}
                                    disabled={!currentPreviewFile}
                                    className={`hover:opacity-80 ${zoomLevel <= 20 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'} ${!currentPreviewFile ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <SearchMinusIcon />
                                </button>
                                <div className="w-[70px] h-[30px] flex items-center justify-center rounded-[8px] bg-[#FFFFFF] text-[#21527D] font-avenir font-black text-[14px] leading-[100%] opacity-[0.70]">
                                    {zoomLevel}%
                                </div>
                                <button
                                    onClick={handleZoomIn}
                                    disabled={!currentPreviewFile}
                                    className={`hover:opacity-80 ${zoomLevel >= 200 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'} ${!currentPreviewFile ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <SearchAddIcon />
                                </button>
                            </div>

                            <div className="flex items-center gap-1 xm:gap-2 px-4 border-r border-[#21527D]/20">
                                <button
                                    onClick={() => setCurrentPreviewIndex(prev => Math.max(0, prev - 1))}
                                    disabled={currentPreviewIndex === 0 || uploadedFiles.length === 0}
                                    className={currentPreviewIndex === 0 || uploadedFiles.length === 0 ? 'opacity-50 cursor-not-allowed' : ' cursor-pointer'}
                                >
                                    <LeftPaginationArrowIcon color="#000000" />
                                </button>
                                <div className="w-[22px] h-[22px] flex items-center justify-center rounded-[8px] bg-[#FFFFFF] text-[#21527D] font-avenir font-black text-[14px] leading-[100%] opacity-[0.70]">
                                    {uploadedFiles.length > 0 ? currentPreviewIndex + 1 : 0}
                                </div>
                                <DiagonalSlashIcon width={18} height={18} color="#21527D" />
                                <div className="font-avenir font-normal text-[16px] leading-[100%] text-[#000000]">
                                    {uploadedFiles.length > 0 ? totalPages : 0}
                                </div>
                                <button
                                    onClick={() => setCurrentPreviewIndex(prev => Math.min(uploadedFiles.length - 1, prev + 1))}
                                    disabled={currentPreviewIndex >= uploadedFiles.length - 1 || uploadedFiles.length === 0}
                                    className={currentPreviewIndex >= uploadedFiles.length - 1 || uploadedFiles.length === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                                >
                                    <RightArrowIcon />
                                </button>
                            </div>

                            <div className="flex items-center gap-10 pl-4">
                                <button
                                    onClick={handleCropStart}
                                    disabled={!currentPreviewFile || !currentPreviewFile.file.type.startsWith('image/')}
                                    className={`hover:opacity-80 ${isCropping ? 'opacity-100' : 'opacity-70'} ${!currentPreviewFile || !currentPreviewFile.file.type.startsWith('image/') ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <TextIcon width={24} height={24} color="#000000" />
                                </button>
                                <button
                                    onClick={handleRotate}
                                    disabled={!currentPreviewFile}
                                    className={`hover:opacity-80 ${!currentPreviewFile ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <RefreshRotateIcon />
                                </button>
                                <button
                                    onClick={handleDelete}
                                    disabled={!currentPreviewFile}
                                    className={`hover:opacity-80 ${!currentPreviewFile ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <TrashIcon width={24} height={24} color="#000000" />
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 justify-center">
                            <button
                                onClick={() => handleExtractAction(false)}
                                disabled={!currentPreviewFile || isProcessing}
                                className={`font-avenir font-semibold lg:font-bold text-[16px] leading-[100%] text-[#21527D] bg-[#E7EDF2] shadow-[0px_1px_4px_0px_#00000040] w-full sm:w-[260px] h-[55px] rounded-[15px] flex items-center justify-center cursor-pointer ${!currentPreviewFile || isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
                            >
                                {isProcessing ? 'Processing...' : 'Extract This File'}
                            </button>
                            <button
                                onClick={() => handleExtractAction(true)}
                                disabled={uploadedFiles.length === 0 || isProcessing}
                                className={`font-avenir font-semibold lg:font-bold text-[16px] leading-[100%] text-[#FDFDFD] bg-[#21527D] shadow-[0px_1px_4px_0px_#00000040] w-full sm:w-[250px] h-[55px] rounded-[15px] flex items-center justify-center cursor-pointer ${uploadedFiles.length === 0 || isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
                            >
                                {isProcessing ? 'Processing All...' : 'Extract All'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Popups */}
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
                        <ExtractingFilesPopup
                            closePopup={() => setShowExtractingPopup(false)}
                            uploadedFiles={uploadedFiles}
                            currentPreviewIndex={currentPreviewIndex}
                        />
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