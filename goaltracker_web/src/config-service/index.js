import { CONFIG as DEV_CONFIG } from "./development";

let CONFIG = {
  GOAL_TRACKER_SERVICE: "http://localhost:9083/PT", // to have the production url as default
  EMPLOYEES_SERVICE: "http://localhost:9082/v1", // to have the production url as default
};

if (process.env.NODE_ENV === "development") {
  CONFIG = {
    ...CONFIG,
    ...DEV_CONFIG,
  };
}

export default CONFIG;
