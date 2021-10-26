import React from "react";
import "./FilterButtons.css";

function FilterButtons({ selectedButton, updateSelectedButton }) {
  const getSelected = (buttonName) =>
    selectedButton === buttonName ? "selected" : "";

  return (
    <div className="filters">
      <button
        className={`filter-button ${getSelected("In-Progress")}`}
        onClick={() => updateSelectedButton("In-Progress")}
      >
        In-Progress
      </button>
      <button
        className={`filter-button ${getSelected("Completed")}`}
        onClick={() => updateSelectedButton("Completed")}
      >
        Completed
      </button>
      <button
        className={`filter-button ${getSelected("Draft")}`}
        onClick={() => updateSelectedButton("Draft")}
      >
        Draft
      </button>
    </div>
  );
}

export default FilterButtons;
