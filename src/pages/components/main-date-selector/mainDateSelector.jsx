import React from "react";
import DummyCalendarSelector from "../calendar-page-component/calendar-page-component";
import Wrapper from "../wrapper/Wrapper";

const mainDatePicker = (props) => {
  return (
    <Wrapper className="mainDatePickerComponent">
      <DummyCalendarSelector></DummyCalendarSelector>
    </Wrapper>
  );
};

export default mainDatePicker;
