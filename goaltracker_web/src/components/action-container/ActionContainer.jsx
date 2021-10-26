import React, { useState, useEffect } from "react";
import "./ActionContainer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import GoalDisplay from "../goal-display/GoalDisplay";
import EditDialog from "../editDialog/EditDialog";
import FilterList from "./../filters/FilterList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getEmployeeDetails } from "./../../API";
import { connect } from "react-redux";
import {
  setEditDialogDisplay,
  setGoalDetails,
} from "../../store/goalDetails/actions";
import {
  getEditGoalDetailsDialogState,
  getGoalDetails,
} from "../../store/goalDetails/selector";

function ActionContainer({
  goals,
  setGoals,
  filterListToShow,
  updateFilterList,
  tagSuggestionList,
  goalTemplateDetails,
  goalCategories,
  goalStatusDetails,
  supervisorEmployeeId,
  employeeId,
  activeSwitch,
  isEditDialogOpen,
  setEditDialogDisplay,
  modalFormValues,
  setModalFormValues,
}) {
  const [searchText, setSearchText] = useState("");
  const [supervisorDetails, setSupervisorDetails] = useState({});

  let filteredGoals = goals;

  if (searchText !== "") {
    filteredGoals = filteredGoals.filter((goal) =>
      goal.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }
  useEffect(() => {
    supervisorEmployeeId &&
      getEmployeeDetails(setSupervisorDetails, supervisorEmployeeId);
  }, [supervisorEmployeeId]);

  return (
    <div className="action-container">
      <div className="action-control">
        <div className="action">
          <div className="action-item searchbar">
            <input
              type="text"
              className="search"
              placeholder="Search"
              value={searchText}
              onChange={(args) => setSearchText(args.target.value)}
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="font-icon search-icon"
            />
          </div>
          <div className="action-item add-new-goal">
            <button
              className="button add-goals"
              onClick={() => {
                setModalFormValues({
                  type: null,
                  template: null,
                  title: "",
                  description: "",
                  targetDate: new Date(),
                  tags: [],
                  state: "Draft",
                  assignedBy: supervisorDetails.email,
                  additionalNotifiers: null,
                  mentorId: "",
                });
                setEditDialogDisplay(true);
              }}
            >
              Add Goals
            </button>
            <FontAwesomeIcon icon={faPlus} className="font-icon plus-icon" />
          </div>
        </div>
        <FilterList
          filterList={filterListToShow}
          updateFilterList={updateFilterList}
        />
      </div>
      <GoalDisplay
        goals={filteredGoals}
        setGoals={setGoals}
        modalFormValues={modalFormValues}
        setModalFormValues={setModalFormValues}
        setEditDialogDisplay={setEditDialogDisplay}
        employeeId={employeeId}
      />
      <EditDialog
        modalIsOpen={isEditDialogOpen}
        setIsOpen={setEditDialogDisplay}
        defaultValues={modalFormValues}
        tagSuggestionList={tagSuggestionList}
        goalTemplateDetails={goalTemplateDetails}
        goalCategories={goalCategories}
        setGoals={setGoals}
        goalStatusDetails={goalStatusDetails}
        activeSwitch={activeSwitch}
      />
      <ToastContainer
        position="top-right"
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss={false}
        pauseOnHover
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  isEditDialogOpen: getEditGoalDetailsDialogState(state),
  modalFormValues: getGoalDetails(state),
});
export default connect(mapStateToProps, {
  setEditDialogDisplay,
  setModalFormValues: setGoalDetails,
})(ActionContainer);
