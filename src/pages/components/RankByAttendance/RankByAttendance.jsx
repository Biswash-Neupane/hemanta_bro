import React, { useState, useRef, useEffect } from "react";
import "./RankByAttendance.css";

//icons
import RefreshIcon from "../SVGs/RefreshIcon";
import CloseIcon from "../SVGs/CloseIcon";

const studentData = [
  {
    StudentName: "Biswash Neupane",
    Class: 1,
    Section: "B",
    "Present Count": 28,
  },
  { StudentName: "Saurav Dhakal", Class: 2, Section: "A", "Present Count": 5 },
  { StudentName: "Aarav Sharma", Class: 4, Section: "A", "Present Count": 9 },
  {
    StudentName: "Anika Bhandari",
    Class: 5,
    Section: "B",
    "Present Count": 12,
  },
  { StudentName: "Bibek Gurung", Class: 1, Section: "C", "Present Count": 15 },
  { StudentName: "Diya Joshi", Class: 2, Section: "A", "Present Count": 18 },
  { StudentName: "Eshan Karki", Class: 3, Section: "B", "Present Count": 21 },
  { StudentName: "Firoj Tamang", Class: 4, Section: "C", "Present Count": 24 },
  { StudentName: "Gita Magar", Class: 5, Section: "A", "Present Count": 27 },
  { StudentName: "Hari Basnet", Class: 1, Section: "B", "Present Count": 0 },
  { StudentName: "Ishaan Thapa", Class: 2, Section: "C", "Present Count": 3 },
  { StudentName: "Janaki Rai", Class: 3, Section: "A", "Present Count": 6 },
  { StudentName: "Kabita Dahal", Class: 4, Section: "B", "Present Count": 9 },
  {
    StudentName: "Laxman Adhikari",
    Class: 5,
    Section: "C",
    "Present Count": 12,
  },
  { StudentName: "Manisha Limbu", Class: 1, Section: "A", "Present Count": 15 },
  { StudentName: "Nabin Chhetri", Class: 2, Section: "B", "Present Count": 18 },
  {
    StudentName: "Ojaswi Acharya",
    Class: 3,
    Section: "C",
    "Present Count": 21,
  },
  {
    StudentName: "Pratiksha Malla",
    Class: 4,
    Section: "A",
    "Present Count": 24,
  },
  {
    StudentName: "Roshan Bhattarai",
    Class: 5,
    Section: "B",
    "Present Count": 27,
  },
  {
    StudentName: "Sunita Maharjan",
    Class: 1,
    Section: "C",
    "Present Count": 0,
  },
];

const Wrapper = React.forwardRef((props, ref) => (
  <div ref={ref} className={props.className}>
    {props.children}
  </div>
));

const RankByAttendance = ({ onClose }) => {
  const popupRef = useRef();
  const [order, setOrder] = useState("DESC"); // Default to descending
  const [totalWorkingDays] = useState(28); // Hardcoded total working days

  // Additional state for dropdowns
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedInterval, setSelectedInterval] = useState("last month");

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleOrderChange = (newOrder) => {
    setOrder(newOrder);
  };

  const sortedData = [...studentData].sort((a, b) => {
    return order === "ASC"
      ? a.PresentCount - b.PresentCount
      : b.PresentCount - a.PresentCount;
  });

  return (
    <div className="RankByAttendanceBackdrop">
      <Wrapper className="RankByAttendancePopUpContainer" ref={popupRef}>
        <Wrapper className="RankByAttendancePopUpHeader">
          <RefreshIcon className="RefreshIcon" />
          <span className="RankByAttendancePopUpHeaderText">
            Rank by attendance
          </span>
          <CloseIcon className="CloseIcon" onClick={onClose} />
        </Wrapper>
        {/* Dropdowns for Class, Section, and Interval */}
        <div className="RankByAttendanceFilters">
          <Wrapper className="RankByAttendanceFiltersRow1">
            {" "}
            <label>Class </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              {/* Options for Class */}
              <option value="">Select</option>
              {/* Add more <option> elements here for other classes */}
            </select>
            <label>Section</label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
            >
              {/* Options for Section */}
              <option value="">Select</option>
              {/* Add more <option> elements here for other sections */}
            </select>
          </Wrapper>
          <Wrapper className="RankByAttendanceFiltersRow2">
            <label>Interval</label>
            <select
              value={selectedInterval}
              onChange={(e) => setSelectedInterval(e.target.value)}
            >
              {/* Options for Interval */}
              <option value="last month">Last month</option>
              {/* Add more <option> elements here for other intervals */}
            </select>
            <span>Total working days: {totalWorkingDays}</span>
          </Wrapper>
        </div>
        {/* Order buttons */}
        <div className="RankByAttendanceOrderButtons">
          <button
            className={`order-button ${order === "ASC" && "active"}`}
            onClick={() => handleOrderChange("ASC")}
          >
            Ascending
          </button>
          <button
            className={`order-button ${order === "DESC" && "active"}`}
            onClick={() => handleOrderChange("DESC")}
          >
            Descending
          </button>
        </div>
        <div className="rank-by-table-container">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Class</th>
                <th>Section</th>
                <th>Present Days</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((student, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{student.StudentName}</td>
                  <td>{student.Class}</td>
                  <td>{student.Section}</td>
                  <td>{student.PresentCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Wrapper>
    </div>
  );
};

export default RankByAttendance;
