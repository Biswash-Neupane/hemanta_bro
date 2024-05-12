// EditDetails.js
import React, { useState, useRef, useEffect } from "react";
import "./EditDetails.css";
import RefreshIcon from "../SVGs/RefreshIcon";
import CloseIcon from "../SVGs/CloseIcon";
import SuperCardSearchBar from "../SuperCardSearchBar/SuperCardSearchBar";
import Wrapper from "../wrapper/Wrapper";

const EditDetails = ({ onClose }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [fullName, setFullName] = useState("");
  const [classSelection, setClassSelection] = useState("");
  const [sectionSelection, setSectionSelection] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [rollNo, setRollNo] = useState("");

  // State hooks for toggle buttons
  const [activeTab, setActiveTab] = useState("NEW_STUDENT");

  const popupRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleSubmit = () => {
    // TODO: Handle the submit action
  };

  return (
    <div className="EditDetailsBackdrop">
      <div className="EditDetailsContainer" ref={popupRef}>
        <div className="EditDetailsHeader">
          <RefreshIcon className="RefreshIcon" />
          <span className="EditDetailsHeaderText">Edit Details</span>
          <CloseIcon className="CloseIcon" onClick={onClose} />
        </div>
        <div className="SuperCardPopUpSearchBar popin">
          <SuperCardSearchBar onSelect={setSearchResults} />
          <div className="edit-details-search-results">
            {searchResults.map((result, index) => (
              <div key={index} className="search-result-item">
                <Wrapper className="SuperCardStudentProfile">
                  <label className="manual-label">{result}</label>
                </Wrapper>
              </div>
            ))}
          </div>
        </div>
        <div className="EditDetailsTabContainer">
          <button
            className={`EditDetailsTab ${
              activeTab === "NEW_STUDENT" ? "active" : ""
            }`}
            onClick={() => setActiveTab("NEW_STUDENT")}
          >
            NEW STUDENT
          </button>
          <button
            className={`EditDetailsTab ${
              activeTab === "EDIT_DETAIL" ? "active" : ""
            }`}
            onClick={() => setActiveTab("EDIT_DETAIL")}
          >
            EDIT DETAIL
          </button>
          <button
            className={`EditDetailsTab ${
              activeTab === "REMOVE_STUDENT" ? "active" : ""
            }`}
            onClick={() => setActiveTab("REMOVE_STUDENT")}
          >
            REMOVE STUDENT
          </button>
        </div>
        <form className="EditDetailsForm" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <select
            value={classSelection}
            onChange={(e) => setClassSelection(e.target.value)}
            required
          >
            <option value="" disabled>
              --select--
            </option>
            {/* Add class options here */}
          </select>
          <select
            value={sectionSelection}
            onChange={(e) => setSectionSelection(e.target.value)}
            required
          >
            <option value="" disabled>
              --select--
            </option>
            {/* Add section options here */}
          </select>
          <input
            type="text"
            placeholder="Contact Number"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="" disabled>
              --select--
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input
            type="text"
            placeholder="Roll no"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
          />
          <button type="submit" className="EditDetailsSubmit">
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDetails;
