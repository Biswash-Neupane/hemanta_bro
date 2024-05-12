import React, { useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios"; // Ensure axios is installed
import "./markAsHoliday.css";

// Modify the component to accept date, onMarkAsHoliday, and onMarkedAsHoliday props
const HolidayMarker = ({ date, onMarkAsHoliday, onMarkedAsHoliday }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Modified handleMarkAsHoliday to send a POST request
  const handleMarkAsHoliday = async () => {
    console.log("Attempting to mark as holiday");
    try {
      const response = await axios.post(
        "http://ec2-3-108-238-64.ap-south-1.compute.amazonaws.com/api/school/mark-holiday",
        { date },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
      onMarkedAsHoliday(date);
    } catch (error) {
      console.error("Error making POST request:", error);
    }
    handleClose();
  };
  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className="iconButton"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleMarkAsHoliday}>Mark as a holiday</MenuItem>
      </Menu>
    </div>
  );
};

export default HolidayMarker;
