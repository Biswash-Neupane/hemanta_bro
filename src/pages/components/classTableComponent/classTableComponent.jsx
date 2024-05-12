import React from "react";
import "./classTableComponent.css";

const processAttendanceRecords = (students) => {
  // Initialize an empty object to hold aggregated data
  const attendanceByDate = {};

  // Loop through all students and their attendance records
  students.forEach((student) => {
    student.Attendance.forEach((attendanceRecord) => {
      const { date, status } = attendanceRecord;

      // If the date doesn't exist in our aggregation object, initialize it
      if (!attendanceByDate[date]) {
        attendanceByDate[date] = { present: 0, absent: 0, onLeave: 0 };
      }

      // Increment the count based on the attendance status
      switch (status) {
        case "present":
          attendanceByDate[date].present++;
          break;
        case "absent":
          attendanceByDate[date].absent++;
          break;
        case "on leave":
          attendanceByDate[date].onLeave++;
          break;
        default:
          break;
      }
    });
  });

  return attendanceByDate;
};

const ClassAttendanceTable = ({ students }) => {
  // Determine if the Attendance array has only one element for every student
  const singleAttendance = students.every(
    (student) => student.Attendance.length === 1
  );

  if (!singleAttendance) {
    const attendanceByDate = processAttendanceRecords(students);
    const dates = Object.keys(attendanceByDate);

    return (
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Total Present Students</th>
            <th>Total Absent Students</th>
            <th>Total On Leave Students</th>
          </tr>
        </thead>
        <tbody>
          {dates.map((date, index) => (
            <tr key={index}>
              <td>{date}</td>
              <td>{attendanceByDate[date].present}</td>
              <td>{attendanceByDate[date].absent}</td>
              <td>{attendanceByDate[date].onLeave}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else {
    // Render the table for individual attendance records
    return (
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Date</th>
            <th>Student Name</th>
            <th>Attendance Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.StudentID}</td>
              <td>{student.Attendance[0].date}</td>
              <td>{student.StudentName}</td>
              <td>{student.Attendance[0].status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
};

export default ClassAttendanceTable;
