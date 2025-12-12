// UserIcon.jsx
import React from "react";

const UserIcon = ({
  width = 56,
  height = 56,
  color = "#21527D",
  opacity = 1,
  className = "",
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
      {...props}
    >
      <path
        d="M27.9997 9.33333C30.475 9.33333 32.849 10.3167 34.5993 12.067C36.3497 13.8173 37.333 16.1913 37.333 18.6667C37.333 21.142 36.3497 23.516 34.5993 25.2663C32.849 27.0167 30.475 28 27.9997 28C25.5243 28 23.1504 27.0167 21.4 25.2663C19.6497 23.516 18.6663 21.142 18.6663 18.6667C18.6663 16.1913 19.6497 13.8173 21.4 12.067C23.1504 10.3167 25.5243 9.33333 27.9997 9.33333ZM27.9997 32.6667C38.313 32.6667 46.6663 36.8433 46.6663 42V46.6667H9.33301V42C9.33301 36.8433 17.6863 32.6667 27.9997 32.6667Z"
        fill={color}   // ⬅️ color is now fully controllable
      />
    </svg>
  );
};

export default UserIcon;
