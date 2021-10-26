import React from "react";
import Modal from "react-modal";
import closeIcon from "../../icons/close-icon.svg";
import "./ShowDetails.css";
import Feedback from "./../feedback/Feedback";
import { downloadFile } from "./../../API";

Modal.defaultStyles.overlay.backgroundColor = "rgba(0, 0, 0, 0.4)";
Modal.defaultStyles.overlay.zIndex = 2;
Modal.setAppElement("#root");

function ShowDetails({
  modalIsOpen,
  setModalIsOpen,
  setEditModalOpen,
  goalDetails,
}) {
  const {
    goalId,
    type,
    template,
    title,
    description,
    state,
    createdDate = null,
    targetDate = null,
    completedDate = null,
    tags,
    assignedBy,
    file,
    fileName,
    mentorId,
    feedback,
    additionalNotifiers,
    relatedUrl,
  } = goalDetails;
  const getTags = (tags) => {
    if (Array.isArray(tags) && tags.length) {
      return tags.join(", ");
    } else {
      return tags;
    }
  };
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="modal show-details"
        contentLabel="Add Goal"
        closeTimeoutMS={400}
      >
        <div className="modal-header">
          {title}
          <img
            src={closeIcon}
            className="close-icon"
            alt="close icon"
            onClick={() => setModalIsOpen(false)}
          />
        </div>
        <div className="modal-content">
          {/* Main details */}
          <div className="goal-template">{template}</div>
          <div className="goal-type">{type}</div>
          <div className="goal-status">{state}</div>
          <div className="goal-description">{description}</div>
          {/* additional details */}
          {createdDate && (
            <>
              <div className="goal-created-date-label">Created date</div>
              <div className="goal-created-date">
                {new Date(createdDate).toDateString().substring(4)}
              </div>
            </>
          )}
          {targetDate && (
            <>
              <div className="goal-target-date-label">Target date</div>
              <div className="goal-target-date">
                {new Date(targetDate).toDateString().substring(4)}
              </div>
            </>
          )}
          {completedDate && (
            <>
              <div className="goal-completed-date-label">Completed date</div>
              <div className="goal-completed-date">
                {new Date(completedDate).toDateString().substring(4)}
              </div>
            </>
          )}
          <div className="goal-tags-label">Tags</div>
          <div className="goal-tags">{getTags(tags)}</div>
          <div className="reporter-label">Reporter</div>
          <div className="reporter">{assignedBy}</div>
          {mentorId && (
            <>
              <div className="mentor-label">Mentor</div>
              <div className="mentor">{mentorId}</div>
            </>
          )}
          {additionalNotifiers && (
            <>
              <div className="additional-notifiers-label">
                Additional notifiers
              </div>
              <div className="additional-notifiers">
                {/* {additionalNotifiers.reduce((output, item) => {
                  return output + ", " + item;
                })} */}
                {additionalNotifiers}
              </div>
            </>
          )}
          {(file || relatedUrl) && (
            <>
              <div className="additional-notifiers-label">Attachments</div>
              <div>
                {relatedUrl && (
                  <a
                    href={relatedUrl}
                    className="reviewURL"
                    rel="noreferrer"
                    target="_blank"
                  >
                    URL
                  </a>
                )}
                {relatedUrl && file && <span> / </span>}
                {file && (
                  <a
                    className="download-attachment"
                    href={downloadFile(goalId)}
                    download
                  >
                    {fileName}
                  </a>
                )}
              </div>
            </>
          )}

          {/* Feedback */}
          {feedback && feedback.length > 0 && (
            <div className="goal-feedback">
              <Feedback feedbacks={feedback}></Feedback>
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button
            className="button cancel"
            onClick={() => setModalIsOpen(false)}
          >
            Cancel
          </button>
          <button
            className="button edit"
            onClick={() => {
              setModalIsOpen(false);
              setEditModalOpen(true);
            }}
          >
            Edit Details
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default ShowDetails;
