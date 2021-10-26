import logo from "../../icons/logo.svg";
import React from "react";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faUserCircle, faBars } from "@fortawesome/free-solid-svg-icons";
import { CWFM_HOME } from "../../utilities";

function NavBar({ notificationCount, accountName, setShowNotification }) {
  const [openExternalContent, setOpenExternalContent] = React.useState(false);

  const toggleNotification = (args) => {
    args.stopPropagation();
    setShowNotification((preValue) => !preValue);
  };

  return (
    <div className="nav-bar">
      <div className="brand">
        <div>
          <img src={logo} className="brand-logo" alt="logo" />
        </div>
        <h1 className="brand-name">Goal Tracker</h1>
      </div>
      <div className={`nav-items${openExternalContent ? " show" : ""}`}>
        <a className="nav-item" href={CWFM_HOME}>
          Home
        </a>
        <a className="nav-item active" href="/">
          Dashboard
        </a>
        <div
          className="nav-item position-relative"
          onClick={toggleNotification}
        >
          <FontAwesomeIcon
            icon={faBell}
            className=" header font-icon"
            size="lg"
          />
          {notificationCount > 0 && (
            <span className="notification-count">{notificationCount}</span>
          )}
        </div>
        <div className="nav-item no-action">
          <FontAwesomeIcon
            icon={faUserCircle}
            className="header font-icon"
            size="lg"
          />
          <span className="account-name">{accountName ? accountName : ""}</span>
        </div>
      </div>
      <div
        className="menu-icon"
        tabIndex="0"
        onClick={() => {
          setOpenExternalContent((preValue) => !preValue);
        }}
        onBlur={() => {
          setTimeout(() => {
            setOpenExternalContent(false);
          }, 1000);
        }}
      >
        <FontAwesomeIcon icon={faBars} className="header font-icon" size="lg" />
      </div>
    </div>
  );
}

export default NavBar;
