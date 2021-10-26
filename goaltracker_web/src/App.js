import "./App.css";
import React from "react";
import NavBar from "./components/nav-bar/NavBar";
import MainContainer from "./components/main-container/MainContainer";
import { getEmployeeDetails, getEmployeeID, getNotificationList } from "./API";
import Notification from "bk-react-notification";
import { connect } from "react-redux";
import {
  setGoalDetails,
  setGoalDetailsDialogDisplay,
} from "./store/goalDetails/actions";

function App({ setGoalDetails, setGoalDetailsDialogDisplay }) {
  const [goals, setGoals] = React.useState([]);
  const [sideBarToggle, setSideBarToggle] = React.useState(true);
  const [employeeDetails, setEmployeeDetails] = React.useState({});
  const [showNotification, setShowNotification] = React.useState(false);
  const [notificationList, setNotificationList] = React.useState([]);
  const {
    employeeId,
    firstName,
    lastName,
    currentAppraisalPeriodStartDate,
    currentAppraisalPeriodEndDate,
    supervisorEmployeeId,
  } = employeeDetails;
  const updateSideBarToggle = () => {
    setSideBarToggle(!sideBarToggle);
  };

  const getGoalTracker = () => (
    <div className="App" id="goal-tracker-app">
      <header className="App-header">
        <NavBar
          notificationCount={3}
          accountName={
            firstName && lastName ? `${firstName} ${lastName}` : null
          }
          setShowNotification={setShowNotification}
        />
      </header>
      {showNotification && (
        <Notification
          title="Notifications"
          enableFloatMenu={true}
          items={notificationList}
          onSelectNotification={(item) => {
            const selectedGoal = goals.find((goal) => goal.goalId === item.id);
            if (selectedGoal) {
              setShowNotification(false);
              setGoalDetails(selectedGoal);
              setGoalDetailsDialogDisplay(true);
            }
          }}
        ></Notification>
      )}
      <MainContainer
        {...{
          sideBarToggle,
          updateSideBarToggle,
          currentAppraisalPeriodStartDate,
          currentAppraisalPeriodEndDate,
          supervisorEmployeeId,
          employeeId,
          goals,
          setGoals,
        }}
      />
    </div>
  );

  React.useEffect(() => {
    getEmployeeID(setEmployeeDetails);
    // getEmployeeDetails(setEmployeeDetails);
  }, []);

  React.useEffect(() => {
    getNotificationList(setNotificationList);
  }, []);

  const documentClickHandler = React.useCallback(
    (args) => {
      if (showNotification) {
        if (
          args.path.find((item) => item.className === "notification-container")
        ) {
          return null;
        } else {
          setShowNotification(false);
        }
      }
    },
    [showNotification]
  );

  React.useEffect(() => {
    document.addEventListener("click", documentClickHandler);
    return () => {
      document.removeEventListener("click", documentClickHandler);
    };
  }, [documentClickHandler]);

  return getGoalTracker();
}

export default connect(null, { setGoalDetails, setGoalDetailsDialogDisplay })(
  App
);
