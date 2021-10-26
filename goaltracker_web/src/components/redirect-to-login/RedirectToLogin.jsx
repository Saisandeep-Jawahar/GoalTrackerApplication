import React from "react";
import Modal from "react-modal";
import { sessionError } from "../../locale";
import "./RedirectToLogin.css";
import { error } from "./../../locale";
import { CWFM_HOME } from "../../utilities";

Modal.defaultStyles.overlay.backgroundColor = "rgba(0, 0, 0, 0.4)";
Modal.defaultStyles.overlay.zIndex = 2;
Modal.setAppElement("#root");

function RedirectToLogin({ modalIsOpen, setModalIsOpen }) {
  return (
    <Modal
      isOpen={modalIsOpen}
      className="modal redirect-to-login"
      contentLabel="Redirect to Login"
      closeTimeoutMS={400}
    >
      <div className="modal-header">{error}</div>
      <div className="modal-content">{sessionError}</div>
      <div className="modal-footer">
        <button
          className="button"
          onClick={() => (window.location = CWFM_HOME)}
        >
          Okay
        </button>
      </div>
    </Modal>
  );
}

export default RedirectToLogin;
