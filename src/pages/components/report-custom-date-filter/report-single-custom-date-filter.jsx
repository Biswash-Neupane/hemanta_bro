import React, { useState, useEffect, useRef } from "react";
import "./report-single-custom-date-filter.css"; // Assume this is the updated CSS file name
import BikramSambat from "@askbuddie/bikram-sambat";

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
  return (totalDaysSinceStart + 5) % 7; // Adjusted starting day of week here if necessary
};

const SingleDatePicker = ({ onDateSelect, className }) => {
  const todayBS = new BikramSambat();
  const formattedToday = `${todayBS.getYear()}-${String(
    todayBS.getMonth()
  ).padStart(2, "0")}-${String(todayBS.getDay()).padStart(2, "0")}`;
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(formattedToday);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsPickerVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  useEffect(() => {
    // Notify the parent component whenever selectedDate changes
    if (onDateSelect) {
      onDateSelect(selectedDate);
    }
  }, [selectedDate, onDateSelect]);

  const toggleDatePicker = () => setIsPickerVisible(!isPickerVisible);

  const selectDate = (year, month, day) => {
    const fullDate = `${year}-${String(month).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    setSelectedDate(fullDate);
  };

  const renderCalendar = () => {
    const [year, month] = selectedDate.split("-").map(Number);
    const offset = calculateDayOffset(year, month);
    const daysInMonth = bsMonthDays[year][month - 1];
    const dates = Array(offset)
      .fill(null)
      .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

    return (
      <div className="single-date-calendar">
        <div className="single-header">
          <button onClick={() => selectDate(year, month - 1, 1)}>&lt;</button>
          <span>{`${bsMonthNames[month - 1]} ${year}`}</span>
          <button onClick={() => selectDate(year, month + 1, 1)}>&gt;</button>
        </div>
        <div className="single-week-days">
          {weekDays.map((day) => (
            <div key={day} className="day-name">
              {day}
            </div>
          ))}
        </div>
        <div className="single-days-grid">
          {dates.map((date, index) => (
            <div
              key={index}
              className={`single-day ${date ? "" : "empty"} ${
                selectedDate ===
                `${year}-${String(month).padStart(2, "0")}-${String(
                  date
                ).padStart(2, "0")}`
                  ? "selected"
                  : ""
              }`}
              onClick={() => date && selectDate(year, month, date)}
            >
              {date}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      ref={wrapperRef}
      className={`single-date-picker-wrapper ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="selected-date" onClick={toggleDatePicker}>
        Date: &nbsp; {selectedDate || "Today"}
      </div>
      {isPickerVisible && (
        <div className="single-date-picker-container">{renderCalendar()}</div>
      )}
    </div>
  );
};

export default SingleDatePicker;
