import React from "react";
import "./RadioButtonGroup.css";

function RadioButtonGroup({ category, options, selectedOption, onChange }) {
  return (
    <div className="radio-group">
      {options.map((option, index) => {
        return (
          <div className="radio-button" key={option}>
            <input
              className="radio-icon"
              type="radio"
              id={option}
              name={category}
              value={option}
              onChange={(args) => {
                onChange(args.target.name, args.target.value);
              }}
              checked={selectedOption === option}
            />
            <label htmlFor={option}>{option}</label>
            <br />
          </div>
        );
      })}
    </div>
  );
}

export default RadioButtonGroup;
