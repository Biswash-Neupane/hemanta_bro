import React, { useState, useEffect } from "react";
import "./calendarPage.css";
import "../components/calendar-page-component/calendar-page-component";
import DummyCalendarSelector from "../components/calendar-page-component/calendar-page-component";
import Wrapper from "../components/wrapper/Wrapper";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";

const CalendarPage = () => {
  return (
    <Wrapper className="calendar-page-container">
      <Header className="calendar-page-header"></Header>
      <Sidebar className="calendar-page-sidebar"></Sidebar>

      <Wrapper className="calendar-page-body">
        <DummyCalendarSelector className="calendar-main-calendar"></DummyCalendarSelector>
      </Wrapper>
    </Wrapper>
  );
};

export default CalendarPage;
