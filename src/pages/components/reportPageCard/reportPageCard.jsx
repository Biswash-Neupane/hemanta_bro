import React from "react";
import Wrapper from "../wrapper/Wrapper";
import "./reportPageCard.css";

const CircularProgressBar = ({
  size,
  progress,
  strokeWidth,
  baseColor,
  progressColor,
  count,
  percentageChange,
  textContent,
  textContentSize,
  valueSize,
}) => {
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  const changeColor = percentageChange < 0 ? "red" : "green";

  return (
    <Wrapper className="reportPageCardContainer">
      <div
        style={{
          padding: "0.5rem 1rem 0.5rem 1rem ",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <div style={{ fontSize: `${textContentSize}em`, textAlign: "center" }}>
          {" "}
          {/* Corrected fontSize property */}
          <div>{textContent}</div>
          <div style={{ fontSize: `${valueSize}em`, color: "black" }}>
            {count}
          </div>{" "}
          {/* Corrected fontSize property */}
          <div style={{ color: changeColor }}>
            {percentageChange < 0 ? "↓" : "↑"} {Math.abs(percentageChange)}%
          </div>
        </div>
        <svg width={size} height={size}>
          <circle
            stroke={baseColor}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeLinecap="round"
          />
          <circle
            stroke={progressColor}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            fill="transparent"
            strokeLinecap="round"
            transform={`rotate(-90 ${center} ${center})`}
          />
          <text
            x={center}
            y={center}
            fill={progressColor}
            fontSize="small"
            fontWeight="bold"
            textAnchor="middle"
            alignmentBaseline="central"
          >
            {progress}%
          </text>
        </svg>
      </div>
    </Wrapper>
  );
};

export default CircularProgressBar;
