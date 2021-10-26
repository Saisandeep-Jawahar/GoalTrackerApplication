import React from "react";

function Checkbox(props) {
  return (
    <div>
      <input type="checkbox" />
      <label>{props.value}</label>
    </div>
  );
}

export default Checkbox;
