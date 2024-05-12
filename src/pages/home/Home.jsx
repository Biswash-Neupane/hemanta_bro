import React, { useState, useEffect } from "react";
import "./Home.css";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import AttendanceCard from "../components/attendance-card/home-attendance-card/AttendanceCard";
import Wrapper from "../components/wrapper/Wrapper";
import HomeStackedBarChart from "../components/attendance-card/home-stacked-bar-chart/home-stacked-bar-chart";
import HomeLineGraph from "../components/attendance-card/home-line-graph/HomeLineGraph";
import PresentCount from "../components/reportPageCard/reportPageCard";
import DummyCalendarSelector from "../components/calendar-page-component/calendar-page-component";
import DateRangeSelector from "../components/DateRangeSelector/DateRangeSelector";
import ChatComponent from "../live/live";

const Home = () => {
  const [attendanceData, setAttendanceData] = useState({
    present: 0,
    absent: 0,
    onLeave: 0,
    presentOffset: "",
    absentOffset: "",
    onLeaveOffset: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const startDate = "2080-12-10"; // Ensure these dates are correct and relevant to your application
    const endDate = "2080-12-10"; // Ensure these dates are correct and relevant to your application
    const url = `http://ec2-3-108-238-64.ap-south-1.compute.amazonaws.com/api/home/data2?startDate=${startDate}&endDate=${endDate}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAttendanceData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Wrapper className="home-container">
      <Header className="home-header" />
      <Sidebar className="home-sidebar" />
      <Wrapper className="home-body">
        <DateRangeSelector></DateRangeSelector>
        <Wrapper className="home-row-1">
          <AttendanceCard
            AttendanceCardName="Present Stds"
            AttendanceCardValue={attendanceData.present}
            AttendanceCardTrendIcon=""
            AttendanceCardTrendValue={attendanceData.presentOffset}
            GraphColor="#B3FFB3"
          />
          <AttendanceCard
            AttendanceCardName="Absent Stds"
            AttendanceCardValue={attendanceData.absent}
            AttendanceCardTrendIcon=""
            AttendanceCardTrendValue={attendanceData.absentOffset}
            GraphColor="#FFB3B3"
          />
          <AttendanceCard
            AttendanceCardName="On Leave"
            AttendanceCardValue={attendanceData.onLeave}
            AttendanceCardTrendIcon=""
            AttendanceCardTrendValue={attendanceData.onLeaveOffset}
            GraphColor="#B3B3FF"
          />
        </Wrapper>

        <HomeStackedBarChart />
        <ChatComponent />
        {/* Ensure that HomeLineGraph and PresentCount are supposed to not be included as they were in the initial component structure but not used */}
      </Wrapper>
    </Wrapper>
  );
};

export default Home;
