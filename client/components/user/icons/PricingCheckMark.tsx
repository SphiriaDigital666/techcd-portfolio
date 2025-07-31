import React from "react";

const PricingCheckMark: React.FC<React.SVGProps<SVGSVGElement>> = ({
  ...props
}) => {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="SVGRepo_iconCarrier">
        <path
          d="M20.94,11A8.26,8.26,0,0,1,21,12a9,9,0,1,1-9-9,8.83,8.83,0,0,1,4,1"
          fill="none"
          stroke="var(--color-foreground)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        ></path>
        <polyline
          points="21 5 12 14 8 10"
          fill="none"
          stroke="var(--color-foreground)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        ></polyline>
      </g>
    </svg>
  );
};

export default PricingCheckMark;
