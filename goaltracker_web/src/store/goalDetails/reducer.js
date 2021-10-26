import {
  DISPLAY_GOAL_DIALOG,
  EDIT_GOAL_DIALOG,
  SET_GOAL_DETAILS,
} from "./actionTypes";

const initialState = {
  displayGoalDialog: false,
  editGoalDialog: false,
  goalDetails: {},
};
export const goalDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_GOAL_DIALOG:
      return { ...state, displayGoalDialog: action.payload };
    case EDIT_GOAL_DIALOG:
      return { ...state, editGoalDialog: action.payload };
    case SET_GOAL_DETAILS:
      return { ...state, goalDetails: action.payload };
    default:
      return state;
  }
};
