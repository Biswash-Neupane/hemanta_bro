import React, { createContext, useContext, useState } from "react";

const SelectedResultContext = createContext();

export const useSelectedResult = () => useContext(SelectedResultContext);

export const SelectedResultProvider = ({ children }) => {
  const [selectedResult, setSelectedResult] = useState(null);

  const updateSelectedResult = (value) => {
    // Assuming you might need to adjust the logic for what constitutes needing "C" prepended
    const shouldPrependC = /^Class \d+/.test(value);
    const newValue = shouldPrependC ? `C${value}` : value;

    console.log(`Setting selectedResult with value: ${newValue}`);
    setSelectedResult(newValue);
  };

  return (
    <SelectedResultContext.Provider
      value={{ selectedResult, setSelectedResult: updateSelectedResult }}
    >
      {children}
    </SelectedResultContext.Provider>
  );
};
