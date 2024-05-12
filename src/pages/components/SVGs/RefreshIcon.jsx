const RefreshIcon = ({ onClick, className }) => {
  return (
    <svg
      className={className} // Use className prop for styling
      onClick={onClick} // Add onClick prop to handle click events
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="141.000000pt"
      height="157.000000pt"
      viewBox="0 0 141.000000 157.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,157.000000) scale(0.100000,-0.100000)"
        fill="#000000"
        stroke="none"
      >
        <path
          d="M625 1320 c-201 -29 -378 -188 -430 -385 -8 -33 -15 -76 -15 -97 l0
-37 -51 -3 -51 -3 74 -97 c40 -54 76 -97 80 -95 4 1 39 45 78 97 l71 95 -51 3
-52 3 7 52 c19 134 108 263 225 322 112 57 244 59 377 4 32 -13 34 -12 63 21
16 19 29 38 30 41 0 10 -110 57 -160 68 -67 15 -139 19 -195 11z"
        />
        <path
          d="M1096 911 c-42 -55 -76 -103 -76 -106 0 -3 23 -5 50 -5 56 0 56 0 39
-82 -25 -121 -122 -243 -236 -296 -52 -24 -69 -27 -173 -27 -98 0 -122 3 -164
23 l-50 22 -33 -32 c-18 -17 -33 -36 -33 -40 0 -19 130 -69 207 -80 167 -24
321 28 444 151 89 90 149 218 149 324 l0 37 50 0 c28 0 50 3 50 8 0 4 -34 51
-74 105 l-74 98 -76 -100z"
        />
      </g>
    </svg>
  );
};
export default RefreshIcon;
