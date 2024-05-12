import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false, // This ensures the aspect ratio is maintained
  plugins: {
    legend: {
      position: "top",
      align: "end",
      labels: {
        pointStyle: "rect",
        usePointStyle: true,
      },
    },
  },
  scales: {
    x: {
      stacked: true,
      grid: { display: false },
    },
    y: {
      stacked: true,
      grid: { display: false },
    },
  },
};

// Async function to fetch attendance data from the API
const fetchAttendanceData = async () => {
  try {
    const response = await fetch(
      `http://ec2-3-108-238-64.ap-south-1.compute.amazonaws.com/api/attendance/summary?startDate=2080-12-10&endDate=2080-12-11`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch attendance data:", error);
    throw error; // Rethrow to handle it in the calling context
  }
};

const processData = (apiResponse) => {
  const classLabels = [];
  const presentData = [];
  const absentData = [];
  const leaveData = [];

  apiResponse.forEach((classItem) => {
    classItem.Sections.forEach((section) => {
      const label = `${classItem._id} ${section.Section}`;
      classLabels.push(label);
      // Initialize counters for each status for this section
      let presentCount = 0;
      let absentCount = 0;
      let leaveCount = 0;

      section.AttendanceDetails.forEach((detail) => {
        if (detail.Status === "present") {
          presentCount += detail.Count;
        } else if (detail.Status === "absent") {
          absentCount += detail.Count;
        } else if (detail.Status === "on leave") {
          leaveCount += detail.Count;
        }
      });

      // Push the aggregated counts to their respective arrays
      presentData.push(presentCount);
      absentData.push(absentCount);
      leaveData.push(leaveCount);
    });
  });
  console.log(classLabels, presentData, absentData, leaveData);
  return { classLabels, presentData, absentData, leaveData };
};

const HomeStackedBarChart = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const apiResponse = await fetchAttendanceData();
        const processedData = processData(apiResponse);

        setData({
          labels: processedData.classLabels,
          datasets: [
            {
              label: "Present",
              data: processedData.presentData,
              backgroundColor: "#B3FFB3",
            },
            {
              label: "Absent",
              data: processedData.absentData,
              backgroundColor: "#FFB3B3",
            },
            {
              label: "On Leave",
              data: processedData.leaveData,
              backgroundColor: "#B3B3FF",
            },
          ],
        });
        console.log(processedData.presentData);
        console.log(processedData.absentData);
        console.log(processedData.leaveData);
      } catch (error) {
        console.error("Error fetching or processing data:", error);
        setError(error.toString());
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ height: "33%" }}>
      {" "}
      {/* Adjusted the height to 25% */}
      <Bar options={options} data={data} />
    </div>
  );
};

export default HomeStackedBarChart;
