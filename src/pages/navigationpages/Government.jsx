import React from "react";
import Navbar from "../landingpages/Navbar";
import Footer from "../landingpages/Footer";

const Government = () => {
  return (
    <div>
      <Navbar />
      <div className="w-full px-4 sm:px-6 lg:px-30 xl:px-50 py-5 lg:py-10">
        <h1 className="font-['Kollektif'] font-bold text-[20px] sm:text-[22px] lg:text-[24px] leading-[100%] tracking-[0.02em] text-[#21527D] mb-3 sm:mb-4">
          Government & Compliance
        </h1>

        <p className="font-['Avenir_LT_Std'] font-[350] text-[14px] sm:text-[15px] lg:text-[16px] leading-[26px] sm:leading-[28px] lg:leading-[30px] tracking-[0.06em] text-black mb-4">
          Government and compliance environments demand transparency, accuracy,
          and auditability. Clario supports the digitization of forms,
          applications, records, and archival documents at scale, enabling
          faster service delivery and improved governance.
        </p>

        <p className="font-['Avenir_LT_Std'] font-[350] text-[14px] sm:text-[15px] lg:text-[16px] leading-[26px] sm:leading-[28px] lg:leading-[30px] tracking-[0.06em] text-black mb-4">
          The platform ensures that extracted data is traceable, verifiable, and
          compliant with regulatory requirements. This reduces processing times,
          minimizes errors, and supports accountability across departments and
          agencies.
        </p>

        <p className="font-['Avenir_LT_Std'] font-[350] text-[14px] sm:text-[15px] lg:text-[16px] leading-[26px] sm:leading-[28px] lg:leading-[30px] tracking-[0.06em] text-black mb-4">
          Clario’s flexibility allows it to adapt to diverse document standards
          and legacy systems commonly found in government environments. This
          enables modernization without disrupting existing processes or
          infrastructure.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Government;
