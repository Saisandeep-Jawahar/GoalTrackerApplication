import React from "react";
import "./Switch.css";

function Switch({ items, activeItem, updateActiveItem }) {
  return (
    <div className="switch">
      <div className="switch-container">
        {items.map((item) => (
          <div
            key={item}
            className={`switch-item my-goals${
              activeItem === item ? " active" : ""
            }`}
            onClick={() => {
              updateActiveItem(item);
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Switch;
