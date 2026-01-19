import React from "react";
import Navbar from "../landingpages/Navbar";
import Footer from "../landingpages/Footer";

const Pricing = () => {
  return (
    <div>
      <Navbar />
      <div className="w-full px-4 sm:px-6 lg:px-30 xl:px-50 py-5 lg:py-10">
        <h1 className="font-['Kollektif'] font-bold text-[20px] sm:text-[22px] lg:text-[24px] leading-[100%] tracking-[0.02em] text-[#21527D] mb-3 sm:mb-4">
          Pricing
        </h1>

        <p className="font-['Avenir_LT_Std'] font-[350] text-[14px] sm:text-[15px] lg:text-[16px] leading-[26px] sm:leading-[28px] lg:leading-[30px] tracking-[0.06em] text-black mb-4">
          Clario’s pricing model is designed to align with real business value
          rather than artificial usage constraints. Instead of forcing customers
          into rigid tiers that do not reflect operational reality, pricing is
          structured to scale with document volume, feature usage, and
          deployment complexity. This ensures that organizations pay for what
          they actually use while retaining the flexibility to grow. The
          platform supports both usage-based and subscription-based pricing,
          depending on customer needs. High-volume enterprises benefit from
          predictable costs and volume discounts, while smaller teams or
          experimental deployments can start with lower commitments and scale
          organically. This flexibility lowers the barrier to entry while
          supporting long-term partnerships.
        </p>

        <p className="font-['Avenir_LT_Std'] font-[350] text-[14px] sm:text-[15px] lg:text-[16px] leading-[26px] sm:leading-[28px] lg:leading-[30px] tracking-[0.06em] text-black mb-4">
          Pricing also reflects the depth of capability being delivered.
          Advanced features such as handwritten extraction, invoice structuring,
          and custom workflows are priced transparently, allowing customers to
          understand exactly where value is being generated. There are no hidden
          costs for basic integrations, security, or compliance features, which
          are considered core to the platform. From a procurement and finance
          perspective, Clario’s pricing is designed to be easy to justify
          internally. Clear metrics, predictable billing, and measurable ROI
          make it straightforward to build business cases and secure stakeholder
          buy-in. This is particularly important for enterprise and government
          customers operating under strict budgetary oversight.
        </p>

        <p className="font-['Avenir_LT_Std'] font-[350] text-[14px] sm:text-[15px] lg:text-[16px] leading-[26px] sm:leading-[28px] lg:leading-[30px] tracking-[0.06em] text-black mb-4">
          Ultimately, Clario’s pricing strategy is about partnership rather than
          transaction. The goal is to support customers as they mature in their
          document intelligence journey, providing cost structures that
          encourage adoption, expansion, and long-term value creation rather
          than short-term optimization.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;
