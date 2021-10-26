import React, { useCallback, useEffect, useState } from "react";
import Sidebar from "./../side-bar/Sidebar";
import ActionContainer from "./../action-container/ActionContainer";
import "./MainContainer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import {
  fetchAllGoalCategories,
  fetchAllGoalStatus,
  fetchAllGoalTemplate,
  fetchGoals,
} from "./../../API";
import Switch from "../switch/Switch";
import { switchList, yourGoals, teamGoals } from "../../locale";

function MainContainer({
  sideBarToggle,
  updateSideBarToggle,
  currentAppraisalPeriodStartDate,
  currentAppraisalPeriodEndDate,
  supervisorEmployeeId,
  employeeId,
  goals,
  setGoals,
}) {
  const [goalTemplateDetails, setGoalTemplateDetails] = useState([]);
  const [goalCategories, setGoalCategories] = useState([]);
  const [goalStatusDetails, setGoalStatusDetails] = useState([]);
  const [goalStatus, setGoalStatus] = useState("");
  const [goalType, setGoalType] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [tags, setTags] = useState([]);
  const [activeSwitch, setActiveSwitch] = useState(switchList[0]);

  let tagsFromGoals = [];
  if (goals.length) {
    tagsFromGoals = goals.map((goalDetails) => goalDetails.tags);
    tagsFromGoals = [...new Set(tagsFromGoals.flat())];
  }

  //   Filter list to show below to search bar
  let filterList = [
    { filter: "goalStatus", value: goalStatus },
    { filter: "goalType", value: goalType },
    { filter: "targetDate", value: dateRange },
    { filter: "tags", value: tags },
  ];
  filterList = filterList.filter((item) => item.value !== "");
  filterList = filterList.filter((item) => {
    return item.value[0] !== null && item.value[1] !== null;
  });

  filterList = filterList.filter((item) => {
    switch (item.filter) {
      case "goalStatus":
      case "goalType":
        return item.value !== "";
      case "targetDate":
        return item.value[0] !== null && item.value[1] !== null;
      case "tags":
        return item.value.length > 0;
      default:
        return true;
    }
  });
  const updateFilterList = useCallback((filter) => {
    switch (filter) {
      case "goalStatus":
        setGoalStatus("");
        break;
      case "goalType":
        setGoalType("");
        break;
      case "targetDate":
        setDateRange([null, null]);
        break;
      case "tags":
        setTags([]);
        break;
      default:
        break;
    }
  }, []);
  //   -------------------------

  //   Apply selected filters to filter goal cards
  let filteredGoals = goals;
  if (goalStatus !== "") {
    filteredGoals = goals.filter((goal) => goal.state === goalStatus);
  }

  if (goalType !== "") {
    filteredGoals = filteredGoals.filter((goal) => goal.type === goalType);
  }

  if (startDate !== null && endDate != null) {
    filteredGoals = filteredGoals.filter((goal) => {
      return (
        startDate <= new Date(goal.targetDate) &&
        new Date(goal.targetDate) <= endDate
      );
    });
  }

  if (tags.length) {
    filteredGoals = filteredGoals.filter((goal) => {
      let goalsList = goal.tags;
      goalsList = goalsList.map((item) => item.toLowerCase());
      for (const tag of tags) {
        if (!goalsList.includes(tag.toLowerCase())) {
          return false;
        }
      }
      return true;
    });
  }
  // ---------------------------------

  useEffect(() => {
    // To get from API
    if (employeeId) {
      fetchAllGoalTemplate(setGoalTemplateDetails);
      fetchAllGoalCategories(setGoalCategories);
      fetchAllGoalStatus(setGoalStatusDetails);
      fetchGoals(setGoals, null, activeSwitch === switchList[1] ? true : false);
      if (currentAppraisalPeriodStartDate && currentAppraisalPeriodEndDate) {
        setDateRange([
          new Date(currentAppraisalPeriodStartDate),
          new Date(currentAppraisalPeriodEndDate),
        ]);
      }
    }
  }, [
    employeeId,
    currentAppraisalPeriodStartDate,
    currentAppraisalPeriodEndDate,
    setGoals,
    activeSwitch,
  ]);

  return (
    <div className="main-container">
      <div className={sideBarToggle ? "Sidebar-outer hide" : "Sidebar-outer"}>
        <Sidebar
          teamGoals={activeSwitch === switchList[1]}
          goalStatus={goalStatus}
          updateGoalStatus={(value) => setGoalStatus(value)}
          goalType={goalType}
          updateGoalType={(value) => setGoalType(value)}
          dateRange={dateRange}
          updateDateRange={(value) => {
            setDateRange(value);
          }}
          tags={tags}
          updateTags={(value) => setTags(value)}
          updateSideBarToggle={updateSideBarToggle}
          tagSuggestionList={tagsFromGoals}
          goalCategories={goalCategories}
          goalStatusDetails={goalStatusDetails}
        />
      </div>
      <main className={sideBarToggle ? "" : "sidebar-shown"}>
        <div className="sub-title">
          {activeSwitch === switchList[0] ? yourGoals : teamGoals}
          <button
            className={`button filter ${sideBarToggle ? "" : "selected"}`}
            onClick={updateSideBarToggle}
          >
            <FontAwesomeIcon
              icon={faFilter}
              className="icon filter-icon"
              size="lg"
            />
            Filter
          </button>
          {/* show switch only, if employee has mentor/CoE/supervisor roles */}
          <Switch
            items={switchList}
            activeItem={activeSwitch}
            updateActiveItem={(activeItem) => {
              setActiveSwitch(activeItem);
            }}
          ></Switch>
        </div>
        <ActionContainer
          goals={filteredGoals}
          setGoals={setGoals}
          filterListToShow={filterList}
          updateFilterList={updateFilterList}
          tagSuggestionList={tagsFromGoals}
          goalTemplateDetails={goalTemplateDetails}
          goalCategories={goalCategories}
          goalStatusDetails={goalStatusDetails}
          supervisorEmployeeId={supervisorEmployeeId}
          employeeId={employeeId}
          activeSwitch={activeSwitch}
        />
      </main>
    </div>
  );
}

export default MainContainer;
