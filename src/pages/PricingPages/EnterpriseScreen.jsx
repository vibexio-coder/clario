import React from "react";

const EnterpriseScreen = () => {
  return (
    <div className="w-full flex justify-center py-10 px-4 md:px-8 lg:px-10">
      <div className="w-full ">

        {/* TITLE */}
        <h1 className="
          font-avenir font-semibold lg:font-bold
          text-[26px] sm:text-[28px] lg:text-[36px]
          leading-9
          text-[#121212] text-left">
          Flexible Plans for Every Business Need
        </h1>

        <p className="
          font-avenir font-normal italic
          text-[16px] sm:text-[18px] lg:text-[24px]
          leading-[26px]
          text-[#464646]
          mt-3 text-left">
          Adapt your OCR to the way your business works.
        </p>

        {/* CARD WRAPPER */}
        <div className="flex justify-center mt-10">
          <div
            className="
              w-full max-w-[700px]
              bg-[#E7EDF2]
              rounded-[20px]
              shadow-[0px_0px_4px_0px_#00000040]
              p-6 sm:p-8
            "
          >
            {/* HEADER */}
            <h2 className="font-avenir font-semibold lg:font-bold text-[20px] md:text-[24px] text-[#21527D]">
              Enterprise{" "}
              <span className="font-normal italic text-[#21527D]">
                (Custom pricing)
              </span>
            </h2>

            <p className="font-avenir font-semibold text-[14px] sm:text-[16px] text-[#121212] mt-2">
              Mission-critical scale and compliance
            </p>

            <h3 className="font-avenir font-semibold lg:font-bold text-[16px] md:text-[18px] sm:text-[20px] text-[#21527D] mt-4">
              Typical per-page $0.005–$0.008 at scale
            </h3>

            {/* CTA */}
            <div className="flex flex-col items-center mt-6">
              <button
                className="
                  font-avenir font-bold
                  text-[16px] sm:text-[18px]
                  text-white
                  bg-[#21527D]
                  rounded-[100px]
                  w-full max-w-[200px] mx-auto h-[50px]
                  hover:opacity-90 transition
                "
              >
                Contact Sales
              </button>

              <p className="font-avenir font-bold italic text-[12px] text-[#464646] mt-2">
                Volume discounts
              </p>
            </div>

            {/* FEATURES */}
            <div
              className="
                mt-6
                bg-[#FDFDFD]
                rounded-[20px]
                p-3 md:p-5
              "
            >
              <ul className="
                list-disc
                pl-5
                space-y-2
                font-avenir font-normal italic
                text-[12px] md:text-[14px] sm:text-[16px]
                leading-[26px]
                text-[#6E6E6E]
              ">
                <li>Dedicated infrastructure (VPC / On-prem)</li>
                <li>Custom OCR & invoice models</li>
                <li>SSO, SLA-backed uptime</li>
                <li>SOC 2 / HIPAA-ready contracts</li>
                <li>Dedicated onboarding & support</li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default EnterpriseScreen;
