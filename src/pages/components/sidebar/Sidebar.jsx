import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import LibraryIcon from "../SVGs/LibraryIcon";

const Sidebar = (props) => {
  let sidebarClasses = `sidebar ${props.className}`;
  // State to hold school information
  const [schoolInfo, setSchoolInfo] = useState({
    SchoolName: "",
    SchoolID: "",
    TotalStudents: 0,
    TotalStaffs: 0,
  });

  useEffect(() => {
    const baseUrl = "http://ec2-3-108-238-64.ap-south-1.compute.amazonaws.com";
    const fetchSchoolInfo = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/home/data1`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSchoolInfo(data);
      } catch (error) {
        console.error("There was a problem with fetching school info:", error);
      }
    };

    fetchSchoolInfo();
  }, []);
  return (
    <div className={sidebarClasses}>
      <div className="sidebar-header">
        <img
          className="school-profile-picture"
          src="/school-1.jpg"
          alt="School-Picture"
        />

        <span className="school-name">{schoolInfo.SchoolName}</span>
        <span className="school-id">#{schoolInfo.SchoolID}</span>
        <button className="edit-btn">EDIT</button>
      </div>
      <div className="stats-box">
        <div className="stats">
          <div className="students">
            <span className="stats-students-title">Students</span>
            <span className="stats-students-value">
              {schoolInfo.TotalStudents}
            </span>
          </div>
          <div className="staff">
            <span className="stats-staffs-title">Staffs</span>
            <span className="stats-staffs-value">{schoolInfo.TotalStaffs}</span>
          </div>
        </div>
      </div>

      <nav className="navigation">
        <NavLink exact to="/Home" activeClassName="active">
          <svg
            width="37.5" // 25 * 1.5
            height="37.5" // 25 * 1.5
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 40 L50 10 L90 40 V90 H60 V60 H40 V90 H10 Z"
              fill="none"
              stroke="black"
              stroke-width="3.5"
            />
          </svg>
          Home
        </NavLink>

        <NavLink to="/calendar" activeClassName="active">
          <svg
            width="37.5" // 25 * 1.5
            height="37.5" // 25 * 1.5
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="10"
              y="20"
              width="80"
              height="70"
              fill="none"
              stroke="black"
              stroke-width="3.5"
            />
            <line
              x1="10"
              y1="40"
              x2="90"
              y2="40"
              stroke="black"
              stroke-width="3.5"
            />
            <line
              x1="10"
              y1="55"
              x2="90"
              y2="55"
              stroke="black"
              stroke-width="3.5"
            />
            <line
              x1="10"
              y1="70"
              x2="90"
              y2="70"
              stroke="black"
              stroke-width="3.5"
            />
            <rect
              x="20"
              y="10"
              width="10"
              height="10"
              fill="none"
              stroke="black"
              stroke-width="3.5"
            />
            <rect
              x="70"
              y="10"
              width="10"
              height="10"
              fill="none"
              stroke="black"
              stroke-width="3.5"
            />
          </svg>
          Calendar
        </NavLink>

        <NavLink to="/sms" activeClassName="active">
          <svg
            width="37.5" // 25 * 1.5
            height="37.5" // 25 * 1.5
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 20 H80 V70 H50 L30 90 L30 70 H20 Z"
              fill="none"
              stroke="black"
              stroke-width="3.5"
            />
          </svg>
          SMS
        </NavLink>

        <NavLink to="/tools" activeClassName="active">
          <svg
            width="37.5px" // 25px * 1.5
            height="37.5px" // 25px * 1.5
            viewBox="0 0 48 48"
          >
            <defs>
              <style>{`.cls-1{fill:none;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.5;}`}</style>
            </defs>
            <path
              className="cls-1"
              d="M39.23,26a16.52,16.52,0,0,0,.14-2,16.52,16.52,0,0,0-.14-2l4.33-3.39a1,1,0,0,0,.25-1.31l-4.1-7.11a1,1,0,0,0-1.25-.44l5.11,2.06a15.68,15.68,0,0,0-3.46-2l-.77-5.43a1,1,0,0,0-1-.86H19.9a1,1,0,0,0-1,.86l-.77,5.43a15.36,15.36,0,0,0-3.46,2L9.54,9.75a1,1,0,0,0-1.25.44L4.19,17.3a1,1,0,0,0,.25,1.31L8.76,22a16.66,16.66,0,0,0-.14,2,16.52,16.52,0,0,0,.14,2L4.44,29.39a1,1,0,0,0-.25,1.31l4.1,7.11a1,1,0,0,0,1.25.44l5.11-2.06a15.68,15.68,0,0,0,3.46,2l.77,5.43a1,1,0,0,0,1,.86h8.2a1,1,0,0,0,1-.86l.77-5.43a15.36,15.36,0,0,0,3.46-2l5.11,2.06a1,1,0,0,0,1.25-.44l4.1-7.11a1,1,0,0,0-.25-1.31ZM24,31.18A7.18,7.18,0,1,1,31.17,24,7.17,7.17,0,0,1,24,31.18Z"
            />
          </svg>
          Tools
        </NavLink>
        <NavLink to="/Library" activeClassName="active">
          <LibraryIcon />
          Library
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
