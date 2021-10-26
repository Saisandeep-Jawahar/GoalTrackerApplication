import React from "react";
import Card from "../card/Card";
import "./GoalDisplay.css";
import ShowDetails from "./../showDetails/ShowDetails";
import emptyResultIcon from "./../../icons/empty-result.svg";
import DeleteConfirmation from "./../deleteConfirmation/DeleteConfirmation";
import { connect } from "react-redux";
import { getShowGoalDetailsDialogState } from "./../../store/goalDetails/selector";
import { setGoalDetailsDialogDisplay } from "../../store/goalDetails/actions";

function GoalDisplay({
  goals,
  setGoals,
  isGoalDetailsDialogOpen,
  setGoalDetailsDialogDisplay,
  setEditDialogDisplay,
  modalFormValues = {},
  setModalFormValues,
  employeeId,
}) {
  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] =
    React.useState(false);

  return (
    <>
      <div className={`goal-display ${goals.length > 0 ? "" : "empty"}`}>
        {employeeId ? (
          <>
            {goals.length > 0 ? (
              goals.map((goal, index) => (
                <Card
                  animationID={index + 2}
                  key={goal.employeeId + goal.title + goal.createdDate}
                  {...goal}
                  setEditDialogOpen={(value) => {
                    setModalFormValues({ ...goal });
                    setEditDialogDisplay(value);
                  }}
                  setShowDetailsDialogOpen={(value) => {
                    setModalFormValues({ ...goal });
                    setGoalDetailsDialogDisplay(value);
                  }}
                  setShowDeleteConfirmationDialog={(value) => {
                    setModalFormValues({ ...goal });
                    setShowDeleteConfirmationDialog(value);
                  }}
                />
              ))
            ) : (
              <div className="empty-records">
                <img
                  src={emptyResultIcon}
                  alt="Empty result icon"
                  className="empty-result-icon"
                />
                No records to display! Try to remove the applied filter to view
                your results.
              </div>
            )}
          </>
        ) : (
          "Loading..."
        )}
      </div>
      <ShowDetails
        modalIsOpen={isGoalDetailsDialogOpen}
        setModalIsOpen={setGoalDetailsDialogDisplay}
        setEditModalOpen={setEditDialogDisplay}
        goalDetails={modalFormValues}
      ></ShowDetails>
      <DeleteConfirmation
        modalIsOpen={showDeleteConfirmationDialog}
        setModalIsOpen={setShowDeleteConfirmationDialog}
        goalId={modalFormValues.goalId}
        setGoals={setGoals}
      ></DeleteConfirmation>
    </>
  );
}

const mapStateToProps = (state) => ({
  isGoalDetailsDialogOpen: getShowGoalDetailsDialogState(state),
});

export default connect(mapStateToProps, {
  setGoalDetailsDialogDisplay,
})(GoalDisplay);
