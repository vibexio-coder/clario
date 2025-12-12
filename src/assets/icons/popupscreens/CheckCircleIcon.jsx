import React from "react";

const CheckCircleIcon = ({ width = 120, height = 120, stroke = "#21527D" }) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M45 50L61.29 62.22C62.2992 62.9769 63.5572 63.3243 64.8118 63.1926C66.0665 63.061 67.2249 62.4599 68.055 61.51L100 25"
            stroke={stroke}
            strokeWidth="4"
            strokeLinecap="round"
        />
        <path
            d="M105 60.0002C105 69.4028 102.055 78.5693 96.5783 86.2122C91.1015 93.8552 83.3682 99.5906 74.4646 102.613C65.561 105.635 55.9342 105.793 46.9365 103.063C37.9388 100.334 30.0221 94.8541 24.2984 87.3943C18.5746 79.9345 15.3313 70.8692 15.024 61.4716C14.7168 52.074 17.3609 42.8162 22.5851 34.9985C27.8093 27.1807 35.3511 21.1958 44.1513 17.8843C52.9515 14.5727 62.5679 14.1009 71.65 16.5352"
            stroke={stroke}
            strokeWidth="4"
            strokeLinecap="round"
        />
    </svg>
);

export default CheckCircleIcon;
