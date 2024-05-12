const SuperCardAdd = ({ onClick, className }) => {
  return (
    <svg
      onClick={onClick} // Added onClick event here
      className={`SuperCardAdd ${className}`} // Use className prop to apply styles
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="313.000000pt"
      height="317.000000pt"
      viewBox="0 0 313.000000 317.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,317.000000) scale(0.100000,-0.100000)"
        fill="#00910B"
        stroke="none"
      >
        <path
          d="M1365 2756 c-545 -91 -964 -453 -1091 -943 -34 -131 -44 -346 -21
-478 77 -440 398 -808 842 -964 482 -171 995 -89 1388 221 232 183 402 468
447 755 15 94 13 284 -4 383 -44 245 -151 445 -341 636 -195 196 -403 310
-684 376 -112 26 -416 34 -536 14z m467 -75 c485 -83 881 -432 998 -879 162
-619 -249 -1248 -920 -1410 -365 -89 -770 -15 -1084 197 -101 68 -250 217
-313 311 -135 202 -194 392 -194 625 0 314 114 577 348 807 195 191 432 310
703 353 130 20 328 18 462 -4z"
        />
        <path
          d="M1550 1775 l0 -215 -230 0 -230 0 0 -35 0 -35 230 0 230 0 0 -215 0
-215 40 0 40 0 0 215 0 215 235 0 235 0 0 35 0 35 -232 2 -233 3 -3 213 -2
212 -40 0 -40 0 0 -215z"
        />
      </g>
    </svg>
  );
};
export default SuperCardAdd;
