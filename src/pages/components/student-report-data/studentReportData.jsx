import React from "react";

import "./studentReportData.css";
import Wrapper from "../wrapper/Wrapper";
import DownwardArrow from "../SVGs/DownwardArrow";
import BarChartComponent from "../attendance-card/home-stacked-bar-chart/home-stacked-bar-chart";

const AttendanceCard = (props) => {
  return (
    <Wrapper className="attendance-card-container">
      <Wrapper className="attendance-card-header">
        <span className="attendance-card-title">
          {props.AttendanceCardName}
        </span>
        <span className="attendance-card-value">
          {props.AttendanceCardValue}
        </span>
        <Wrapper className="attendance-card-trend">
          <DownwardArrow color="red" />

          <span className="attendance-card-trend-value">
            {props.AttendanceCardTrendValue}
          </span>
        </Wrapper>
      </Wrapper>

      <BarChartComponent
        className="attendance-card-figure"
        GraphColor={props.GraphColor}
      />
    </Wrapper>
  );
};

export default AttendanceCard;
