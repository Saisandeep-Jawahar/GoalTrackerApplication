import axios from "axios";
import { convertGoalDetails } from "./convertor";
import { toast } from "react-toastify";
import { appendToFormData, getSessionId } from "./utilities";
import CONFIG from "./config-service";
import { teamGoals } from "./duplicateDataSource";

const GoalTrackerServiceRootPath = `${CONFIG.GOAL_TRACKER_SERVICE}/employeeGoal`;
const EmployeeServiceValidatePath = `${CONFIG.EMPLOYEES_SERVICE}/authenticateUser/validatePath`;
const EmployeeServiceDetailsPath = `${CONFIG.EMPLOYEES_SERVICE}/employees/details/`;
const apiInstance = axios.create({
  baseURL: "",
});
apiInstance.defaults.headers.common["JSESSIONID"] = getSessionId("JSESSIONID");

export let EmployeeID = 39393;
// export let EmployeeID = null;
// export const EmployeeID = 41550;

// ------------------------------- Get employee ID ----------------------------

export const getEmployeeID = async (callback) => {
  try {
    let response = await apiInstance.get(EmployeeServiceValidatePath);
    EmployeeID = await response.data.employeeId;
  } catch (error) {
    console.log("could not fetch employee details: ", error);
  }
  getEmployeeDetails(callback, EmployeeID);
};
// ----------------------------- End of get employee ID ----------------------

// --------------------------------- Employee service----------------------------
export const getEmployeeDetails = (callback, employeeID) => {
  let id = employeeID ? employeeID : EmployeeID;
  apiInstance.get(EmployeeServiceDetailsPath + id).then((res) => {
    callback(res.data);
  });
};
// -------------------------------- End of employee service ---------------------

// ----------------------- get suggestion list for dropdown ---------------------
export const fetchAllGoalTemplate = (callback) => {
  apiInstance
    .get(GoalTrackerServiceRootPath + `/fetchAllGoalTypes`)
    .then((res) => {
      callback(res.data);
    });
};
export const fetchAllGoalCategories = (callback) => {
  apiInstance
    .get(GoalTrackerServiceRootPath + `/fetchAllGoalCategories`)
    .then((res) => {
      callback(res.data);
    });
};
export const fetchAllGoalStatus = (callback) => {
  apiInstance
    .get(GoalTrackerServiceRootPath + `/fetchAllGoalStatus`)
    .then((res) => {
      callback(res.data);
    });
};
// ----------------------  end of get suggestion list for dropdown ------------------

// ---------------------- goals service--------------------------------------
export const fetchGoals = (setGoals, toastMessage, fetchTeamGoals) => {
  // this is hard coded code, I will remove after team goals API integrated
  if (fetchTeamGoals) {
    setGoals(convertGoalDetails(teamGoals));
  }
  // --------------------- end --------------------------------------------

  const requestPayload = {
    employeeId: EmployeeID,
  };
  apiInstance
    .post(
      `${GoalTrackerServiceRootPath}${
        fetchTeamGoals
          ? "/fetchTeamGoalsByReporterId"
          : "/fetchAllGoalByEmployeeId"
      }`,
      requestPayload
    )
    .then((res) => {
      let responseData = convertGoalDetails(res.data);
      setGoals(responseData);
      toastMessage &&
        toastMessage.length &&
        toast.info(toastMessage, {
          newestOnTop: true,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          pauseOnHover: true,
          autoClose: 2000,
        });
    });
};

export const addGoals = (requestPayload, setGoals) => {
  const data = appendToFormData(requestPayload);
  apiInstance
    .post(GoalTrackerServiceRootPath + `/addGoal`, data)
    .then((res) => {
      fetchGoals(setGoals, "Your Goal has been added successfully");
    });
};

export const updateGoal = (requestPayload, file, setGoals) => {
  const data = appendToFormData(requestPayload, file);
  apiInstance
    .post(GoalTrackerServiceRootPath + `/updateGoal`, data)
    .then((res) => {
      fetchGoals(setGoals, "Your Goal has been updated successfully");
    });
};

export const downloadFile = (goalId) =>
  `${GoalTrackerServiceRootPath}/downloadAttachment/${goalId}`;

export const deleteGoal = (goalId, setGoals) => {
  apiInstance
    .get(GoalTrackerServiceRootPath + "/deleteGoal/" + goalId)
    .then((res) => {
      fetchGoals(setGoals, "Your Goal has been deleted successfully");
    });
};
// --------------------end of goals service ---------------------------

// -------------------notification service------------------------------
export const getNotificationList = (callback, employeeID) => {
  // let id = employeeID ? employeeID : EmployeeID;
  // apiInstance.get(EmployeeServiceDetailsPath + id).then((res) => {
  //   callback(res.data);
  // });
  let notificationList = [
    {
      id: 31,
      from: "Karthik Muthusamy",
      content: "approved your goal 'POC on ReactJS'.",
      updatedDate: new Date(2021, 7, 18),
      viewed: false,
    },
    {
      id: 28,
      from: "Ram Kumar",
      content: "updated the rating for your goal 'Create goaltracker app'.",
      updatedDate: new Date(2021, 8, 18),
      viewed: false,
    },
  ];
  callback(notificationList);
};
// ------------------- end of notification service------------------------------
