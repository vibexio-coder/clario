import React from "react";
import Navbar from "../landingpages/Navbar";

const HandwrittenText = () => {
  return (
    <div>
      <Navbar />
      <div className="w-full px-4 sm:px-6 lg:px-12 py-5 lg:py-10">
        <h1 className="font-['Kollektif'] font-bold text-[20px] sm:text-[22px] lg:text-[24px] leading-[100%] tracking-[0.02em] text-[#21527D] mb-3 sm:mb-4">
          Handwritten Text Extraction
        </h1>

        <p className="font-['Avenir_LT_Std'] font-[350] text-[14px] sm:text-[15px] lg:text-[16px] leading-[26px] sm:leading-[28px] lg:leading-[30px] tracking-[0.06em] text-black mb-4">
          Handwritten text remains one of the most complex challenges in
          document digitization, primarily due to variations in writing styles,
          ink quality, spacing, and alignment. Clario’s Handwritten Text
          Extraction capability is engineered specifically to address these
          challenges at scale. Rather than relying on simplistic pattern
          matching, the system uses deep learning models trained on diverse
          handwriting datasets to interpret characters, words, and contextual
          meaning with high confidence. The extraction process begins by
          identifying handwritten regions within a document, separating them
          from printed text, stamps, signatures, and background elements. This
          segmentation step is critical, as it ensures that handwriting is
          processed using models optimized for free-form input rather than
          structured typography. Once isolated, the handwriting is analyzed in
          context, allowing the system to infer meaning even when characters are
          partially formed or inconsistently spaced. Clario’s approach
          prioritizes practical usability over academic perfection. The goal is
          not merely to recognize handwriting but to convert it into structured
          data that aligns with business workflows. Whether it is handwritten
          addresses, form entries, medical notes, or approval remarks, the
          extracted content is normalized and formatted for downstream
          consumption. This dramatically reduces the need for manual
          verification and data entry, which are traditionally the biggest cost
          drivers in handwriting-heavy processes.
        </p>

        <p className="font-['Avenir_LT_Std'] font-[350] text-[14px] sm:text-[15px] lg:text-[16px] leading-[26px] sm:leading-[28px] lg:leading-[30px] tracking-[0.06em] text-black mb-4">
          Over time, the system improves through exposure to
          organization-specific handwriting patterns. This is particularly
          valuable in environments such as healthcare, logistics, and government
          offices, where the same individuals or teams generate large volumes of
          handwritten content. By learning these patterns, Clario increases
          accuracy and consistency without requiring constant human
          intervention.
        </p>

        <p className="font-['Avenir_LT_Std'] font-[350] text-[14px] sm:text-[15px] lg:text-[16px] leading-[26px] sm:leading-[28px] lg:leading-[30px] tracking-[0.06em] text-black mb-4">
          The handwritten extraction capability is designed to integrate
          seamlessly with existing OCR and workflow pipelines. It does not
          operate as a standalone tool but as an extension of the broader
          document intelligence framework. This ensures that handwritten data is
          treated with the same rigor, traceability, and auditability as printed
          text, enabling organizations to fully digitize processes that were
          previously considered too complex or unreliable to automate.
        </p>
      </div>
    </div>
  );
};

export default HandwrittenText;
