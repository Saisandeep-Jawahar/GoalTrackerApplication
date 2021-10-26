import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./Dialog.css";
import Dropdown from "../dropdown/Dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputChips from "../input-chips/InputChips";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  goalTypes,
  goalTemplates,
  goalStatusList,
} from "./../../../src/staticData";

Modal.defaultStyles.overlay.backgroundColor = "rgba(0, 0, 0, 0.4)";
Modal.defaultStyles.overlay.zIndex = 2;

Modal.setAppElement("#root");

function Dialog({ modalIsOpen, setIsOpen, defaultValues = {} }) {
  const [goalType, setGoalType] = useState(null);
  const [goalTemplate, setGoalTemplate] = useState(null);
  const [goalTitle, setGoalTitle] = useState("");
  const [goalDescription, setGoalDescription] = useState("");
  const [goalEndDate, setGoalEndDate] = useState(new Date());
  const [tags, setTags] = useState([]);
  const [goalStatus, setGoalStatus] = useState("Draft");
  let modalTitle = defaultValues.title === "" ? "Add Goal" : "Edit Goal";

  useEffect(() => {
    const { type, template, title, description, completionDate, tags, state } =
      defaultValues;

    if (title !== undefined) {
      setGoalType(type);
      setGoalTemplate(template);
      setGoalTitle(title);
      setGoalDescription(description);
      setGoalEndDate(new Date(completionDate));
      setTags(tags);
      setGoalStatus(state);
    }
  }, [defaultValues]);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setIsOpen(false)}
      className="modal"
      contentLabel="Add Goal"
      closeTimeoutMS={200}
    >
      <div className="modal-header">
        {modalTitle}
        <span className="close" onClick={() => setIsOpen(false)}>
          <FontAwesomeIcon
            icon={faTimes}
            className="font-icon close-icon"
            size="lg"
          />
        </span>
      </div>
      <div className="modal-content">
        <form>
          <div className="modal-row">
            <div className="modal-item margin-right-40">
              <label htmlFor="goal-type">Goal Type</label>
              <Dropdown
                name="goal-type"
                id="goal-type"
                options={goalTypes}
                placeholder="Select"
                value={goalType}
                onSelect={setGoalType}
              ></Dropdown>
            </div>
            <div className="modal-item">
              <label htmlFor="goal-template">Goal Template</label>
              <Dropdown
                name="goal-template"
                id="goal-template"
                options={goalTemplates}
                placeholder="Select"
                value={goalTemplate}
                onSelect={setGoalTemplate}
              ></Dropdown>
            </div>
          </div>
          <div className="modal-row">
            <div className="modal-item">
              <label htmlFor="goal-statement">Goal Title</label>
              <input
                name="goal-title"
                id="goal-title"
                className="goal-title textbox"
                value={goalTitle}
                onChange={(args) => setGoalTitle(args.currentTarget.value)}
              ></input>
            </div>
          </div>
          <div className="modal-row">
            <div className="modal-item">
              <label htmlFor="goal-statement">Goal Statement</label>
              <textarea
                name="goal-statement"
                id="goal-statement"
                className="goal-statement textarea"
                value={goalDescription}
                onChange={(args) =>
                  setGoalDescription(args.currentTarget.value)
                }
              ></textarea>
            </div>
          </div>
          <div className="modal-row">
            <div className="modal-item margin-right-40">
              <label htmlFor="goal-status">Goal Status</label>
              <Dropdown
                name="goal-status"
                id="goal-status"
                options={goalStatusList}
                placeholder="Select"
                value={goalStatus}
                onSelect={setGoalStatus}
              ></Dropdown>
            </div>
            <div className="modal-item">
              <label htmlFor="goal-tags">Tags</label>
              <InputChips tags={tags} onChange={(value) => setTags(value)} />
            </div>
          </div>
          <div className="modal-row">
            <div className="modal-item margin-right-40">
              <label htmlFor="reporter-email">Reporter's Email</label>
              <input
                type="email"
                name="reporter-email"
                id="reporter-email"
                className="textbox"
              />
            </div>
            <div className="modal-item">
              <label htmlFor="additional-notify-email">
                Additional Notifiers
              </label>
              <input
                type="text"
                name="additional-notify-email"
                id="additional-notify-email"
                className="textbox"
              />
            </div>
          </div>
          <div className="modal-row">
            <div className="modal-item margin-right-40">
              <label htmlFor="related-url">Related URL</label>
              <input
                type="url"
                name="related-url"
                id="related-url"
                className="textbox"
              />
            </div>
            <div className="modal-item">
              <label htmlFor="file-upload">File Upload</label>
              <div className="file-upload">
                <input
                  type="file"
                  name="file-upload"
                  id="file-upload"
                  className="textbox file"
                />
              </div>
            </div>
          </div>
          <div className="modal-row">
            <div className="modal-item margin-right-40">
              <label htmlFor="goal-end-date">Goal end date</label>
              <DatePicker
                id="goal-end-date"
                name="goal-end-date"
                className="goal-end-date"
                selected={goalEndDate}
                onSelect={(date) => {
                  setGoalEndDate(date);
                }}
              />
            </div>
            <div className="modal-item margin-right-40">
              <label htmlFor="mentor-email">Mentor's Email</label>
              <input
                type="text"
                name="mentor-email"
                id="mentor-email"
                className="textbox"
              />
            </div>
          </div>
          <div className="modal-row">
            <div className="modal-item">
              <label htmlFor="review-comments">Rating & Comments</label>
              <textarea
                name="review-comments"
                id="review-comments"
                className="textarea"
              />
            </div>
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button className="button cancel" onClick={() => setIsOpen(false)}>
          Cancel
        </button>
        <button className="button" onClick={() => setIsOpen(false)}>
          Save
        </button>
      </div>
    </Modal>
  );
}

export default Dialog;
