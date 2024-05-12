import React, { useState, useEffect } from "react";
import axios from "axios";
import "./classReportPage.css";
import CircularProgressBar from "../components/reportPageCard/reportPageCard";
import Wrapper from "../components/wrapper/Wrapper";
import DateRangeCalendar from "../components/report-custom-date-filter/report-double-custom-date-filer";
import SingleDatePicker from "../components/report-custom-date-filter/report-single-custom-date-filter";
import { useSelectedResult } from "../components/header/search/SelectedResultContext"; // Adjust the path as necessary

const StudentReportPage = () => {
  const { selectedResult } = useSelectedResult(); // Use the context to get the selected search result
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [attendanceDetails, setAttendanceDetails] = useState([]);
  const [attendanceCounts, setAttendanceCounts] = useState({
    present: 0,
    absent: 0,
    onLeave: 0,
  });

  const handleDateRangeSelect = (startDate, endDate) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
  };

  const handleDateSelect = (date) => {
    setSelectedStartDate(date);
    setSelectedEndDate(date);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://ec2-3-108-238-64.ap-south-1.compute.amazonaws.com/api/getStudentInfo", // Ensure this matches your API endpoint
          {
            Start_Date: selectedStartDate.replace(/ - /g, "-"), // Corrected date format, dynamically using state
            End_Date: selectedEndDate.replace(/ - /g, "-"), // Corrected date format, dynamically using state
            Student_Name: selectedResult || "Default Student", // Use the selectedResult as Student_Name
          }
        );

        if (response.data && response.data.length > 1) {
          setAttendanceCounts({
            present: response.data[0]["Total Present Counts"],
            absent: response.data[0]["Total Absent Counts"],
            onLeave: response.data[0]["Total On-Leave Counts"],
          });
          setAttendanceDetails(response.data[1]);
        }
      } catch (error) {
        console.error(
          "There was an error fetching the student information:",
          error
        );
        // Handle error appropriately in your UI as well
      }
    };

    fetchData();
  }, [selectedStartDate, selectedEndDate, selectedResult]);

  const total =
    attendanceCounts.present +
    attendanceCounts.absent +
    attendanceCounts.onLeave;
  const presentProgress =
    total > 0 ? Math.round((attendanceCounts.present / total) * 100) : 0;
  const absentProgress =
    total > 0 ? Math.round((attendanceCounts.absent / total) * 100) : 0;
  const onLeaveProgress =
    total > 0 ? Math.round((attendanceCounts.onLeave / total) * 100) : 0;

  return (
    <Wrapper className="students-report-card-container">
      <Wrapper className="students-report-main-cards-row0">
        <DateRangeCalendar
          singleDatePicker={
            <SingleDatePicker onDateSelect={handleDateSelect} />
          }
          onDateRangeSelect={handleDateRangeSelect}
        />
      </Wrapper>
      <Wrapper className="students-report-main-cards-row1">
        <CircularProgressBar
          size={100}
          progress={presentProgress}
          strokeWidth={10}
          baseColor="#e6e6e6"
          progressColor="#38FA90"
          count={attendanceCounts.present}
          textContent={"Present Count"}
          textContentSize={1.5}
          valueSize={2}
        />
        <CircularProgressBar
          size={100}
          progress={absentProgress}
          strokeWidth={10}
          baseColor="#e6e6e6"
          progressColor="#FF8E76"
          count={attendanceCounts.absent}
          textContent={"Absent Count"}
          textContentSize={1.5}
          valueSize={2}
        />
        <CircularProgressBar
          size={100}
          progress={onLeaveProgress}
          strokeWidth={10}
          baseColor="#e6e6e6"
          progressColor="#FF8E76"
          count={attendanceCounts.onLeave}
          textContent={"On Leave"}
          textContentSize={1.5}
          valueSize={2}
        />
      </Wrapper>
      <Wrapper className="main-cards-row2">
        {/* Ensure components here also react to changes appropriately */}
      </Wrapper>
      <ClassAttendanceTable students={attendanceDetails} />
    </Wrapper>
  );
};

export default StudentReportPage;

const ClassAttendanceTable = ({ students }) => {
  return (
    <table className="attendance-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Attendance Status</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {students.map((record, index) => (
          <tr key={index}>
            <td>{record.Date}</td>
            <td>{record.AttendanceStatus}</td>
            <td>{record.Time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
