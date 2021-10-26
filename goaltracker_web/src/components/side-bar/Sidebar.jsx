import React from "react";
import "./Sidebar.css";
import RadioButtonGroup from "./../radio-button-group/RadioButtonGroup";
import DatePicker from "react-datepicker";
import InputChips from "./../input-chips/InputChips";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import {
  convertObjectToArray,
  nameMappingWithId,
  statusMappingWithPk,
} from "./../../convertor";
import Dropdown from "../dropdown/Dropdown";

function Sidebar({
  goalStatus,
  updateGoalStatus,
  goalType,
  updateGoalType,
  dateRange,
  updateDateRange,
  tags,
  updateTags,
  updateSideBarToggle,
  tagSuggestionList,
  goalCategories,
  goalStatusDetails,
  teamGoals,
}) {
  const goalTypes = convertObjectToArray(nameMappingWithId(goalCategories));
  const goalStatusList = convertObjectToArray(
    statusMappingWithPk(goalStatusDetails)
  );
  const filterList = [
    {
      category: "Status",
      options: goalStatusList,
      selected: goalStatus,
    },
    {
      category: "Goal Type",
      options: goalTypes,
      selected: goalType,
    },
  ];
  const [startDate, endDate] = dateRange;

  const radioButtonChangeHandler = (name, value) => {
    switch (name) {
      case "Status":
        updateGoalStatus(value);
        break;
      case "Goal Type":
        updateGoalType(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="sidebar">
      <FontAwesomeIcon
        icon={faLongArrowAltLeft}
        className="font-icon collapse-icon"
        size="lg"
        onClick={updateSideBarToggle}
      />

      {teamGoals && (
        <div className="filter">
          <div className="category">Employee</div>
          <Dropdown
            name="select-employee"
            id="select-employee"
            options={["Ram", "Pravin"]}
            placeholder="Select"
            value={""}
            onSelect={(value) => {
              //
            }}
          ></Dropdown>
        </div>
      )}

      {filterList.map((value, index) => {
        return (
          <div className="filter" key={value.category}>
            <div className="category">{value.category}</div>
            <RadioButtonGroup
              category={value.category}
              selectedOption={value.selected}
              options={value.options}
              onChange={radioButtonChangeHandler}
            ></RadioButtonGroup>
          </div>
        );
      })}
      <div className="filter">
        <div className="category">Tags</div>
        <InputChips
          tags={tags}
          options={tagSuggestionList}
          onChange={(value) => updateTags(value)}
        />
      </div>
      <div className="filter">
        <div className="category">Date Range</div>
        <DatePicker
          className="date-filter"
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => {
            updateDateRange(update);
          }}
        />
      </div>
    </div>
  );
}

export default Sidebar;
