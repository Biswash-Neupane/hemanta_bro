import React from "react";
import Select from "react-select";
import "./HomeLineGraph.css";

const HomeDateTypeSelectorButton = ({
  dateOptions,
  defaultValue,
  onChange,
}) => {
  return (
    <Select
      defaultValue={defaultValue}
      onChange={onChange}
      options={dateOptions}
      className="home-date-type-selector-button"
    />
  );
};

export default HomeDateTypeSelectorButton;
