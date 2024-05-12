import React from "react";
import "./Reports.css";

import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import Wrapper from "../components/wrapper/Wrapper";
import ReportDateFilter from "../components/reports-date-filter/reports-date-filter";

const Reports = (props) => {
  return (
    <Wrapper className="report-container ">
      <Header className="report-header" />
      <Sidebar className="report-sidebar" />
      <Wrapper className="report-body">
        <Wrapper className="report-date-filters">
          <ReportDateFilter />
        </Wrapper>
      </Wrapper>
    </Wrapper>
  );
};

export default Reports;
