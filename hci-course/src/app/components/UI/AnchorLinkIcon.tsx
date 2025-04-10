// components/AnchorLinkIcon.jsx
import React from 'react';

const AnchorLinkIcon = () => {
  return (
    <span className="heading-anchorlink-icon bg-[#F2F2F2] hover:bg-[#E8E7FA] size-[1em] text-[#BDBDBD] hover:text-[#8780E4] rounded-md border border-[#E6E6E6] hover:border-[#C0BEF1] inline-grid place-content-center hover:shadow-sm hover:shadow-base-200 align-text-bottom me-3 lg:absolute lg:ms-[-1.5em] lg:mt-1 transition-all group">
      {/* --- Background classes updated above --- */}
      {/* bg-base-content/5 -> bg-gray-200 (Default background is now light gray) */}
      {/* hover:bg-primary/10 -> hover:bg-purple-200 (Hover background is light purple) */}

      {/* --- Text/SVG color classes remain as previously updated --- */}
      {/* text-gray-500 hover:text-purple-500 */}

      {/* --- Border classes remain as previously updated --- */}
      {/* rounded-md border border-gray-300 hover:border-purple-300 */}

      <svg
        className="group-hover:scale-100 scale-90 transition-transform"
        fill="currentColor" // Inherits the text color from the span
        width=".5em"
        height=".5em"
        viewBox="0 0 256 256"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M216,148H172V108h44a12,12,0,0,0,0-24H172V40a12,12,0,0,0-24,0V84H108V40a12,12,0,0,0-24,0V84H40a12,12,0,0,0,0,24H84v40H40a12,12,0,0,0,0,24H84v44a12,12,0,0,0,24,0V172h40v44a12,12,0,0,0,24,0V172h44a12,12,0,0,0,0-24Zm-108,0V108h40v40Z"></path>
      </svg>
    </span>
  );
};

export default AnchorLinkIcon;