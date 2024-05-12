import React, { useEffect, useState } from "react";
import { useSelectedResult } from "../components/header/search/SelectedResultContext";
import StudentReportPage from "../class-report-page/classReportPage";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import Wrapper from "../components/wrapper/Wrapper";
import "./Report.css";
import ClassReportPage from "../student-report-page/studentReportPage";

// Placeholder component for loading and error states, adjust as needed
const Loading = () => <div>Loading...</div>;
const Error = ({ error }) => <div>Error: {error.message}</div>;

const ReportPage = () => {
  const { selectedResult } = useSelectedResult();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Example useEffect, adjust to your actual needs
  useEffect(() => {
    setIsLoading(true);
    // Simulate data fetching or other setup tasks
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle loading and error states, adjust according to your needs
  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;

  // Determine which component to render based on the selectedResult
  const shouldRenderClassReportPage =
    selectedResult && selectedResult.startsWith("zz");
  const ComponentToRender = shouldRenderClassReportPage
    ? ClassReportPage
    : StudentReportPage;
  return (
    <Wrapper className="report-page-container">
      <Header className="report-page-header" />
      <Sidebar className="report-page-sidebar" />
      <Wrapper className="report-page-body">
        <ComponentToRender />
      </Wrapper>
    </Wrapper>
  );
};

export default ReportPage;
