import React from "react";
import "./toolsPageCard.css";

const ToolsPageCard = ({ icon, title, description, onClick }) => {
  return (
    <div className="toolsPageCard" onClick={onClick}>
      {icon}
      <div className="content">
        <h1 className="title">{title}</h1>
        <p className="description">{description}</p>
      </div>
    </div>
  );
};

export default ToolsPageCard;
