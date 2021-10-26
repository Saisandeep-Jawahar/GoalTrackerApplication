import React from "react";
import "./FilterList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function FilterList({ filterList, updateFilterList }) {
  const getItemValue = (value) => {
    if (Array.isArray(value)) {
      if (typeof value[0] === "object") {
        return `${value[0].toDateString().substring(4)} - ${value[1]
          .toDateString()
          .substring(4)}`;
      } else {
        let tags = "";
        for (const [index, tag] of value.entries()) {
          if (index === value.length - 1) {
            tags += `#${tag}`;
          } else {
            tags += `#${tag}, `;
          }
        }
        return tags;
      }
    } else {
      return value;
    }
  };
  return (
    <div className="filter-list">
      {filterList.map((item) => (
        <span key={item.filter} className="display-filter">
          {getItemValue(item.value)}
          <span
            className="filter-remove"
            onClick={() => {
              updateFilterList(item.filter);
            }}
          >
            <FontAwesomeIcon icon={faTimes} className="font-icon close" />
          </span>
        </span>
      ))}
    </div>
  );
}

export default FilterList;
