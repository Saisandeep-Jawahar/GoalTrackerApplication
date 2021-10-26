export const convertGoalDetails = (goals) => {
  let updatedGoals = [];
  for (const goal of goals) {
    let { pk, categoryName, goalTitle, status, tags, ...remainingData } = goal;

    let updatedGoal = {
      goalId: pk,
      title: goalTitle,
      type: categoryName,
      state: status,
      tags: covertTagsToArray(tags),
      ...remainingData,
    };
    updatedGoals.push(updatedGoal);
  }
  return updatedGoals;
};

const covertTagsToArray = (tags) => {
  if (tags === null) {
    return [];
  }
  let updatedTags = tags.replaceAll("[", "").replaceAll("]", "");
  if (updatedTags.includes(",")) {
    updatedTags = [...new Set(updatedTags.split(","))];
    updatedTags = updatedTags.map((tag) => tag.trim());
  } else {
    updatedTags = [updatedTags.trim()];
  }
  return updatedTags;
};

export const nameMappingWithId = (details) => {
  let result = {};
  for (const item of details) {
    result[item.name] = item.id;
  }
  return result;
};

export const statusMappingWithPk = (details) => {
  let result = {};
  for (const item of details) {
    result[item.status] = item.pk;
  }
  return result;
};

export const convertObjectToArray = (objectData) => {
  let output = [];
  for (const item in objectData) {
    if (Object.hasOwnProperty.call(objectData, item)) {
      output.push(item);
    }
  }
  return output;
};
