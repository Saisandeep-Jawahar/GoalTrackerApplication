import React, { useState } from "react";
import "./Drropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

function Dropdown({ options, value, onSelect, placeholder, disabled, onBlur }) {
  const [popup, setPopup] = useState(false);
  const [hoverElement, setHoverElement] = useState(null);
  const handleClick = () => {
    if (!disabled) {
      setPopup((preValue) => !preValue);
    }
  };
  const handleKeyPress = (args) => {
    if (!disabled) {
      if (
        args.code === "ArrowDown" ||
        args.which === 40 ||
        args.key === "ArrowDown"
      ) {
        args.preventDefault();
        if (popup) {
          setHoverElement((preValue) =>
            preValue === null || preValue === options.length - 1
              ? 0
              : preValue + 1
          );
        } else {
          handleClick();
        }
      } else if (
        args.code === "ArrowUp" ||
        args.which === 38 ||
        args.key === "ArrowUp"
      ) {
        args.preventDefault();
        if (popup) {
          setHoverElement((preValue) =>
            preValue === null || preValue === 0
              ? options.length - 1
              : preValue - 1
          );
        } else {
          handleClick();
        }
      } else if (
        args.which === 13 ||
        args.key === "Enter" ||
        args.code === "Enter"
      ) {
        onSelect(options[hoverElement]);
        handleClick();
      } else if (
        args.which === 27 ||
        args.key === "Escape" ||
        args.code === "Escape"
      ) {
        if (popup) {
          args.stopPropagation();
          handleClick();
        }
      }
    }
  };
  return (
    <div
      className={`dropdown ${disabled ? "disabled" : ""}`}
      tabIndex="0"
      onKeyDown={handleKeyPress}
      onClick={handleClick}
      onBlur={(args) => {
        setPopup(false);
        onBlur && onBlur();
      }}
    >
      <div className="selected">
        {!value && placeholder ? (
          <span className="placeholder">{placeholder}</span>
        ) : (
          ""
        )}
        {value}
      </div>
      <div className="icon">
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`font-icon ${popup ? "arrow-open" : "arrow-close"}`}
          size="lg"
        />
      </div>
      <div className={`options ${popup ? "show" : "hide"}`}>
        {options.map((item, index) => (
          <div
            key={item}
            id={index}
            className={`option ${hoverElement === index ? "hover" : ""}`}
            onClick={() => onSelect(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dropdown;
