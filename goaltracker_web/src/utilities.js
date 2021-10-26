import Cookies from "js-cookie";

import { NON_APPROVED_GOAL_STATE, myGoals } from "./locale";

export const appendToFormData = (employeeGoal, file = null) => {
  const data = new FormData();
  data.append("employeeGoal", JSON.stringify(employeeGoal));
  data.append("file", file);
  return data;
};

export const isGoalStatusDropdownDisabled = (activeSwitch, currentStatus) => {
  if (activeSwitch === myGoals && currentStatus === NON_APPROVED_GOAL_STATE) {
    return true;
  }
  return false;
};

export const getSessionId = (name) => Cookies.get(name) || "";

export const CWFM_HOME =
  document.location.hostname === "localhost"
    ? "http://localhost:8080/perfwfm/"
    : document.location.origin;

export const Certification =
  document.location.hostname === "localhost"
    ? "http://localhost:8080/gamification/#/certification"
    : document.location.origin + "/gamification/#/certification";
