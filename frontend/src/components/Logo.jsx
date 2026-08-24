import React from 'react';

// Classic, serious emblem for the "Nexura" brand (public site + employee panel):
// a calm blue square with a serif "N".
export const NexuraLogo = ({ className = "" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Nexura"
    >
      <rect x="10" y="10" width="180" height="180" rx="14" fill="#1877F2" />
      <rect x="10" y="10" width="180" height="180" rx="14" fill="none" stroke="#166FE5" strokeWidth="3" />
      <g fill="#FFFFFF">
        <rect x="52" y="52" width="22" height="96" rx="2" />
        <rect x="126" y="52" width="22" height="96" rx="2" />
        <polygon points="52,52 74,52 148,148 126,148" />
      </g>
    </svg>
  );
};
