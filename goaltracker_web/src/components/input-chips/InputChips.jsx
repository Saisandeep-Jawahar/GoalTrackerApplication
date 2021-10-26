import React, { useRef, useState } from "react";
import { addNewTag } from "../../locale";
import { moveItem } from "../../validation";
import "./InputChips.css";

function InputChips({ tags, onChange, onBlur, options = [] }) {
  const [inputElementValue, setInputElementValue] = useState("");
  const [suggestionBoxItemIndex, setSuggestionBoxItemIndex] = useState(-1);
  const [showPopup, setShowPopup] = useState(true);
  const inputElement = useRef(null);

  let suggestionList = options.filter((item) =>
    item.toLowerCase().startsWith(inputElementValue.toLowerCase())
  );
  let showSuggestionBox = inputElementValue && suggestionList.length > 0;

  const onWrapperClick = (args) => {
    inputElement.current.focus();
  };

  const updateTags = (removableTag) => {
    let updatedTags = tags.filter((item) => item !== removableTag);
    onChange(updatedTags);
  };

  const handleKeyDown = (args) => {
    if (args.code === "Space" || args.key === "Space" || args.keyCode === 32) {
      args.preventDefault();
      if (inputElementValue !== "" && suggestionBoxItemIndex === -1) {
        let updatedTags = [...new Set([...tags, args.currentTarget.value])];
        setSuggestionBoxItemIndex(-1);
        setInputElementValue("");
        onChange(updatedTags);
      }
    } else if (
      inputElementValue === "" &&
      (args.code === "Backspace" ||
        args.key === "Backspace" ||
        args.keyCode === 8)
    ) {
      let updatedTags = [...tags];
      updatedTags.pop();
      onChange(updatedTags);
    } else if (
      args.code === "ArrowDown" ||
      args.which === 40 ||
      args.key === "ArrowDown"
    ) {
      args.preventDefault();
      setSuggestionBoxItemIndex(
        moveItem(suggestionBoxItemIndex, suggestionList.length, true)
      );
    } else if (
      args.code === "ArrowUp" ||
      args.which === 38 ||
      args.key === "ArrowUp"
    ) {
      args.preventDefault();
      setSuggestionBoxItemIndex(
        moveItem(suggestionBoxItemIndex, suggestionList.length, false)
      );
    } else if (
      suggestionBoxItemIndex !== -1 &&
      (args.code === "Enter" || args.which === 13 || args.key === "Enter")
    ) {
      let updatedTags = [
        ...new Set([...tags, suggestionList[suggestionBoxItemIndex]]),
      ];
      setSuggestionBoxItemIndex(-1);
      setInputElementValue("");
      onChange(updatedTags);
    } else if (
      args.code === "Escape" ||
      args.which === 27 ||
      args.key === "Escape"
    ) {
      if (showPopup) {
        setSuggestionBoxItemIndex(-1);
        setShowPopup(false);
      }
      if (showPopup && showSuggestionBox) {
        args.stopPropagation();
      }
    }
  };

  return (
    <div
      className="input-chips"
      onClickCapture={onWrapperClick}
      onBlur={() => {
        onBlur && onBlur();
      }}
    >
      {tags.map((tag, index) => (
        <span className="chip-item" key={tag}>
          # {tag}
          <span
            className="chip-item-close"
            data-tag={tag}
            onClick={(args) => updateTags(args.target.getAttribute("data-tag"))}
          ></span>
        </span>
      ))}
      <input
        ref={inputElement}
        onKeyDown={handleKeyDown}
        placeholder={addNewTag}
        value={inputElementValue}
        onChange={(args) => {
          !showPopup && args.currentTarget.value !== "" && setShowPopup(true);
          setInputElementValue(args.currentTarget.value);
        }}
      />
      {suggestionList && (
        <div
          className={`options ${showPopup && showSuggestionBox ? "" : "hide"}`}
        >
          {suggestionList.map((item) => (
            <div
              key={item}
              className={`option${
                suggestionList[suggestionBoxItemIndex] &&
                suggestionList[suggestionBoxItemIndex].toLowerCase() ===
                  item.toLowerCase()
                  ? " hover"
                  : ""
              }`}
              onClick={() => {
                let updatedTags = [...new Set([...tags, item])];
                setSuggestionBoxItemIndex(-1);
                setInputElementValue("");
                onChange(updatedTags);
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InputChips;
