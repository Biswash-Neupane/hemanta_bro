const CloseIcon = ({ onClick, className }) => {
  return (
    <svg
      className={className}
      onClick={onClick}
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="135.000000pt"
      height="132.000000pt"
      viewBox="0 0 135.000000 132.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,132.000000) scale(0.100000,-0.100000)"
        fill="#000000"
        stroke="none"
      >
        <path
          d="M266 1114 c-9 -8 -16 -24 -16 -34 0 -11 81 -97 195 -207 107 -105
195 -194 195 -199 0 -5 -88 -97 -195 -204 -107 -107 -195 -202 -195 -210 0
-22 20 -40 45 -40 13 0 88 68 214 194 l194 195 200 -192 c156 -151 204 -192
225 -192 21 0 28 6 30 24 3 20 -32 59 -195 223 l-198 198 198 198 c127 127
197 204 197 218 0 24 -18 44 -40 44 -8 0 -105 -90 -215 -200 l-200 -200 -200
200 c-110 110 -205 200 -212 200 -6 0 -19 -7 -27 -16z"
        />
      </g>
    </svg>
  );
};
export default CloseIcon;
