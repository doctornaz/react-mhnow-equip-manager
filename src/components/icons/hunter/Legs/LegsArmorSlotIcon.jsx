import * as React from "react";
import rankColors from "../colors/colors1";

const LegsArmorSlotIcon = ({ rank, size }) => {
  
  const col = rankColors[rank] || rankColors[1];

  return <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
    viewBox="0 0 64 64"
    width={size}
    height={size}
  >
    <path
      d="m273 933-7 1-3 3v2l1 1-1 1v2l1 1-1 1v2l3 3 7 1h5l2-1 2 1h5l1.5-1 1.5 1h2l3.523-1 3.477 1h3l6-14-1-4-3-2v-5l-1-2.5 1-2.5v-5l-1-2.5 1-2.5v-5h-18v5l1 2.5-1 2.5v5l1 2.5-1 2.5v7h-4l-2 1-2-1z"
      style={{
        fillOpacity: 0.76,
      }}
      transform="translate(-256 -896)"
    />
    <path
      d="M263 937c0-2.208 1.792-4 4-4h6v18h-6c-2.208 0-4-1.792-4-4h5a1 1 0 0 0 0-2h-5v-2h5a1 1 0 0 0 0-2h-5v-2h5a1 1 0 0 0 0-2zm27 3a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1v11h3zm12 2c1 0 5-4 5-5v-4s5 3 5 5v8c0 1-4 5-5 5h-5s-1-.084-1-1.042V943s0-1 1-1"
      style={{
        fill: col.fill1,
      }}
      transform="translate(-256 -896)"
    />
    <path
      d="M304.045 931H287c-1 0-1 1-1 1v3.955s0 1.045 1 1.045h4s1 0 1 1v13h7v-10l5.045-5.045zM283 934a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1zm12.5 12a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 295.5 946m-15.5-.5a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 280 945.5m0-5a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 280 940.5m0-5a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 280 935.5m24-14.5a1 1 0 0 0-1-1h-16a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1zm-14.5 1a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 289.5 922m11 0a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 300.5 922m-5.5 0c1.656 0 3 .672 3 1.5s-1.344 1.5-3 1.5-3-.672-3-1.5 1.344-1.5 3-1.5m9-11a1 1 0 0 0-1-1h-16a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1zm-9 1c1.656 0 3 .672 3 1.5s-1.344 1.5-3 1.5-3-.672-3-1.5 1.344-1.5 3-1.5m-5.5 0a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 289.5 912m11 0a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 300.5 912m5.5-7a1 1 0 0 0-1-1h-20a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1z"
      style={{
        fill: col.fill2,
      }}
      transform="translate(-256 -896)"
    />
  </svg>
};

export default LegsArmorSlotIcon;
