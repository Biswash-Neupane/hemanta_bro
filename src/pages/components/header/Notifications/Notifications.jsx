import React from "react";
import "./Notifications.css";

const Notification = () => {
  return (
    <button className="notification-button">
      <svg
        className="notification-logo"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M18 8c0-3.31-2.69-6-6-6s-6 2.69-6 6c0 7-3 9-3 9h18c0 0-3-2-3-9z"></path>
        <path d="M13.73 21a1.999 1.999 0 0 1-3.46 0"></path>
      </svg>
    </button>
  );
};

export default Notification;
