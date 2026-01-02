import React, { useState, useRef } from "react";
import CloseIcon from "../../assets/icons/loginpages/CloseIcon";
import { useNavigate } from "react-router-dom";

const InvoiceDoc = ({ onClose }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const activeCard = hoveredCard ?? 2;

  const fileInputRef = useRef(null);
  const [selectedOCRType, setSelectedOCRType] = useState(null);
  const navigate = useNavigate();

  const openFileUpload = (ocrType) => {
    setSelectedOCRType(ocrType);
    fileInputRef.current?.click();
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

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files || files.length === 0) return;

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/svg+xml",
    ];

    const validFiles = files.filter(file => allowedTypes.includes(file.type));
    
    if (validFiles.length === 0) {
      alert("Only PDF and image files (jpeg, jpg, png, webp, svg) are allowed");
      e.target.value = "";
      return;
    }

    try {
      // Convert files to base64 and store them
      const filesWithBase64 = await Promise.all(
        validFiles.map(async (file) => {
          const base64 = await fileToBase64(file);
          return {
            id: Date.now() + Math.random(),
            name: file.name,
            type: file.type,
            base64: base64,
            size: file.size,
            lastModified: file.lastModified,
            pageCount: file.type === 'application/pdf' ? Math.floor(Math.random() * 20) + 1 : 1
          };
        })
      );

      // Store OCR type and files for UploadPage
      localStorage.setItem('currentOCRType', selectedOCRType);
      localStorage.setItem('invoiceDocFiles', JSON.stringify(filesWithBase64));
      
      // ✅ ALSO SAVE FOR ORIGINALEXTRACTPAGE
      localStorage.setItem('originalExtractFiles', JSON.stringify(filesWithBase64));
      
      // Reset file input
      e.target.value = "";

      // Close the popup
      onClose();
      
      // Navigate to UploadPage
      navigate('/uploadpage');
      
    } catch (error) {
      console.error("Error processing files:", error);
      alert("Error processing files. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 px-4">
      <div className="w-full max-w-[700px] bg-white rounded-[30px] shadow-[0px_4px_20px_0px_#00000040] p-6 sm:p-8 md:p-10 relative">

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.jpeg,.jpg,.png,.webp,.svg"
          className="hidden"
          onChange={handleFileChange}
          multiple
        />

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-avenir font-semibold text-[20px] sm:text-[24px] text-[#121212]">
            Choose a format
          </h2>
          <button onClick={onClose} className="cursor-pointer">
            <CloseIcon />
          </button>
        </div>

        {/* Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Card 1 - Invoice OCR */}
          <div
            onMouseEnter={() => setHoveredCard(1)}
            onClick={() => openFileUpload('invoice')}
            className={`
              ${activeCard === 1 ? "bg-[#21527D]" : "bg-[#EDF2F8]"}
              shadow-[inset_0px_0px_4px_0px_#80628E7A]
              rounded-[12px] p-6 text-center flex flex-col gap-3
              transition-all duration-200 cursor-pointer
            `}
          >
            <h3 className={`font-avenir font-bold text-[16px] ${activeCard === 1 ? "text-white" : "text-[#21527D]"}`}>
              Invoice OCR
            </h3>

            <p className={`font-avenir font-semibold px-8 text-[12px] ${activeCard === 1 ? "text-white" : "text-[#121212]"}`}>
              Extract structured invoice data with high accuracy.
            </p>

            <p className={`font-avenir font-semibold text-[10px] ${activeCard === 1 ? "text-white" : "text-[#121212]"}`}>
              Auto detect fields and export to Excel
            </p>

            <div className="mt-3">
              <p className={`font-avenir font-bold text-[10px] ${activeCard === 1 ? "text-white" : "text-[#121212]"}`}>
                Input formats
              </p>
              <p className={`font-avenir italic text-[10px] ${activeCard === 1 ? "text-white" : "text-[#21527D]"}`}>
                PDF · Image
              </p>
            </div>
          </div>

          {/* Card 2 - Document OCR */}
          <div
            onMouseEnter={() => setHoveredCard(2)}
            onClick={() => openFileUpload('document')}
            className={`
              ${activeCard === 2 ? "bg-[#21527D]" : "bg-[#EDF2F8]"}
              shadow-[inset_0px_0px_4px_0px_#80628E7A]
              rounded-[12px] p-6 text-center flex flex-col gap-3
              transition-all duration-200 cursor-pointer
            `}
          >
            <h3 className={`font-avenir font-bold text-[16px] ${activeCard === 2 ? "text-white" : "text-[#21527D]"}`}>
              Document OCR
            </h3>

            <p className={`font-avenir font-semibold px-8 text-[12px] ${activeCard === 2 ? "text-white" : "text-[#121212]"}`}>
              Convert documents into clean, searchable text.
            </p>

            <p className={`font-avenir font-semibold text-[10px] ${activeCard === 2 ? "text-white" : "text-[#121212]"}`}>
              Works with printed and handwritten content.
            </p>

            <div className="mt-3">
              <p className={`font-avenir font-bold text-[10px] ${activeCard === 2 ? "text-white" : "text-[#121212]"}`}>
                Input formats
              </p>
              <p className={`font-avenir italic text-[10px] ${activeCard === 2 ? "text-white" : "text-[#21527D]"}`}>
                PDF · Image
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDoc;