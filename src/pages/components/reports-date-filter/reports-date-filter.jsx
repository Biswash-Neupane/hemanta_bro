import React from "react";
import { NavLink } from "react-router-dom";

import "./report-date-filter.css";
import Wrapper from "../wrapper/Wrapper";

const ReportDateFilter = () => {
  return (
    <Wrapper className="reports-date-filter-container">
      <NavLink className="reports-date-filter-button reports-date-filter-button-today">
        Today
      </NavLink>
      <NavLink className="reports-date-filter-button reports-date-filter-button-this-week">
        This Week
      </NavLink>
      <NavLink className="reports-date-filter-button reports-date-filter-button-this-month">
        This Month
      </NavLink>
      <NavLink className="reports-date-filter-button reports-date-filter-button-this-year">
        This Year
      </NavLink>
    </Wrapper>
  );
};

export default ReportDateFilter;
