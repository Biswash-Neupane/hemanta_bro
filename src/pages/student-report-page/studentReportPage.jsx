import React, { useState, useEffect } from "react";
import axios from "axios";
import "./studentReportPage.css";
import CircularProgressBar from "../components/reportPageCard/reportPageCard";
import Wrapper from "../components/wrapper/Wrapper";
import ReportPageCardWithIcon from "../components/report-page-card-with-icon/reportPageCardWIthIcon";
import LateStudentsIcon from "../components/SVGs/LateStudentsIcon";
import StudentLostIcon from "../components/SVGs/StudentLostIcon";
import IDForgotIcon from "../components/SVGs/IDForgotIcon";
import { useSelectedResult } from "../components/header/search/SelectedResultContext";
import ClassAttendanceTable from "../components/classTableComponent/classTableComponent";
import DateRangeCalendar from "../components/report-custom-date-filter/report-double-custom-date-filer";
import SingleDatePicker from "../components/report-custom-date-filter/report-single-custom-date-filter";

const ClassReportPage = ({ start, end }) => {
  const { selectedResult } = useSelectedResult();
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [studentData, setStudentData] = useState([]);
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

  const parseResult = (result) => {
    const match = result.match(/^(zzClass \d+) (\w+)$/);
    return match ? { ClassName: match[1], SectionName: match[2] } : null;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedStartDate || !selectedEndDate || !selectedResult) {
        console.log("Required data not available for API call.");
        return;
      }

      const parsedResult = parseResult(selectedResult);
      if (!parsedResult) {
        console.log("Parsed result is null. Check selectedResult format.");
        return;
      }

      try {
        const response = await axios.post(
          "http://ec2-3-108-238-64.ap-south-1.compute.amazonaws.com/api/Student-Report-Class",
          {
            ClassName: parsedResult.ClassName.substring(2),
            SectionName: parsedResult.SectionName,
            StartDate: selectedStartDate,
            EndDate: selectedEndDate,
          }
        );
        setStudentData(response.data);

        // Calculate and update attendance counts
        const counts = { present: 0, absent: 0, onLeave: 0 };
        response.data.forEach((student) => {
          student.Attendance.forEach((record) => {
            counts[record.status.replace(" ", "")] += 1;
          });
        });
        setAttendanceCounts(counts);
      } catch (error) {
        console.error("Error fetching the student data:", error);
      }
    };

    fetchData();
  }, [selectedStartDate, selectedEndDate, selectedResult]);

  const total =
    attendanceCounts.present +
    attendanceCounts.absent +
    attendanceCounts.onLeave;
  const presentProgress =
    Math.round((attendanceCounts.present / total) * 100) || 0;
  const absentProgress =
    Math.round((attendanceCounts.absent / total) * 100) || 0;
  const onLeaveProgress =
    Math.round((attendanceCounts.onLeave / total) * 100) || 0;

  return (
    <Wrapper className="class-report-card-container">
      <Wrapper className="main-cards-row0">
        <DateRangeCalendar
          singleDatePicker={
            <SingleDatePicker onDateSelect={handleDateSelect} />
          }
          onDateRangeSelect={handleDateRangeSelect}
        />
      </Wrapper>
      <Wrapper className="main-cards-row1">
        <CircularProgressBar
          size={120}
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
          size={120}
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
          size={120}
          progress={onLeaveProgress}
          strokeWidth={10}
          baseColor="#e6e6e6"
          progressColor="#FAD02E"
          count={attendanceCounts.onLeave}
          textContent={"On Leave"}
          textContentSize={1.5}
          valueSize={2}
        />
      </Wrapper>
      <Wrapper className="main-cards-row2">
        {/* Placeholders for ReportPageCardWithIcon components /}
        {/ These can be updated or filled in as needed based on your application's functionality */}
      </Wrapper>
      <ClassAttendanceTable students={studentData}></ClassAttendanceTable>
    </Wrapper>
  );
};

export default ClassReportPage;
