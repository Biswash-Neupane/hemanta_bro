import React, { useState, useRef, useEffect } from "react";
import "./SuperCard.css";
import RefreshIcon from "../SVGs/RefreshIcon";
import CloseIcon from "../SVGs/CloseIcon";
import SuperCardSearchBar from "../SuperCardSearchBar/SuperCardSearchBar";
import SuperCardCancel from "../SVGs/SuperCardCancel";
import SuperCardAdd from "../SVGs/SuperCardAdd";

const Wrapper = React.forwardRef((props, ref) => (
  <div ref={ref} className={props.className}>
    {props.children}
  </div>
));

// Function to calculate days left
const calculateDaysLeft = (assignedDate) => {
  if (!assignedDate) return null;
  const currentDate = new Date();
  const dueDate = new Date(assignedDate);
  const timeDiff = dueDate.getTime() - currentDate.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysLeft >= 0 ? daysLeft : 0;
};

const Card = ({
  data,
  onSearchIconClick,
  onAddSuperCardClick,
  onCancelSuperCardClick, // Add a prop for handling cancel clicks
  isSelected,
  onTimePeriodChange,
}) => {
  const daysLeft = calculateDaysLeft(data["Assigned Date"]);

  // Handle the selection of a day period for unassigned cards
  const handleSelectChange = (event) => {
    onTimePeriodChange(data, event.target.value);
  };

  return (
    <div className={`card ${isSelected ? "selected" : ""}`}>
      {" "}
      <div className="card-name">{data.SuperCardName}</div>
      <div className="card-details">
        <div className="card-student-name">
          {data.AssignedStatus ? data.AssignedTo : "Not Assigned"}
        </div>
      </div>
      <div className="card-time-left">
        {data.AssignedStatus ? (
          <div>
            {daysLeft} day{daysLeft > 1 ? "s" : ""} left
          </div>
        ) : (
          <select defaultValue="" onChange={handleSelectChange}>
            <option value="" disabled>
              Choose days
            </option>
            <option value="3">3 days</option>
            <option value="5">5 days</option>
            <option value="7">7 days</option>
            <option value="10">10 days</option>
            <option value="15">15 days</option>
          </select>
        )}
      </div>
      <span className="card-status">
        {data.AssignedStatus ? (
          <SuperCardCancel
            className="icon red-icon"
            onClick={() => onCancelSuperCardClick(data)}
          />
        ) : (
          <SuperCardAdd
            className="icon green-icon"
            onClick={() => onAddSuperCardClick(data)}
          />
        )}
      </span>
    </div>
  );
};

const SuperCard = ({ onClose }) => {
  const popupRef = useRef();
  const searchInputRef = useRef();
  const [showSearch, setShowSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [cardsData, setCardsData] = useState([]);
  const [newSuperCard, setNewSuperCard] = useState(null);
  const [selectedSuperCard, setSelectedSuperCard] = useState(null);
  const [refreshToggle, setRefreshToggle] = useState(false);

  const handleCancelSuperCardClick = (data) => {
    const requestBody = {
      SuperCardID: data.SuperCardID,
      SuperCardName: data.SuperCardName,
      Task: "reset",
    };

    fetch(
      "http://ec2-3-108-238-64.ap-south-1.compute.amazonaws.com/api/supercard/reset",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Check if the response is in JSON format
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return response.json(); // If JSON, parse it and proceed
        } else {
          return response.text(); // If not JSON, just return text
        }
      })
      .then((data) => {
        console.log("Success:", data);
        // Handle success response, whether it was JSON or plain text
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleClickResult = (result) => {
    if (newSuperCard) {
      // Ensure there is a newSuperCard to update
      const updatedSuperCard = {
        ...newSuperCard,
        StudentName: result, // Update the StudentName of the newSuperCard
      };

      setNewSuperCard(updatedSuperCard); // Update the state with the modified card
      console.log(updatedSuperCard); // Optionally log the updated card
      setShowSearch(false); // Close the search bar after selecting a student
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://ec2-3-108-238-64.ap-south-1.compute.amazonaws.com/api/supercard"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCardsData(data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };

    fetchData();
  }, [refreshToggle]); // Add refreshToggle to the dependency array

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleRefreshClick = () => {
    setRefreshToggle((prev) => !prev); // Toggle the state to trigger a refresh
  };

  const handleAddSuperCardClick = (data) => {
    const superCard = {
      SuperCardID: data.SuperCardID,
      SuperCardName: data.SuperCardName,
      AssignedStatus: false,
      TimePeriod: data.TimePeriod || "3", // Default to 3 days if not set      StudentName: null,
      AssignedDate: null,
    };
    setNewSuperCard(superCard);
    setSelectedSuperCard(data.SuperCardID); // Use a unique identifier

    setShowSearch(true);
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 100);
  };

  const handleTimePeriodChange = (cardData, timePeriod) => {
    if (newSuperCard && cardData.SuperCardID === newSuperCard.SuperCardID) {
      setNewSuperCard({ ...newSuperCard, TimePeriod: timePeriod });
    }
  };

  const handleSubmit = async () => {
    const now = new Date().toISOString();

    if (newSuperCard) {
      // Check if there is a newSuperCard to update
      const updatedSuperCard = {
        ...newSuperCard,
        AssignedDate: now,
        AssignedStatus: true,
      };

      // Use fetch API to send the updatedSuperCard data to the server
      try {
        const response = await fetch(
          "http://ec2-3-108-238-64.ap-south-1.compute.amazonaws.com/api/update-super-card",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedSuperCard), // Convert the JavaScript object to a JSON string
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json(); // Assuming the server responds with JSON
        console.log("Success:", result); // Log the success response from the server
        setRefreshToggle((prev) => !prev); // Toggle the state to trigger a refresh

        // Additional logic after successful update could go here
        // For example, you might want to clear the form or update the UI to reflect the changes
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="SuperCardAttendanceBackdrop">
      <Wrapper className="SuperCardPopUpContainer" ref={popupRef}>
        <Wrapper className="SuperCardPopUpHeader">
          <RefreshIcon className="RefreshIcon" onClick={handleRefreshClick} />
          <span className="SuperCardPopUpHeaderText">Super Card</span>
          <CloseIcon className="CloseIcon" onClick={onClose} />
        </Wrapper>
        {showSearch && (
          <div className="SuperCardPopUpSearchBar popin">
            <SuperCardSearchBar
              onSelect={setSearchResults}
              onClickResult={handleClickResult} // Pass the handler to handle click on result
              ref={searchInputRef}
            />
            <div className="super-card-search-results">
              {searchResults.map((result, index) => (
                <div key={index} className="search-result-item">
                  <Wrapper className="SuperCardStudentProfile">
                    <label className="manual-label">{result}</label>
                  </Wrapper>
                </div>
              ))}
            </div>
          </div>
        )}
        <Wrapper className="super-card-pop-up-body">
          {cardsData.map((cardData, index) => (
            <Card
              key={index}
              data={cardData}
              isSelected={selectedSuperCard === cardData.SuperCardID}
              onCancelSuperCardClick={handleCancelSuperCardClick}
              onAddSuperCardClick={() => handleAddSuperCardClick(cardData)}
              onTimePeriodChange={handleTimePeriodChange}
            />
          ))}
        </Wrapper>
        <button className="SuperCardAttendanceSubmit" onClick={handleSubmit}>
          Submit
        </button>
      </Wrapper>
    </div>
  );
};

export default SuperCard;
