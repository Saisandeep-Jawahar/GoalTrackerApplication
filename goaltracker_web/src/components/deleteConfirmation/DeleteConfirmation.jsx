import React from "react";
import "./DeleteConfirmation.css";
import Modal from "react-modal";
import { deleteGoal } from "./../../API";

Modal.defaultStyles.overlay.backgroundColor = "rgba(0, 0, 0, 0.4)";
Modal.defaultStyles.overlay.zIndex = 2;
Modal.setAppElement("#root");

function DeleteConfirmation({ modalIsOpen, setModalIsOpen, goalId, setGoals }) {
  const deleteGoalHandler = () => {
    deleteGoal(goalId, setGoals);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      className="modal delete-confirm"
      contentLabel="Delete confirm"
      closeTimeoutMS={400}
    >
      <div className="modal-content">
        Are you sure, want to delete this item?
      </div>
      <div className="modal-footer">
        <button className="button cancel" onClick={() => setModalIsOpen(false)}>
          Cancel
        </button>
        <button className="button" onClick={deleteGoalHandler}>
          Yes, Delete it
        </button>
      </div>
    </Modal>
  );
}

export default DeleteConfirmation;
