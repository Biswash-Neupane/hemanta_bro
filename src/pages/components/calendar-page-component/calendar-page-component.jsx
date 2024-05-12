import React, { useState, useEffect } from "react";
import "./calendar-page-component.css";
import BikramSambat from "@askbuddie/bikram-sambat";
import HolidayMarker from "../mark-as-holiday/markAsHoliday";
import axios from "axios"; // Ensure axios is installed
import Wrapper from "../wrapper/Wrapper";

const bsMonthNames = [
  "Baisakh",
  "Jestha",
  "Ashad",
  "Shrawan",
  "Bhadra",
  "Ashwin",
  "Kartik",
  "Mangsir",
  "Poush",
  "Magh",
  "Falgun",
  "Chaitra",
];

const bsMonthDays = {
  2080: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  2081: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
};

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const calculateDayOffset = (year, month) => {
  let totalDaysSinceStart = 0;
  for (let y = 2080; y < year; y++) {
    totalDaysSinceStart += Object.values(bsMonthDays[y]).reduce(
      (a, b) => a + b,
      0
    );
  }
  for (let m = 1; m < month; m++) {
    totalDaysSinceStart += bsMonthDays[year][m - 1];
  }
  return (totalDaysSinceStart + 5) % 7;
};

const DummyCalendarSelector = (props) => {
  const todayBS = new BikramSambat();
  const [selectedDate, setSelectedDate] = useState({
    year: todayBS.getYear(),
    month: todayBS.getMonth(),
    day: todayBS.getDay(),
  });
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await axios.get(
          "http://ec2-3-108-238-64.ap-south-1.compute.amazonaws.com/api/school/holidays"
        );
        setHolidays(response.data.holidays);
      } catch (error) {
        console.error("Failed to fetch holidays", error);
      }
    };

    fetchHolidays();
  }, []);

  // Add a new function to update the holidays state
  const markDateAsHoliday = (fullDate) => {
    if (!holidays.includes(fullDate)) {
      setHolidays([...holidays, fullDate]);
    }
  };

  const isToday = (date) => {
    return (
      date === todayBS.getDay() &&
      selectedDate.month === todayBS.getMonth() &&
      selectedDate.year === todayBS.getYear()
    );
  };

  const isHoliday = (date) => {
    const fullDate = `${selectedDate.year}-${String(
      selectedDate.month
    ).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
    return holidays.includes(fullDate);
  };

  const findSaturdays = (year, month) => {
    const daysInMonth = bsMonthDays[year][month - 1];
    const firstDayOfMonth = calculateDayOffset(year, month);
    let saturdays = [];
    for (let day = 1; day <= daysInMonth; day++) {
      if ((firstDayOfMonth + day - 1) % 7 === 6) {
        saturdays.push(day);
      }
    }
    return saturdays;
  };

  const changeMonth = (offset) => {
    let newMonth = selectedDate.month + offset;
    let newYear = selectedDate.year;
    if (newMonth > 12) {
      newMonth = 1;
      newYear++;
    } else if (newMonth < 1) {
      newMonth = 12;
      newYear--;
    }
    if (newYear < 2080 || (newYear === 2080 && newMonth < 1)) {
      newYear = 2080;
      newMonth = 1;
    } else if (newYear > 2081 || (newYear === 2081 && newMonth > 12)) {
      newYear = 2081;
      newMonth = 12;
    }
    setSelectedDate({ year: newYear, month: newMonth, day: 1 });
  };

  const renderDaysOfWeek = () =>
    weekDays.map((day, index) => (
      <div key={index} className="calendar-day-name">
        {day}
      </div>
    ));

  const renderDates = () => {
    const offset = calculateDayOffset(selectedDate.year, selectedDate.month);
    const daysInMonth = bsMonthDays[selectedDate.year][selectedDate.month - 1];
    const saturdays = findSaturdays(selectedDate.year, selectedDate.month);
    const dates = Array(offset)
      .fill(null)
      .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

    return dates.map((date, index) => {
      const fullDate = `${selectedDate.year}-${String(
        selectedDate.month
      ).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
      return (
        <div
          key={index}
          className={`calendar-day ${date ? "" : "empty"} ${
            isToday(date) ? "today" : ""
          } ${saturdays.includes(date) ? "saturday" : ""} ${
            isHoliday(date) ? "holiday" : ""
          }`}
        >
          {date}
          {date && (
            <div className="holiday-marker">
              <HolidayMarker
                date={fullDate}
                onMarkedAsHoliday={markDateAsHoliday}
              />
            </div>
          )}
        </div>
      );
    });
  };
  let classes = "wrapper " + props.className;
  return (
    <Wrapper className="calendar-main-calendar-wrapper">
      <div className="header">
        <button onClick={() => changeMonth(-1)}>&lt;</button>
        <span className="header-text">{`${
          bsMonthNames[selectedDate.month - 1]
        } ${selectedDate.year}`}</span>
        <button onClick={() => changeMonth(1)}>&gt;</button>
      </div>
      <div className="calendar-week-days">{renderDaysOfWeek()}</div>
      <div className="calendar-days-grid">{renderDates()}</div>
    </Wrapper>
  );
};

export default DummyCalendarSelector;
