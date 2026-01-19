import React from "react";
import Navbar from "../landingpages/Navbar";

const Logistic = () => {
  return (
    <div>
      <Navbar />
      <div className="w-full px-4 sm:px-6 lg:px-12 py-5 lg:py-10">
        <h1 className="font-['Kollektif'] font-bold text-[20px] sm:text-[22px] lg:text-[24px] leading-[100%] tracking-[0.02em] text-[#21527D] mb-3 sm:mb-4">
          Logistics & Shipping
        </h1>

        <p className="font-['Avenir_LT_Std'] font-[350] text-[14px] sm:text-[15px] lg:text-[16px] leading-[26px] sm:leading-[28px] lg:leading-[30px] tracking-[0.06em] text-black mb-4">
          In logistics and shipping, documentation is the backbone of
          operational continuity. From bills of lading and delivery notes to
          customs forms and proof of delivery, organizations handle vast volumes
          of documents under tight time constraints. Clario enables logistics
          providers to digitize and operationalize these documents with speed
          and accuracy, reducing delays and manual overhead.
        </p>

        <p className="font-['Avenir_LT_Std'] font-[350] text-[14px] sm:text-[15px] lg:text-[16px] leading-[26px] sm:leading-[28px] lg:leading-[30px] tracking-[0.06em] text-black mb-4">
          The platform extracts structured data from diverse document formats
          generated across geographies and partners. This data feeds directly
          into tracking systems, warehouse management platforms, and billing
          workflows, ensuring that information flows in real time rather than
          being trapped in paper or PDFs. By automating document handling,
          logistics teams gain visibility and control across the supply chain.
        </p>

        <p className="font-['Avenir_LT_Std'] font-[350] text-[14px] sm:text-[15px] lg:text-[16px] leading-[26px] sm:leading-[28px] lg:leading-[30px] tracking-[0.06em] text-black mb-4">
          Handwritten annotations, signatures, and field updates are common in
          logistics operations. Clario’s ability to interpret these elements
          ensures that critical information is not lost or delayed. This reduces
          disputes, accelerates reconciliation, and improves customer
          satisfaction through faster issue resolution.
        </p>

        <p className="font-['Avenir_LT_Std'] font-[350] text-[14px] sm:text-[15px] lg:text-[16px] leading-[26px] sm:leading-[28px] lg:leading-[30px] tracking-[0.06em] text-black mb-4">
          Clario also supports compliance with trade and customs regulations by
          maintaining accurate, auditable records of all processed documents.
          This is particularly valuable in cross-border operations where
          documentation errors can result in costly delays or penalties. By
          standardizing and validating data at ingestion, Clario helps
          organizations operate with confidence in complex regulatory
          environments.
        </p>
      </div>
    </div>
  );
};

export default Logistic;
