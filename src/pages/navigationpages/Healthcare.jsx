import React from "react";
import Navbar from "../landingpages/Navbar";

const Healthcare = () => {
  return (
    <div>
      <Navbar />
      <div className="w-full px-4 sm:px-6 lg:px-12 py-5 lg:py-10">
        <h1 className="font-['Kollektif'] font-bold text-[20px] sm:text-[22px] lg:text-[24px] leading-[100%] tracking-[0.02em] text-[#21527D] mb-3 sm:mb-4">
          Healthcare Records
        </h1>

        <p className="font-['Avenir_LT_Std'] font-[350] text-[14px] sm:text-[15px] lg:text-[16px] leading-[26px] sm:leading-[28px] lg:leading-[30px] tracking-[0.06em] text-black mb-4">
          Healthcare organizations manage sensitive, high-volume records that
          require precision, privacy, and compliance. Clario enables the
          digitization of medical records, prescriptions, lab reports, and
          handwritten notes while maintaining strict data security and
          regulatory alignment.
        </p>

        <p className="font-['Avenir_LT_Std'] font-[350] text-[14px] sm:text-[15px] lg:text-[16px] leading-[26px] sm:leading-[28px] lg:leading-[30px] tracking-[0.06em] text-black mb-4">
          The platform supports structured data extraction that integrates with
          electronic health record systems, improving accessibility and
          continuity of care. By reducing reliance on manual transcription,
          Clario helps healthcare providers improve efficiency and reduce
          administrative burden.
        </p>

        <p className="font-['Avenir_LT_Std'] font-[350] text-[14px] sm:text-[15px] lg:text-[16px] leading-[26px] sm:leading-[28px] lg:leading-[30px] tracking-[0.06em] text-black mb-4">
          Handwritten clinical notes, a persistent challenge in healthcare, are
          handled with contextual understanding. This ensures that critical
          patient information is accurately captured and preserved, supporting
          better clinical outcomes and operational efficiency.
        </p>
      </div>
    </div>
  );
};

export default Healthcare;
