import { createStore } from "redux";
import { goalDetailsReducer } from "./reducer";

export default createStore(
  goalDetailsReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
