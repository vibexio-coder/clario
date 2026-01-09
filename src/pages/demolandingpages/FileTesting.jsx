import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
 
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
 
//  Correct worker setup for Vite
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
 
const FileTesting = () => {
  const [files, setFiles] = useState([]);
 
  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
      pages: null,
    }));
    setFiles(selected);
  };
 
  const onDocumentLoadSuccess = ({ numPages }, index) => {
    setFiles((prev) =>
      prev.map((f, idx) =>
        idx === index ? { ...f, pages: numPages } : f
      )
    );
  };
 
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* LEFT */}
      <div style={{ width: "30%", padding: 20 }}>
        <input
          type="file"
          multiple
          accept="application/pdf,image/*"
          onChange={handleFileChange}
        />
        <p style={{ fontSize: "12px", color: "#666", marginTop: "10px" }}>
          Supported: PDF files and images
        </p>
      </div>
 
      {/* RIGHT */}
      <div style={{ width: "70%", overflowY: "auto", padding: 20 }}>
        {files.length === 0 ? (
          <div style={{ textAlign: "center", padding: "50px", color: "#666" }}>
            <h3>No files selected</h3>
            <p>Select PDF or image files to preview them here</p>
          </div>
        ) : (
          files.map((item, i) => {
            // 📄 PDF
            if (item.file.type === "application/pdf") {
              return (
                <div
                  key={i}
                  style={{
                    marginBottom: 30,
                    border: "1px solid #ddd",
                    padding: 15,
                  }}
                >
                  <h3>{item.file.name}</h3>
                  <Document
                    file={item.url}
                    onLoadSuccess={(data) =>
                      onDocumentLoadSuccess(data, i)
                    }
                    loading={<div>Loading PDF...</div>}
                    error={<div style={{ color: "red" }}>Error loading PDF</div>}
                  >
                    {item.pages &&
                      Array.from({ length: item.pages }, (_, index) => (
                        <div key={index} style={{ marginBottom: 10 }}>
                          <Page pageNumber={index + 1} width={600} />
                        </div>
                      ))}
                  </Document>
                </div>
              );
            }
 
            // 🖼 IMAGE
            if (item.file.type.startsWith("image/")) {
              return (
                <div
                  key={i}
                  style={{
                    marginBottom: 20,
                    border: "1px solid #ddd",
                    padding: 15,
                  }}
                >
                  <h3>{item.file.name}</h3>
                  <img
                    src={item.url}
                    alt={item.file.name}
                    style={{ maxWidth: "100%", maxHeight: 600 }}
                  />
                </div>
              );
            }
 
            return null;
          })
        )}
      </div>
    </div>
  );
};
 
export default FileTesting;