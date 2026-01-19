import React from "react";
import Navbar from "../landingpages/Navbar";
import Footer from "../landingpages/Footer";

const Customai = () => {
  return (
    <div>
      <Navbar />
      <div className="w-full px-4 sm:px-6 lg:px-30 xl:px-50 py-5 lg:py-10">
        <h1 className="font-['Kollektif'] font-bold text-[20px] sm:text-[22px] lg:text-[24px] leading-[100%] tracking-[0.02em] text-[#21527D] mb-3 sm:mb-4">
          Custom AI Workflows
        </h1>

        <p className="font-['Avenir_LT_Std'] font-[350] text-[14px] sm:text-[15px] lg:text-[16px] leading-[26px] sm:leading-[28px] lg:leading-[30px] tracking-[0.06em] text-black mb-4">
          Every organization has unique document workflows that cannot be fully
          addressed by off-the-shelf solutions. Clario supports the creation of
          custom AI workflows tailored to specific business needs, document
          types, and operational goals.
        </p>

        <p className="font-['Avenir_LT_Std'] font-[350] text-[14px] sm:text-[15px] lg:text-[16px] leading-[26px] sm:leading-[28px] lg:leading-[30px] tracking-[0.06em] text-black mb-4">
          These workflows combine OCR, handwriting extraction, validation rules,
          and system integrations into cohesive pipelines. This allows
          organizations to automate complex processes while retaining control
          and transparency.
        </p>

        <p className="font-['Avenir_LT_Std'] font-[350] text-[14px] sm:text-[15px] lg:text-[16px] leading-[26px] sm:leading-[28px] lg:leading-[30px] tracking-[0.06em] text-black mb-4">
          By enabling customization without excessive engineering overhead,
          Clario empowers teams to innovate rapidly and respond to evolving
          requirements. This makes it not just a tool, but a platform for
          continuous process improvement and digital transformation.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Customai;
