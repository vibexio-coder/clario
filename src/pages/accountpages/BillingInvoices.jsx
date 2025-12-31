import React from "react";
import Navbar from "../landingpages/Navbar";

const BillingInvoices = () => {
    return (
        <div>
            <Navbar/>
            <div className="w-full space-y-4 px-4 sm:px-6 lg:px-12 py-5 lg:py-10 mb-20">
                {/* Title */}
                <h2 className="font-avenir font-normal text-[32px] leading-[26px] text-[#21527D]">
                    Billing & Invoices
                </h2>

                <p className="font-avenir font-normal text-[16px] leading-[26px] text-black">
                    View and download your invoices.
                </p>

                {/* Table Card */}
                <div className="w-full bg-white md:rounded-[20px] shadow-[0px_0px_4px_0px_#00000040] overflow-hidden">
                    {/* Responsive Scroll */}
                    <div className="overflow-x-auto scrollbar-hide">
                        <table className="w-full min-w-[800px] border-collapse">
                            {/* Table Head */}
                            <thead>
                                <tr className="bg-[#C5D4E2]">
                                    {[
                                        "S.NO",
                                        "Purchase date",
                                        "Invoice no",
                                        "Expires date",
                                        "Download",
                                        "Renew",
                                    ].map((head, i) => (
                                        <th
                                            key={i}
                                            className="px-4 py-3 text-left font-avenir font-normal text-[16px] leading-[26px] text-[#21527D]"
                                        >
                                            {head}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody>
                                {/* Empty State Row */}
                                <tr className="bg-[#F6F7F9] border-b border-[#C5D4E2]">
                                    <td colSpan={6} className="py-3 text-center">
                                        <span className="font-avenir font-normal text-[16px] leading-[26px] text-[#21527D]">
                                            No invoices available
                                        </span>
                                    </td>
                                </tr>

                                {/* Example Row (use later) */}

                                <tr className="bg-[#F6F7F9] border-b border-[#C5D4E2]">
                                    <td className="px-4 py-4">1</td>
                                    <td className="px-4 py-4">12 Jan 2025</td>
                                    <td className="px-4 py-4">INV-00123</td>
                                    <td className="px-4 py-4">12 Jan 2026</td>
                                    <td className="px-4 py-4 text-[#21527D] cursor-pointer">Download</td>
                                    <td className="px-4 py-4 text-[#21527D] cursor-pointer">Renew</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BillingInvoices;
