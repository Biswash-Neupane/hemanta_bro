import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Wrapper from "../../wrapper/Wrapper";
import HomeDateTypeSelectorButton from "./HomeDateTypeSelectorButton";
import NepaliDate from "nepali-date-converter";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      align: "end",
    },
    // title: {
    //   display: true,
    //   text: "Student Attendance Statistics",
    // },
  },
  scales: {
    y: {
      title: {
        display: true,
        text: "Number of Students",
      },
    },
    x: {
      title: {
        display: true,
        text: "Date",
      },
    },
  },
};

const dateOptions = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" }, // New category
];

const getCurrentNepaliDate = () => {
  const today = new NepaliDate();
  return {
    year: today.getYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
  };
};

const generateLabels = (dateType, currentDate) => {
  if (!currentDate) {
    return [];
  }
  if (dateType === "daily") {
    // Adjusted for last 7 days
    return Array.from({ length: 7 }, (_, i) => {
      let date = new NepaliDate(
        currentDate.year,
        currentDate.month - 1,
        currentDate.day
      );
      date.setDate(date.getDate() - 6 + i);
      return `${date.getMonth() + 1}-${date
        .getDate()
        .toString()
        .padStart(2, "0")}`;
    });
  } else if (dateType === "yearly") {
    // Nepali calendar months
    return [
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
  } else if (dateType === "monthly") {
    // Generate labels for the current month
    return Array.from(
      { length: 30 },
      (_, i) => `${currentDate.month}-${(i + 1).toString().padStart(2, "0")}`
    );
  }
  // Weekly labels remain the same
  return [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
};

const totalStudents = 1596;

const calculateAbsentStudents = () =>
  (Math.floor(Math.random() * (10 - 5 + 1) + 5) * totalStudents) / 100;
const calculateOnLeaveStudents = () =>
  (Math.floor(Math.random() * (15 - 7 + 1) + 7) * totalStudents) / 100;

// const totalStudents = 1596;
const getAbsentStudents = () =>
  Math.floor(
    Math.random() * (totalStudents * 0.1 - totalStudents * 0.05) +
      totalStudents * 0.05
  );
const getOnLeaveStudents = () =>
  Math.floor(
    Math.random() * (totalStudents * 0.15 - totalStudents * 0.07) +
      totalStudents * 0.07
  );

const staticData = {
  daily: {
    labels: [], // These will be set dynamically
    datasets: [
      {
        label: "Present Students",
        data: Array.from(
          { length: 7 },
          () => totalStudents - getAbsentStudents() - getOnLeaveStudents()
        ),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Absent Students",
        data: Array.from({ length: 7 }, getAbsentStudents),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "On Leave Students",
        data: Array.from({ length: 7 }, getOnLeaveStudents),
        borderColor: "rgb(255, 205, 86)",
        backgroundColor: "rgba(255, 205, 86, 0.5)",
        tension: 0.4,
        fill: true,
      },
    ],
  },
  weekly: {
    labels: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    datasets: [
      {
        label: "Present Students",
        data: Array.from(
          { length: 7 },
          () => totalStudents - getAbsentStudents() - getOnLeaveStudents()
        ),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Absent Students",
        data: Array.from({ length: 7 }, getAbsentStudents),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "On Leave Students",
        data: Array.from({ length: 7 }, getOnLeaveStudents),
        borderColor: "rgb(255, 205, 86)",
        backgroundColor: "rgba(255, 205, 86, 0.5)",
        tension: 0.4,
        fill: true,
      },
    ],
  },
  monthly: {
    labels: [], // These will be set dynamically
    datasets: [
      {
        label: "Present Students",
        data: Array.from(
          { length: 30 },
          () => totalStudents - getAbsentStudents() - getOnLeaveStudents()
        ),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Absent Students",
        data: Array.from({ length: 30 }, getAbsentStudents),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "On Leave Students",
        data: Array.from({ length: 30 }, getOnLeaveStudents),
        borderColor: "rgb(255, 205, 86)",
        backgroundColor: "rgba(255, 205, 86, 0.5)",
        tension: 0.4,
        fill: true,
      },
    ],
  },
  yearly: {
    labels: [
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
    ],
    datasets: [
      {
        label: "Present Students",
        data: Array.from(
          { length: 12 },
          () => totalStudents - getAbsentStudents() - getOnLeaveStudents()
        ),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Absent Students",
        data: Array.from({ length: 12 }, getAbsentStudents),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "On Leave Students",
        data: Array.from({ length: 12 }, getOnLeaveStudents),
        borderColor: "rgb(255, 205, 86)",
        backgroundColor: "rgba(255, 205, 86, 0.5)",
        tension: 0.4,
        fill: true,
      },
    ],
  },
};

const HomeLineGraph = () => {
  const [currentDate, setCurrentDate] = useState(null);
  const [dateType, setDateType] = useState("daily");

  useEffect(() => {
    setCurrentDate(getCurrentNepaliDate());
  }, []);

  useEffect(() => {
    if (currentDate) {
      setChartData({
        ...staticData[dateType],
        labels: generateLabels(dateType, currentDate),
      });
    }
  }, [dateType, currentDate]);

  // Initialize chartData with empty labels to avoid errors
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const handleDateTypeChange = (selectedOption) => {
    setDateType(selectedOption.value);
  };

  return (
    <Wrapper className="home-line-graph">
      <HomeDateTypeSelectorButton
        defaultValue={dateOptions[0]}
        onChange={handleDateTypeChange}
        dateOptions={dateOptions}
      />
      <Line options={options} data={chartData} />
    </Wrapper>
  );
};

export default HomeLineGraph;
