import React from "react";
import "./Card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

function Card({
  animationID,
  title,
  type,
  template,
  description,
  state,
  setEditDialogOpen,
  setShowDetailsDialogOpen,
  setShowDeleteConfirmationDialog,
}) {
  return (
    <div
      className="card"
      style={{ animationDuration: `${animationID * 200}ms` }}
      onClick={() => setShowDetailsDialogOpen(true)}
    >
      <div className="card-header">
        <div className="card-title">{title}</div>
        <div className="card-actions">
          <div
            className="card-edit"
            onClick={(args) => {
              args.stopPropagation();
              args.preventDefault();
              setEditDialogOpen(true);
            }}
          >
            <FontAwesomeIcon icon={faEdit} className="font-icon edit-icon" />
          </div>
          {state === "Draft" && (
            <div
              className="card-delete"
              onClick={(args) => {
                args.stopPropagation();
                setShowDeleteConfirmationDialog(true);
              }}
            >
              <FontAwesomeIcon
                icon={faTrashAlt}
                className="font-icon delete-icon"
              />
            </div>
          )}
        </div>
      </div>
      <div className="template">{template}</div>
      <div className="status">
        <div className="type">{type}</div>
        <div className={`state ${state}`}>{state}</div>
      </div>
      <div className="card-description">{description}</div>
    </div>
  );
}

export default Card;
