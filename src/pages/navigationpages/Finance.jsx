import React from "react";
import Navbar from "../landingpages/Navbar";

const Finance = () => {
  return (
    <div>
      <Navbar />
      <div className="w-full px-4 sm:px-6 lg:px-12 py-5 lg:py-10">
        <h1 className="font-['Kollektif'] font-bold text-[20px] sm:text-[22px] lg:text-[24px] leading-[100%] tracking-[0.02em] text-[#21527D] mb-3 sm:mb-4">
          Finance & Accounting
        </h1>

        <p className="font-['Avenir_LT_Std'] font-[350] text-[14px] sm:text-[15px] lg:text-[16px] leading-[26px] sm:leading-[28px] lg:leading-[30px] tracking-[0.06em] text-black mb-4">
          Finance and accounting teams rely on accurate, timely data to manage
          cash flow, ensure compliance, and support strategic decision-making.
          Clario transforms document-heavy financial processes by automating the
          extraction and structuring of data from invoices, receipts,
          statements, and reports.
        </p>

        <p className="font-['Avenir_LT_Std'] font-[350] text-[14px] sm:text-[15px] lg:text-[16px] leading-[26px] sm:leading-[28px] lg:leading-[30px] tracking-[0.06em] text-black mb-4">
          The platform reduces manual data entry, minimizes errors, and
          accelerates processing cycles. By delivering Excel-ready and
          system-integrated outputs, Clario enables finance teams to focus on
          analysis and oversight rather than administrative tasks. This improves
          close times, audit readiness, and overall financial control.
        </p>

        <p className="font-['Avenir_LT_Std'] font-[350] text-[14px] sm:text-[15px] lg:text-[16px] leading-[26px] sm:leading-[28px] lg:leading-[30px] tracking-[0.06em] text-black mb-4">
          Clario’s traceability and validation capabilities provide confidence
          in extracted data. Each value can be verified against source
          documents, supporting internal controls and external audits. This is
          critical in environments where accuracy and accountability are
          paramount.
        </p>
      </div>
    </div>
  );
};

export default Finance;
