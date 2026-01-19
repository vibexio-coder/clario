import React from "react";
import Navbar from "../landingpages/Navbar";
import Footer from "../landingpages/Footer";

const ApiIntegration = () => {
  return (
    <div>
      <Navbar />
      <div className="w-full px-4 sm:px-6 lg:px-30 xl:px-50 py-5 lg:py-10">
        <h1 className="font-['Kollektif'] font-bold text-[20px] sm:text-[22px] lg:text-[24px] leading-[100%] tracking-[0.02em] text-[#21527D] mb-3 sm:mb-4">
          API & Integrations
        </h1>

        <p className="font-['Avenir_LT_Std'] font-[350] text-[14px] sm:text-[15px] lg:text-[16px] leading-[26px] sm:leading-[28px] lg:leading-[30px] tracking-[0.06em] text-black mb-4">
          Clario is designed as an API-first platform, recognizing that modern
          enterprises operate within complex ecosystems rather than isolated
          tools. The API layer exposes the full power of Clario’s document
          intelligence capabilities, allowing developers and system integrators
          to embed OCR, handwriting extraction, and data structuring directly
          into existing applications and workflows. The APIs are built with
          simplicity and robustness in mind. Clear request-response structures,
          predictable behavior, and comprehensive error handling ensure that
          integrations are reliable and easy to maintain. Whether integrating
          with web applications, mobile apps, backend services, or enterprise
          platforms, Clario’s APIs provide consistent performance and
          scalability.
        </p>

        <p className="font-['Avenir_LT_Std'] font-[350] text-[14px] sm:text-[15px] lg:text-[16px] leading-[26px] sm:leading-[28px] lg:leading-[30px] tracking-[0.06em] text-black mb-4">
          Beyond raw APIs, Clario supports integration with common enterprise
          systems such as ERPs, CRMs, document management platforms, and
          workflow automation tools. This enables organizations to deploy Clario
          without rearchitecting their technology stack. Data flows seamlessly
          from document ingestion points into operational systems, reducing
          latency and manual handoffs. Security and access control are integral
          to the integration layer. APIs support authentication, authorization,
          and usage monitoring to ensure that data access is controlled and
          auditable. Organizations can define usage limits, monitor performance,
          and manage integrations centrally, providing both flexibility and
          governance.
        </p>

        <p className="font-['Avenir_LT_Std'] font-[350] text-[14px] sm:text-[15px] lg:text-[16px] leading-[26px] sm:leading-[28px] lg:leading-[30px] tracking-[0.06em] text-black mb-4">
          The integration philosophy is pragmatic. Clario does not force a
          single deployment model or workflow structure. Instead, it adapts to
          how organizations already operate, accelerating time to value while
          minimizing disruption. This makes it an ideal choice for teams that
          want to modernize document processing incrementally rather than
          through risky, all-or-nothing transformations.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default ApiIntegration;
