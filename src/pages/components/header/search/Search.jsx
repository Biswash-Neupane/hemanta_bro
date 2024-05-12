import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Search.css";
import Wrapper from "../../wrapper/Wrapper";
import { useSelectedResult } from "./SelectedResultContext"; // Ensure this path is correct

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const { setSelectedResult } = useSelectedResult(); // Adjusted according to context changes
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      if (searchTerm) {
        try {
          const response = await axios.get(
            `http://ec2-3-108-238-64.ap-south-1.compute.amazonaws.com/api/search/students/${searchTerm}`
          );
          setResults(response.data);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      } else {
        setResults([]);
      }
    };

    fetchResults();
  }, [searchTerm]);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("click", handleDocumentClick, true);

    return () =>
      document.removeEventListener("click", handleDocumentClick, true);
  }, []);

  const handleSelectResult = (result) => {
    setSelectedResult(result.StudentName); // Updates the context
    console.log(result);
    navigate("/Student-Report", { state: { result } });
    setIsFocused(false);
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
          onFocus={() => setIsFocused(true)}
        />
      </div>
      {isFocused && results.length > 0 && (
        <div className="search-results">
          <div className="close-btn" onClick={() => setIsFocused(false)}>
            ×
          </div>
          {results.map((result, index) => (
            <div key={index} onClick={() => handleSelectResult(result)}>
              {result.StudentName}
            </div>
          ))}
        </div>
      )}
    </Wrapper>
  );
};

export default SearchBar;
