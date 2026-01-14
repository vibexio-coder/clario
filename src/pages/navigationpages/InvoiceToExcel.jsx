import React from "react";
import Navbar from "../landingpages/Navbar";

const InvoiceToExcel = () => {
  return (
    <div>
      <Navbar />
      <div className="w-full px-4 sm:px-6 lg:px-8 py-5 lg:py-10">
        <h1 className="font-['Kollektif'] font-bold text-[20px] sm:text-[22px] lg:text-[24px] leading-[100%] tracking-[0.02em] text-[#21527D] mb-3 sm:mb-4">
          Invoice → Excel
        </h1>

        <p className="font-['Avenir_LT_Std'] font-[350] text-[14px] sm:text-[15px] lg:text-[16px] leading-[26px] sm:leading-[28px] lg:leading-[30px] tracking-[0.06em] text-black mb-4">
          Clario’s Invoice to Excel capability is built to eliminate the
          friction between document ingestion and financial operations. Invoices
          are among the most common yet structurally inconsistent business
          documents, varying widely by vendor, geography, language, and
          formatting standards. Clario addresses this variability by focusing on
          intelligent data extraction rather than rigid template matching.
        </p>

        <p className="font-['Avenir_LT_Std'] font-[350] text-[14px] sm:text-[15px] lg:text-[16px] leading-[26px] sm:leading-[28px] lg:leading-[30px] tracking-[0.06em] text-black mb-4">
          The system automatically identifies key invoice components such as
          vendor details, invoice numbers, dates, line items, tax breakdowns,
          totals, and payment terms. It understands relationships between
          fields, ensuring that extracted values are logically consistent and
          contextually accurate. This reduces common errors such as misaligned
          totals, duplicated line items, or incorrect tax calculations that
          plague traditional OCR solutions.
        </p>

        <p className="font-['Avenir_LT_Std'] font-[350] text-[14px] sm:text-[15px] lg:text-[16px] leading-[26px] sm:leading-[28px] lg:leading-[30px] tracking-[0.06em] text-black mb-4">
          Once extracted, the data is structured directly into Excel-ready
          formats that align with accounting and finance workflows. Line items
          are preserved with their hierarchical relationships, allowing for
          immediate analysis, reconciliation, or upload into ERP systems. The
          output is not a flat text dump but a clean, organized dataset that
          finance teams can trust and act upon without extensive
          post-processing.
        </p>

        <p className="font-['Avenir_LT_Std'] font-[350] text-[14px] sm:text-[15px] lg:text-[16px] leading-[26px] sm:leading-[28px] lg:leading-[30px] tracking-[0.06em] text-black mb-4">
          Clario’s Invoice to Excel capability is designed for both operational
          efficiency and audit readiness. Each extracted field can be traced
          back to its source location in the original document, providing
          transparency and confidence during reviews or compliance checks. This
          traceability is particularly valuable in regulated environments where
          financial data accuracy is non-negotiable.
        </p>

        <p className="font-['Avenir_LT_Std'] font-[350] text-[14px] sm:text-[15px] lg:text-[16px] leading-[26px] sm:leading-[28px] lg:leading-[30px] tracking-[0.06em] text-black">
          The system supports high-volume processing, making it suitable for
          organizations handling thousands of invoices daily. It integrates
          seamlessly with accounting platforms, approval workflows, and data
          warehouses, enabling end-to-end automation from invoice receipt to
          financial reporting. By reducing manual intervention, organizations
          not only save time and cost but also significantly improve data
          quality and decision speed.
        </p>
      </div>
    </div>
  );
};

export default InvoiceToExcel;
