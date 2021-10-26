import React, { useState, useEffect, useCallback, useRef } from "react";
import Modal from "react-modal";
import "./EditDialog.css";
import Dropdown from "../dropdown/Dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputChips from "../input-chips/InputChips";
import closeIcon from "../../icons/close-icon.svg";
import { validate } from "../../validation";
import { errorMessage, orgGoal } from "../../locale";
import Rating from "../rating/Rating";
import { validateFileType } from "./../../validation";
import { addGoals, downloadFile, updateGoal } from "../../API";
import { EmployeeID } from "./../../API";
import {
  convertObjectToArray,
  nameMappingWithId,
  statusMappingWithPk,
} from "../../convertor";
import { Certification, isGoalStatusDropdownDisabled } from "../../utilities";

Modal.defaultStyles.overlay.backgroundColor = "rgba(0, 0, 0, 0.3)";
Modal.defaultStyles.overlay.zIndex = 2;

Modal.setAppElement("#root");

function EditDialog({
  modalIsOpen,
  setIsOpen,
  defaultValues = {},
  tagSuggestionList,
  setGoals,
  goalTemplateDetails,
  goalCategories,
  goalStatusDetails,
  activeSwitch,
}) {
  const [goalType, setGoalType] = useState(null);
  const [goalTemplate, setGoalTemplate] = useState(null);
  const [goalTitle, setGoalTitle] = useState("");
  const [goalDescription, setGoalDescription] = useState("");
  const [goalEndDate, setGoalEndDate] = useState(null);
  const [tags, setTags] = useState([]);
  const [reporterEmail, setReporterEmail] = useState("");
  const [mentorEmail, setMentorEmail] = useState("");
  const [goalStatus, setGoalStatus] = useState("");
  const [additionalNotifiers, setAdditionalNotifiers] = useState("");
  const [goalStartDate, setGoalStartDate] = useState(null);
  const [completedDate, setCompletedDate] = useState(null);
  const [relatedURL, setRelatedURL] = useState(null);
  const [fileAttachment, setFileAttachment] = useState(null);
  const [selfEvaluation, setSelfEvaluation] = useState(null);
  const [selfComments, setSelfComments] = useState("");
  const [fileName, setFileName] = useState(null);
  const [error, setError] = useState({
    goalType: null,
    goalTemplate: null,
    goalTitle: null,
    goalDescription: null,
    tags: null,
    goalEndDate: null,
  });
  let overallValidation = useRef(false);
  let GOAL_TEMPLATE = nameMappingWithId(goalTemplateDetails);
  let goalTemplates = convertObjectToArray(GOAL_TEMPLATE);
  let GOAL_TYPE = nameMappingWithId(goalCategories);
  let goalTypes = convertObjectToArray(GOAL_TYPE);
  let modalTitle = defaultValues.title === "" ? "Add Goal" : "Edit Goal";
  let GOAL_STATUS = statusMappingWithPk(goalStatusDetails);
  let goalStatusList = convertObjectToArray(GOAL_STATUS);

  const getValue = (field) => {
    switch (field) {
      case "goalType":
        return goalType;
      case "goalTemplate":
        return goalTemplate;
      case "goalDescription":
        return goalDescription;
      case "goalTitle":
        return goalTitle;
      case "goalEndDate":
        return goalEndDate;
      case "tags":
        return tags;
      default:
        break;
    }
  };

  const hasError = useCallback(() => {
    for (const key in error) {
      if (error[key] !== null) {
        return true;
      }
    }
    return false;
  }, [error]);

  // ---------- Generic function to validate all form fields -----------
  const validateAllFields = () => {
    let allFieldsAreValidate = true;
    let formValidation = {};
    for (const field in errorMessage) {
      let validationList = [];
      for (const item in errorMessage[field]) {
        validationList.push(item);
      }
      let { isValid, validation } = validate(validationList, getValue(field));
      if (isValid) {
        formValidation[field] = null;
      } else {
        formValidation[field] = errorMessage[field][validation];
        allFieldsAreValidate = false;
      }
    }
    overallValidation.current = true;
    setError(formValidation);
    return allFieldsAreValidate;
  };
  // ------------- to validate individual field ----------
  const doValidation = (field, value, validationList) => {
    let { isValid, validation } = validate(validationList, value);

    setError((preValue) => ({
      ...preValue,
      [field]: isValid ? null : errorMessage[field][validation],
    }));
  };

  // -------------------------------------------------------------------

  const addNewGoal = () => {
    const requestPayload = {
      employeeId: EmployeeID,
      goalStatus: {
        pk: GOAL_STATUS[goalStatus],
        status: goalStatus,
      },
      goalType: {
        id: GOAL_TEMPLATE[goalTemplate],
        name: goalTemplate,
        goalCategory: {
          id: GOAL_TYPE[goalType],
          name: goalType,
        },
      },
      goalTitle: goalTitle,
      description: goalDescription,
      targetDate: goalEndDate,
      tags: tags.toString(),
      // assignedBy: reporterEmail,
      mentorId: mentorEmail,
      additionalNotifiers: additionalNotifiers,
      dtCreated: new Date(),
    };
    addGoals(requestPayload, setGoals);
  };
  // ----------------------- End of add goal request -------------------

  // ----------------------- Edit goal ---------------------------------
  const editGoal = () => {
    const requestPayload = {
      pk: defaultValues.goalId,
      employeeId: EmployeeID,
      goalStatus: {
        pk: GOAL_STATUS[goalStatus],
        status: goalStatus,
      },
      goalType: {
        id: GOAL_TEMPLATE[goalTemplate],
        name: goalTemplate,
        goalCategory: {
          id: GOAL_TYPE[goalType],
          name: goalType,
        },
      },
      goalTitle: goalTitle,
      description: goalDescription,
      dtCreated: defaultValues.createdDate,
      startDate: goalStartDate,
      targetDate: goalEndDate,
      completedDate: completedDate,
      tags: tags.toString(),
      // assignedBy: reporterEmail,
      mentorId: mentorEmail,
      additionalNotifiers: additionalNotifiers,
      relatedUrl: relatedURL,
      fileName: fileAttachment ? fileAttachment.name : fileName,
      selfEvaluation: selfEvaluation,
      selfComments: selfComments,
    };
    updateGoal(requestPayload, fileAttachment, setGoals);
  };
  // ---------------------- End of edit goal ---------------------------

  // --------------------------------------------------------------------

  useEffect(() => {
    const {
      type,
      template,
      title,
      description,
      targetDate,
      tags,
      state,
      additionalNotifiers,
      assignedBy,
      mentorId,
    } = defaultValues;

    if (title !== undefined) {
      setGoalType(type);
      setGoalTemplate(template);
      setGoalTitle(title);
      setGoalDescription(description);
      setGoalEndDate(new Date(targetDate));
      setTags(tags);
      setGoalStatus(state);
      setAdditionalNotifiers(additionalNotifiers);
      setReporterEmail(assignedBy);
      setMentorEmail(mentorId);
      setFileName(defaultValues.fileName);
    }
    setError({
      goalType: null,
      goalTemplate: null,
      goalDescription: null,
      goalTitle: null,
      goalEndDate: null,
      tags: null,
    });
  }, [defaultValues]);

  useEffect(() => {
    if (overallValidation.current && !hasError()) {
      setIsOpen(false);
    }
    overallValidation.current = false;
  }, [error, hasError, setIsOpen]);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setIsOpen(false)}
      className="modal"
      contentLabel="Add Goal"
      closeTimeoutMS={400}
    >
      <div className="modal-header">
        {modalTitle}
        <img
          src={closeIcon}
          className="close-icon"
          alt="close icon"
          onClick={() => setIsOpen(false)}
        />
      </div>
      <div className="modal-content">
        <div className={`modal-item ${error.goalType ? "error" : ""}`}>
          <label htmlFor="goal-type">Goal Type</label>
          <Dropdown
            name="goal-type"
            id="goal-type"
            options={goalTypes}
            placeholder="Select"
            value={goalType}
            onSelect={(value) => {
              setGoalType(value);
              doValidation("goalType", value, ["required"]);
            }}
            onBlur={(args) => {
              doValidation("goalType", goalType, ["required"]);
            }}
          ></Dropdown>
          {error.goalType && (
            <div className="error-message">{error.goalType}</div>
          )}
        </div>
        <div className={`modal-item ${error.goalTemplate ? "error" : ""}`}>
          <label htmlFor="goal-template">Goal Template</label>
          <Dropdown
            name="goal-template"
            id="goal-template"
            options={goalTemplates}
            placeholder="Select"
            value={goalTemplate}
            onSelect={(value) => {
              setGoalTemplate(value);
              doValidation("goalTemplate", value, ["required"]);
            }}
            onBlur={(args) => {
              doValidation("goalTemplate", goalTemplate, ["required"]);
            }}
          ></Dropdown>
          {error.goalTemplate && (
            <div className="error-message">{error.goalTemplate}</div>
          )}
        </div>
        {goalTemplate === orgGoal ? (
          <div className="certificate-redirect">
            Go to <a href={Certification}>certification page</a> to choose your
            certificate.
          </div>
        ) : (
          <>
            <div
              className={`modal-item title ${error.goalTitle ? "error" : ""}`}
            >
              <label htmlFor="goal-title">Goal Title</label>
              <input
                name="goal-title"
                id="goal-title"
                className="goal-title textbox"
                value={goalTitle}
                onChange={(args) => {
                  setGoalTitle(args.currentTarget.value);
                  doValidation("goalTitle", args.currentTarget.value, [
                    "required",
                  ]);
                }}
                onBlur={(args) => {
                  doValidation("goalTitle", args.currentTarget.value, [
                    "required",
                  ]);
                }}
              ></input>
              {error.goalTitle && (
                <div className="error-message">{error.goalTitle}</div>
              )}
            </div>
            <div
              className={`modal-item description ${
                error.goalDescription ? "error" : ""
              }`}
            >
              <label htmlFor="goal-statement">Goal Statement</label>
              <textarea
                name="goal-statement"
                id="goal-statement"
                className="goal-statement textarea"
                value={goalDescription}
                onChange={(args) => {
                  setGoalDescription(args.currentTarget.value);
                  doValidation("goalDescription", args.currentTarget.value, [
                    "required",
                  ]);
                }}
                onBlur={(args) => {
                  doValidation("goalDescription", args.currentTarget.value, [
                    "required",
                  ]);
                }}
              ></textarea>
              {error.goalDescription && (
                <div className="error-message">{error.goalDescription}</div>
              )}
            </div>
            <div className="modal-item">
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
            <div className={`modal-item ${error.tags ? "error" : ""}`}>
              <label htmlFor="goal-tags">Tags</label>
              <InputChips
                tags={tags}
                options={tagSuggestionList}
                onChange={(value) => {
                  setTags(value);
                  doValidation("tags", value, ["required"]);
                }}
                onBlur={() => doValidation("tags", tags, ["required"])}
              />
              {error.tags && <div className="error-message">{error.tags}</div>}
            </div>
            <div className="modal-item">
              <label htmlFor="reporter-email">Reporter's Email</label>
              <input
                type="email"
                name="reporter-email"
                id="reporter-email"
                className="textbox"
                disabled
                value={reporterEmail}
                // onChange={(args) => setReporterEmail(args.currentTarget.value)}
              />
            </div>
            <div className="modal-item">
              <label htmlFor="mentor-email">Mentor's Email</label>
              <input
                type="text"
                name="mentor-email"
                placeholder="Optional"
                id="mentor-email"
                className="textbox"
                value={mentorEmail}
                onChange={(args) => {
                  setMentorEmail(args.currentTarget.value);
                }}
              />
            </div>
            <div className="modal-item">
              <label htmlFor="additional-notify-email">
                Additional Notifiers
              </label>
              <input
                type="text"
                name="additional-notify-email"
                placeholder="Optional"
                id="additional-notify-email"
                className="textbox"
                value={additionalNotifiers}
                onChange={(args) =>
                  setAdditionalNotifiers(args.currentTarget.value)
                }
              />
            </div>
            {/* no need for add goal dialog modal */}
            {defaultValues.title !== "" && (
              <>
                <div className="modal-item">
                  <label htmlFor="goal-status">Goal Status</label>
                  <Dropdown
                    name="goal-status"
                    id="goal-status"
                    disabled={isGoalStatusDropdownDisabled(
                      activeSwitch,
                      goalStatus
                    )}
                    options={goalStatusList}
                    placeholder="Select"
                    value={goalStatus}
                    onSelect={(value) => {
                      if (
                        goalStatus === goalStatusList[0] &&
                        value === goalStatusList[1]
                      ) {
                        setGoalStartDate(new Date());
                      }
                      if (value === goalStatusList[2]) {
                        setCompletedDate(new Date());
                      }
                      setGoalStatus(value);
                    }}
                  ></Dropdown>
                </div>
                <div className="modal-item">
                  <label htmlFor="related-url">Related URL</label>
                  <input
                    type="url"
                    placeholder="Optional"
                    name="related-url"
                    id="related-url"
                    className="textbox"
                    value={relatedURL}
                    onChange={(args) => setRelatedURL(args.currentTarget.value)}
                  />
                </div>
                <div className="modal-item">
                  <label htmlFor="file-upload">File Upload</label>
                  <div className="file-upload">
                    {fileName && (
                      <>
                        <span className="download-file">
                          <a
                            className="download-attachment"
                            href={downloadFile(defaultValues.goalId)}
                            download
                          >
                            {fileName}
                          </a>
                          <span
                            className="remove-file"
                            onClick={() => setFileName(null)}
                          ></span>
                        </span>
                      </>
                    )}
                    <input
                      type="file"
                      name="file-upload"
                      id="file-upload"
                      className={`textbox file${fileName ? " hide" : ""}`}
                      accept=".jpg,.jpeg,.png,.PNG,doc,.docx,.pdf,.zip"
                      onChange={(args) => {
                        if (validateFileType(args)) {
                          setFileAttachment(args.target.files[0]);
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="modal-item feedback">
                  <label htmlFor="review-comments">
                    Self Rating & Comments
                  </label>
                  <div className="star-rating">
                    <Rating
                      value={selfEvaluation}
                      onChange={setSelfEvaluation}
                    />
                  </div>
                  <textarea
                    name="review-comments"
                    id="review-comments"
                    className="textarea"
                    value={selfComments}
                    onChange={(args) =>
                      setSelfComments(args.currentTarget.value)
                    }
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
      <div className="modal-footer">
        <button className="button cancel" onClick={() => setIsOpen(false)}>
          Cancel
        </button>
        <button
          className="button"
          disabled={goalTemplate === orgGoal}
          onClick={() => {
            if (goalTemplate === orgGoal) {
              return null;
            }
            if (defaultValues.title !== "") {
              // edit dialog
              setIsOpen(false);
              editGoal();
            } else {
              let canAddGoal = validateAllFields();
              if (canAddGoal) {
                addNewGoal();
              }
            }
          }}
        >
          Save
        </button>
      </div>
    </Modal>
  );
}

export default EditDialog;
