import {
  DISPLAY_GOAL_DIALOG,
  EDIT_GOAL_DIALOG,
  SET_GOAL_DETAILS,
} from "./actionTypes";

export const setGoalDetailsDialogDisplay = (show) => ({
  type: DISPLAY_GOAL_DIALOG,
  payload: show,
});

export const setEditDialogDisplay = (show) => ({
  type: EDIT_GOAL_DIALOG,
  payload: show,
});

export const setGoalDetails = (goalDetails) => ({
  type: SET_GOAL_DETAILS,
  payload: goalDetails,
});
