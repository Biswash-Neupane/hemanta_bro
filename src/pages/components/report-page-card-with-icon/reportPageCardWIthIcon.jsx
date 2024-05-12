import React from "react";
import Wrapper from "../wrapper/Wrapper";
import "./reportPageCardWithIcon.css";

const ReportPageCardWithIcon = ({
  ComponentToRender,
  count,
  percentageChange,
  textContent,
  textContentSize,
  valueSize,
}) => {
  const changeColor = percentageChange < 0 ? "red" : "green";
  return (
    <Wrapper className="reportPageCardWithIconContainer">
      <div
        style={{
          padding: "0.5rem 1rem 0.5rem 0rem ",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <ComponentToRender />
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
      </div>
    </Wrapper>
  );
};

export default ReportPageCardWithIcon;
