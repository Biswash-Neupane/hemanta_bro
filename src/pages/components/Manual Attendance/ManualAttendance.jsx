import React, { useState, useRef, useEffect } from "react";
import BikramSambat from "@askbuddie/bikram-sambat";

import "./ManualAttendance.css";
import RefreshIcon from "../SVGs/RefreshIcon";
import CloseIcon from "../SVGs/CloseIcon";
import ManualSearchBar from "../ManualSearchBar/ManualSearchBar";
import ProfilePictureIcon from "../SVGs/ProfilePictureIcon";
import SingleDatePicker from "../report-custom-date-filter/report-single-custom-date-filter";

const Wrapper = React.forwardRef((props, ref) => (
  <div ref={ref} className={props.className}>
    {props.children}
  </div>
));

const ManualAttendance = ({ onClose }) => {
  const popupRef = useRef();
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResults, setSelectedResults] = useState({});
  const [classSelection, setClassSelection] = useState("1");
  const [sectionSelection, setSectionSelection] = useState("A");
  const [selectedDate, setSelectedDate] = useState("");

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

  const toggleResultSelection = (studentID) => {
    setSelectedResults((prevSelectedResults) => ({
      ...prevSelectedResults,
      [studentID]: !prevSelectedResults[studentID],
    }));
  };

  const handleResultItemClick = (result) => {
    toggleResultSelection(result.StudentID);
  };

  const handleSubmit = async () => {
    // Convert the selectedDate from BS to AD
    const bsDate = new BikramSambat(selectedDate); // Assuming selectedDate is in 'YYYY-MM-DD' format
    const adDate = bsDate.toAD(); // Converts to JavaScript Date object
    const formattedADDate = adDate.toISOString().split("T")[0]; // Format AD date to 'YYYY-MM-DD'

    const attendanceData = Object.keys(selectedResults)
      .filter((key) => selectedResults[key])
      .map((studentID) => ({
        StudentID: studentID,
        Date: formattedADDate, // Use the converted AD date
        Time: "09:50 AM", // Hardcoded time
      }));

    try {
      // Send each attendance record to the server
      const promises = attendanceData.map((data) =>
        fetch("http://ec2-3-108-238-64.ap-south-1.compute.amazonaws.com/test", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
      );

      // Wait for all requests to complete
      const responses = await Promise.all(promises);

      // Optionally, check the response of each request
      responses.forEach(async (response, index) => {
        if (response.ok) {
          console.log(
            `Attendance for student ${attendanceData[index].StudentID} recorded successfully.`
          );
        } else {
          // Handle errors or unsuccessful responses
          console.error(
            `Error recording attendance for student ${attendanceData[index].StudentID}.`
          );
        }
      });
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error("Error sending attendance data:", error);
    }
  };

  return (
    <div className="manualAttendanceBackdrop">
      <Wrapper className="ManualPopUpContainer" ref={popupRef}>
        <Wrapper className="ManualPopUpHeader">
          <RefreshIcon className="RefreshIcon" />
          <span className="ManualPopUpHeaderText">Manual Attendance</span>
          <CloseIcon className="CloseIcon" onClick={onClose} />
        </Wrapper>
        <Wrapper className="ManualPopUpSearchBar">
          <ManualSearchBar onSelect={setSearchResults} />
        </Wrapper>
        <Wrapper className="ManualPopUpFooter">
          <label>Class</label>
          <select
            value={classSelection}
            onChange={(e) => setClassSelection(e.target.value)}
          >
            <option value="1">1</option>
            {/* ... other class options */}
          </select>
          <label>Section</label>
          <select
            value={sectionSelection}
            onChange={(e) => setSectionSelection(e.target.value)}
          >
            <option value="A">A</option>
            {/* ... other section options */}
          </select>
          <SingleDatePicker onDateSelect={setSelectedDate} />
        </Wrapper>
        <Wrapper className="pop-up-body">
          <div className="manual-search-results">
            {searchResults.map((result, index) => (
              <div
                key={index}
                className="search-result-item"
                onClick={() => handleResultItemClick(result)}
              >
                <Wrapper className="ManualStudentProfile">
                  <ProfilePictureIcon className="ProfilePictureIcon" />
                  <label
                    htmlFor={`checkbox-${result.StudentID}`}
                    className="manual-label"
                  >
                    {result.StudentName}
                  </label>
                </Wrapper>
                <input
                  type="checkbox"
                  id={`checkbox-${result.StudentID}`}
                  className="manual-checkbox"
                  checked={!!selectedResults[result.StudentID]}
                  onChange={() => toggleResultSelection(result.StudentID)}
                />
              </div>
            ))}
          </div>
        </Wrapper>

        <button className="ManualAttendanceSubmit" onClick={handleSubmit}>
          Submit
        </button>
      </Wrapper>
    </div>
  );
};

export default ManualAttendance;
