import React from "react";
import "./PopupComponent.css"; // Make sure to create this CSS file for styling

const PopupComponent = ({ children, closePopup }) => {
  return (
    <div className="popupOverlay">
      <div className="popupContent">
        <button className="closeButton" onClick={closePopup}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default PopupComponent;
