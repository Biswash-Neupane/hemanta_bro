import React from "react";
import Wrapper from "../wrapper/Wrapper"; // Adjust the path as necessary
import "./DateRangeSelector.css";
import DateRangeCalendar from "../report-custom-date-filter/report-double-custom-date-filer"; // Adjust the path as necessary
import SingleDatePicker from "../report-custom-date-filter/report-single-custom-date-filter"; // Adjust the path as necessary

const DateRangeSelector = ({ handleDateSelect, handleDateRangeSelect }) => {
  return (
    <Wrapper className="main-cards-row0">
      <DateRangeCalendar
        className="small-calendar"
        singleDatePicker={<SingleDatePicker onDateSelect={handleDateSelect} />}
        onDateRangeSelect={handleDateRangeSelect}
      />
    </Wrapper>
  );
};

export default DateRangeSelector;
