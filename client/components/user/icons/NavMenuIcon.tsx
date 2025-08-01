import React from "react";

const NavMenuIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg
      fill="var(--color-foreground)"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="SVGRepo_iconCarrier">
        <path d="M3,11h7a1,1,0,0,0,1-1V3a1,1,0,0,0-1-1H3A1,1,0,0,0,2,3v7A1,1,0,0,0,3,11ZM4,4H9V9H4ZM22,3a1,1,0,0,0-1-1H14a1,1,0,0,0-1,1v7a1,1,0,0,0,1,1h7a1,1,0,0,0,1-1ZM20,9H15V4h5ZM2,21a1,1,0,0,0,1,1h7a1,1,0,0,0,1-1V14a1,1,0,0,0-1-1H3a1,1,0,0,0-1,1Zm2-6H9v5H4Zm18,6V14a1,1,0,0,0-1-1H14a1,1,0,0,0-1,1v7a1,1,0,0,0,1,1h7A1,1,0,0,0,22,21Zm-2-1H15V15h5Z"></path>
      </g>
    </svg>
  );
};

export default NavMenuIcon;
