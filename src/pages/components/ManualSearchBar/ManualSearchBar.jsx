import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ManualSearchBar.css";
import Wrapper from "../wrapper/Wrapper";

const ManualSearchBar = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("B"); // Initialize searchTerm with an empty string
  const searchRef = useRef(null);

  useEffect(() => {
    // Debounce the search to avoid excessive requests during typing
    const delayDebounceFn = setTimeout(() => {
      const fetchResults = async () => {
        if (searchTerm) {
          try {
            const response = await axios.get(
              `http://ec2-3-108-238-64.ap-south-1.compute.amazonaws.com/api/search/students/${searchTerm}`
            );
            // Now, instead of extracting just the StudentName, pass the entire student object
            onSelect(response.data); // Pass the full student objects to the parent component
          } catch (error) {
            console.error("Error fetching search results:", error);
          }
        } else {
          onSelect([]); // Clear results if searchTerm is emptied
        }
      };

      fetchResults();
    }, 300); // 300ms delay

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, onSelect]);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        onSelect([]); // Clear results when clicking outside of the component
      }
    };

    document.addEventListener("click", handleDocumentClick, true);
    return () =>
      document.removeEventListener("click", handleDocumentClick, true);
  }, [onSelect]);

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
      </div>
    </Wrapper>
  );
};

export default ManualSearchBar;
