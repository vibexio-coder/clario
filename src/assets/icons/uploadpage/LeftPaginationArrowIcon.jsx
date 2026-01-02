import React from "react";

const LeftPaginationArrowIcon = ({
  width = 9,
  height = 15,
  color = "#21527D",
  className = "",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 9 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.34132 6.59986L6.94115 3.05176e-05L8.59082 1.6497L2.81582 7.4247L8.59082 13.1997L6.94115 14.8494L0.34132 8.24953C0.122604 8.03075 -0.000264168 7.73406 -0.000264168 7.4247C-0.000264168 7.11534 0.122604 6.81865 0.34132 6.59986Z"
        fill={color}
      />
    </svg>
  );
};


export default LeftPaginationArrowIcon;
