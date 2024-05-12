import React, { useState, useEffect, useRef } from "react";
import "./report-double-custom-date-filter.css";
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

const calculateBSDate = (year, month, day) => {
  const totalDaysSinceStart = calculateDayOffset(year, month) + day - 1;
  let daysPassed = 0;
  let m = 0;
  while (daysPassed + bsMonthDays[year][m] <= totalDaysSinceStart) {
    daysPassed += bsMonthDays[year][m];
    m++;
  }
  const date = totalDaysSinceStart - daysPassed;
  return { year, month: m + 1, day: date + 1 };
};

const DateRangeCalendar = ({
  singleDatePicker,
  onDateRangeSelect,
  className,
}) => {
  const todayBS = new BikramSambat();
  const formattedToday = `${todayBS.getYear()}-${String(
    todayBS.getMonth()
  ).padStart(2, "0")}-${String(todayBS.getDay()).padStart(2, "0")}`;
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [startDate, setStartDate] = useState(formattedToday);
  const [endDate, setEndDate] = useState(formattedToday);
  const [selectedDate, setSelectedDate] = useState({
    start: {
      year: todayBS.getYear(),
      month: todayBS.getMonth(),
      day: todayBS.getDay(),
    },
    end: {
      year: todayBS.getYear(),
      month: todayBS.getMonth(),
      day: todayBS.getDay(),
    },
  });
  const [selectedPreset, setSelectedPreset] = useState(null);

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
    if (onDateRangeSelect) {
      onDateRangeSelect(startDate, endDate);
    }
  }, [startDate, endDate, onDateRangeSelect]);

  const toggleDatePicker = () => setIsPickerVisible(!isPickerVisible);

  const selectDate = (year, month, day, calendar) => {
    const fullDate = `${year}-${String(month).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    if (calendar === "start" || !startDate) {
      setStartDate(fullDate);
      if (endDate && new Date(fullDate) > new Date(endDate)) {
        setEndDate(null);
      }
    } else {
      setEndDate(fullDate);
    }
  };

  const changeMonth = (offset, calendar) => {
    let newMonth = selectedDate[calendar].month + offset;
    let newYear = selectedDate[calendar].year;
    if (newMonth > 12) {
      newMonth = 1;
      newYear++;
    } else if (newMonth < 1) {
      newMonth = 12;
      newYear--;
    }
    setSelectedDate((prev) => ({
      ...prev,
      [calendar]: { year: newYear, month: newMonth, day: 1 },
    }));
  };

  const handlePreset = (preset) => {
    setSelectedPreset(preset); // Set the selected preset

    const today = new BikramSambat();
    let start = {
      year: today.getYear(),
      month: today.getMonth(),
      day: today.getDay(),
    };

    switch (preset) {
      case "today":
        setStartDate(
          `${start.year}-${String(start.month).padStart(2, "0")}-${String(
            start.day
          ).padStart(2, "0")}`
        );
        setEndDate(
          `${start.year}-${String(start.month).padStart(2, "0")}-${String(
            start.day
          ).padStart(2, "0")}`
        );
        break;
      case "week":
        const dayOfWeek = today.getDayOfWeek();
        const dayOffset = (dayOfWeek + 6) % 7; // Adjust if Bikram Sambat week starts differently
        start = calculateBSDate(
          today.getYear(),
          today.getMonth(),
          today.getDay() - dayOffset
        );
        const end = calculateBSDate(
          today.getYear(),
          today.getMonth(),
          today.getDay() - dayOffset + 6
        );
        setStartDate(
          `${start.year}-${String(start.month).padStart(2, "0")}-${String(
            start.day
          ).padStart(2, "0")}`
        );
        setEndDate(
          `${end.year}-${String(end.month).padStart(2, "0")}-${String(
            end.day
          ).padStart(2, "0")}`
        );
        break;
      case "month":
        start.day = 1;
        const daysInMonth = bsMonthDays[start.year][start.month - 1];
        setStartDate(
          `${start.year}-${String(start.month).padStart(2, "0")}-01`
        );
        setEndDate(
          `${start.year}-${String(start.month).padStart(2, "0")}-${String(
            daysInMonth
          ).padStart(2, "0")}`
        );
        break;
      case "year":
        start.month = 1;
        start.day = 1;
        setStartDate(`${start.year}-01-01`);
        setEndDate(`${start.year}-12-30`);
        break;
      default:
        break;
    }
    setSelectedDate({
      start: start,
      end: {
        year: start.year,
        month: start.month,
        day: start.month === 12 ? 30 : bsMonthDays[start.year][start.month - 1],
      },
    });
  };

  const isPresetSelected = (preset) => {
    const today = new BikramSambat();
    const format = (d) =>
      `${d.year}-${String(d.month).padStart(2, "0")}-${String(d.day).padStart(
        2,
        "0"
      )}`;
    const startFormatted = format(selectedDate.start);
    const endFormatted = format(selectedDate.end);
    const todayFormatted = format({
      year: today.getYear(),
      month: today.getMonth(),
      day: today.getDay(),
    });

    switch (preset) {
      case "today":
        return (
          startFormatted === todayFormatted && endFormatted === todayFormatted
        );
      case "week":
        const startOfWeek = today.getDayOfWeek();
        const weekStart = calculateBSDate(
          today.getYear(),
          today.getMonth(),
          today.getDay() - (startOfWeek % 7)
        );
        const weekEnd = calculateBSDate(
          today.getYear(),
          today.getMonth(),
          weekStart.day + 6 // Assuming 7 days in a week
        );
        return (
          startFormatted === format(weekStart) &&
          endFormatted === format(weekEnd)
        );
      case "month":
        const monthStart = {
          year: today.getYear(),
          month: today.getMonth(),
          day: 1,
        };
        const daysInMonth = bsMonthDays[today.getYear()][today.getMonth() - 1];
        const monthEnd = {
          year: today.getYear(),
          month: today.getMonth(),
          day: daysInMonth,
        };
        return (
          startFormatted === format(monthStart) &&
          endFormatted === format(monthEnd)
        );
      case "year":
        const yearStart = { year: today.getYear(), month: 1, day: 1 };
        const yearEnd = {
          year: today.getYear(),
          month: 12,
          day: 30, // Assuming the last day of Poush as December has 30 days
        };
        return (
          startFormatted === format(yearStart) &&
          endFormatted === format(yearEnd)
        );
      default:
        return false;
    }
  };

  const renderCalendar = (calendar) => {
    const { year, month } = selectedDate[calendar];
    const offset = calculateDayOffset(year, month);
    const daysInMonth = bsMonthDays[year][month - 1];
    const dates = Array(offset)
      .fill(null)
      .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

    const isSelected = (day) => {
      const fullDate = `${year}-${String(month).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      return (
        (calendar === "start" && startDate === fullDate) ||
        (calendar === "end" && endDate === fullDate)
      );
    };

    return (
      <div className="calendar">
        <div className="header">
          <button onClick={() => changeMonth(-1, calendar)}>&lt;</button>
          <span>{`${bsMonthNames[month - 1]} ${year}`}</span>
          <button onClick={() => changeMonth(1, calendar)}>&gt;</button>
        </div>
        <div className="double-week-days">
          {weekDays.map((day) => (
            <div key={day} className="day-name">
              {day}
            </div>
          ))}
        </div>
        <div className="double-days-grid">
          {dates.map((date, index) => (
            <div
              key={index}
              className={`day ${date ? "" : "empty"} ${
                isSelected(date) ? "selected" : ""
              }`}
              onClick={() => date && selectDate(year, month, date, calendar)}
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
      className={`date-range-calendar-wrapper ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div>{singleDatePicker}</div>
      <div className="presets">
        {["today", "month", "year"].map((preset) => (
          <button
            key={preset}
            onClick={(e) => {
              e.preventDefault();
              handlePreset(preset);
            }}
            className={selectedPreset === preset ? "selected" : ""}
          >
            {preset.charAt(0).toUpperCase() + preset.slice(1)}
          </button>
        ))}
      </div>
      <div className="selected-date-range" onClick={toggleDatePicker}>
        Date: &nbsp; {startDate || "Today"} &nbsp;- &nbsp; {endDate || "Today"}
      </div>
      {isPickerVisible && (
        <div className="date-picker-container">
          {renderCalendar("start")}
          {renderCalendar("end")}
        </div>
      )}
    </div>
  );
};

export default DateRangeCalendar;
