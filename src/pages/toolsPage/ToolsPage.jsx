import React, { useState } from "react";
import "./toolspage.css";

// Icons
import ManualAttendanceIcon from "../components/SVGs/ManualAttendanceIcon";
import SuperCardIcon from "../components/SVGs/SuperCardIcon";
import EditDetailsIcon from "../components/SVGs/EditDetailsIcon";
import ShoppingCartIcon from "../components/SVGs/ShoppingCartIcon";
import AttendanceRankingIcon from "../components/SVGs/AttendanceRankingIcon";

// Components
import Wrapper from "../components/wrapper/Wrapper";
import ToolsPageCard from "../components/toolsPageCard/toolsPageCard";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";

import ManualAttendance from "../components/Manual Attendance/ManualAttendance";
import SuperCard from "../components/SuperCard/SuperCard";
import RankByAttendance from "../components/RankByAttendance/RankByAttendance";
import EditDetails from "../components/EditDetails/EditDetails";

const ToolsPage = () => {
  const [activePopup, setActivePopup] = useState(null);

  const handleToolClick = (toolName) => {
    console.log("done");
    setActivePopup(toolName);
  };

  return (
    <Wrapper className="toolsPageContainer">
      <Header className="tools-page-header" />
      <Sidebar className="toolsPageSidebar" />
      <Wrapper className="toolsPageBody">
        <Wrapper className="toolsCard">
          <h1 className="tools-page-title">Tools</h1>
          <ToolsPageCard
            icon={<ManualAttendanceIcon />}
            title="Manual Attendance"
            description="Edit attendance detail of students"
            onClick={() => handleToolClick("ManualAttendance")}
          />
          <ToolsPageCard
            icon={<SuperCardIcon />}
            title="Super Card"
            description="Assign and unassign supercard to students"
            onClick={() => handleToolClick("SuperCard")}
          />
          <ToolsPageCard
            icon={<ShoppingCartIcon />}
            title="Cart"
            description="Add stuffs to cart and do all other shits"
            onClick={() => handleToolClick("Cart")}
          />
          <ToolsPageCard
            icon={<EditDetailsIcon />}
            title="Edit Details"
            description="Add, remove, and edit student detail from database."
            onClick={() => handleToolClick("EditDetails")}
          />
          <ToolsPageCard
            icon={<AttendanceRankingIcon />}
            title="Rank By Attendance"
            description="Rank student's attendance both ascending and descending manner."
            onClick={() => handleToolClick("RankByAttendance")}
          />
        </Wrapper>
      </Wrapper>
      {/* Conditionally render pop-up components based on activePopup */}
      {activePopup === "ManualAttendance" && (
        <ManualAttendance onClose={() => setActivePopup(null)} />
      )}
      {activePopup === "SuperCard" && (
        <SuperCard onClose={() => setActivePopup(null)} />
      )}
      {activePopup === "RankByAttendance" && (
        <RankByAttendance onClose={() => setActivePopup(null)} />
      )}
      {activePopup === "EditDetails" && (
        <EditDetails onClose={() => setActivePopup(null)} />
      )}
    </Wrapper>
  );
};

export default ToolsPage;
