import React, { useState, useEffect, useRef } from "react";
import "./SuperCardSearchBar.css";
import axios from "axios";
import Wrapper from "../wrapper/Wrapper";

const SuperCardSearchBar = ({ onSelect, onClickResult }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]); // Maintains state for search results
  const searchRef = useRef(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (searchTerm) {
        try {
          const response = await axios.get(
            `http://ec2-3-108-238-64.ap-south-1.compute.amazonaws.com/api/search/students/${searchTerm}`
          );
          setSearchResults(response.data); // Assumes response.data is an array of objects { StudentName, StudentID }
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      } else {
        setSearchResults([]); // Clear results if searchTerm is emptied
      }
    };

    fetchResults();
  }, [searchTerm]);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        onSelect([]); // Optionally clear results or maintain current behavior
      }
    };

    document.addEventListener("click", handleDocumentClick, true);
    return () =>
      document.removeEventListener("click", handleDocumentClick, true);
  }, [onSelect]);

  const handleResultClick = (result) => {
    console.log(
      `Student Name: ${result.StudentName}, Student ID: ${result.StudentID}`
    ); // Log both StudentName and StudentID
    if (onClickResult) {
      onClickResult(result); // Call the provided onClickResult with the result object if needed
    }
  };

  return (
    <Wrapper className="main-search-container" ref={searchRef}>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for Student or Class"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="search-results">
          {searchResults.map((result, index) => (
            <div
              key={index}
              className="search-result-item"
              onClick={() => handleResultClick(result)}
            >
              {result.StudentName}
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default SuperCardSearchBar;
