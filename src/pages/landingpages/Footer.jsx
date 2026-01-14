import React from "react";
import icon from "../../assets/images/icon.webp";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-[#E7EDF2] px-4 sm:px-6 lg:px-12 py-10 pb-5">
      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_2fr] gap-8 lg:gap-12">
        {/* Left Branding */}
        <div className="flex flex-col items-center lg:items-start gap-4 text-center lg:text-left">
          <img src={icon} alt="Clario" className="w-[120px]" />

          <h2 className="font-avenir font-bold text-[18px] leading-[26px] text-[#21527D]">
            AI-Powered Document Intelligence
          </h2>

          <p className="font-avenir font-normal text-[14px] leading-[26px] text-[#121212] max-w-[420px]">
            Clario is an AI document processing platform by Vibexio, built to
            extract, structure, and automate data from documents at scale.
          </p>

          {/* Pills */}
          <div className="flex flex-wrap gap-3 mt-2 justify-center lg:justify-start">
            {[
              "Handwritten OCR",
              "Invoice Extraction",
              "Enterprise Automation",
            ].map((item, i) => (
              <div
                key={i}
                className="px-4 py-[2px] font-avenir text-[12px] leading-[26px]
                text-[#21527D] bg-[#E7EDF2] border border-[#21527D]
                rounded-[20px]"
              >
                {item}
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            className="mt-4 w-fit px-6 py-2 font-avenir font-bold text-[12px]
            text-white bg-[#21527D] rounded-[20px]"
          >
            Start with 10 pages/day — Free
          </button>
        </div>

        {/* Right Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-10 md:gap-6 lg:gap-8">
          {/* Column 1 - Product */}
          <div className="text-center lg:text-left">
            <h3 className="font-avenir font-bold text-[18px] text-[#21527D] mb-3">
              Product
            </h3>
            <ul className="space-y-1 md:space-y-2">
              {[
                { label: "OCR Engine", to: "/ocrengine" },
                {
                  label: "Handwritten Text Extraction",
                  to: "/handwrittentext",
                },
                { label: "Invoice → Excel", to: "/invoicetoexcel" },
                { label: "API & Integrations", to: "/apiintegration" },
                { label: "Pricing", to: "/pricing" },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.to}
                    className="font-avenir font-semibold text-[14px]
        leading-[32px] text-[#464646] hover:text-[#21527D]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 - Solutions */}
          <div className="text-center lg:text-left">
            <h3 className="font-avenir font-bold text-[18px] text-[#21527D] mb-3">
              Solutions
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Logistics & Shipping", to: "/logistics" },
                { label: "Finance & Accounting", to: "/finance" },
                { label: "Healthcare Records", to: "/healthcare" },
                { label: "Government & Compliance", to: "/government" },
                { label: "Custom AI Workflows", to: "/customai" },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.to}
                    className="font-avenir font-semibold text-[14px]
        leading-[32px] text-[#464646] hover:text-[#21527D]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Company */}
          <div className="text-center lg:text-left">
            <h3 className="font-avenir font-bold text-[18px] text-[#21527D] mb-3">
              Company
            </h3>
            <ul className="space-y-2">
              {[
                { label: "About Vibexio", to: "https://www.vibexio.ai/" },
                { label: "Privacy Policy", to: "/privacypolicy" },
                { label: "Terms of Service", to: "/termsservice" },
              ].map((item, i) => (
                <li key={i}>
                  {item.to.startsWith("http") ? (
                    <a
                      href={item.to}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-avenir font-semibold text-[14px]
          leading-[32px] text-[#464646] hover:text-[#21527D]"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      to={item.to}
                      className="font-avenir font-semibold text-[14px]
          leading-[32px] text-[#464646] hover:text-[#21527D]"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Enterprise (hidden on md, shows on xl) */}
          <div className="text-center lg:text-left">
            <h3 className="font-avenir font-bold text-[18px] text-[#21527D] mb-3">
              Enterprise
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Security & Compliance", to: "/securitycompliance" },
                { label: "SLA & Support", to: "/slasupport" },
                { label: "Custom Deployment", to: "/customdeployment" },
                { label: "Contact Sales", to: "/contactsales" },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.to}
                    className="font-avenir font-semibold text-[14px]
        leading-[32px] text-[#464646] hover:text-[#21527D]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="mt-10 pt-6 border-t border-[#21527D]
        flex flex-col lg:flex-row gap-3 lg:gap-0 justify-between items-center text-center lg:text-left"
      >
        <div className="font-avenir font-semibold text-[14px] text-[#464646]">
          © 2025 <span className="font-bold text-[#21527D]"> Clario.</span> A
          Product of{" "}
          <span className="font-bold text-[#21527D]">Vibexio.ai</span>
        </div>

        <div className="font-avenir font-semibold text-[14px] text-[#464646]">
          SOC-ready · Secure by design · Built for scale
        </div>

        <div className="font-avenir font-semibold text-[14px] text-[#464646]">
          All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
