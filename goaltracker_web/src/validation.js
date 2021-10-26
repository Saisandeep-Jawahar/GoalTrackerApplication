export const validate = (validationList, value) => {
  let isValid = true;
  let validation = null;

  if (validationList.includes("required")) {
    validation = "required";

    if (Array.isArray(value)) {
      isValid = value.length > 0;
    } else if (!isDate(value)) {
      isValid = value !== null && value.trim() !== "";
    }
  }
  if (isValid && validationList.includes("email")) {
    validation = "email";
    isValid = validateEmail(value);
  }
  return { isValid, validation };
};

export const validateEmail = (value) => {
  //   const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+/;
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const result = emailRegex.test(value) ? true : false;
  return result;
};

export const isDate = (input) => {
  if (Object.prototype.toString.call(input) === "[object Date]") return true;
  return false;
};

export const moveItem = (currentValue, itemCount, isAddition) => {
  let result;
  if (isAddition) {
    result = currentValue === itemCount - 1 ? 0 : ++currentValue;
  } else {
    result = currentValue === 0 ? itemCount - 1 : --currentValue;
  }
  return result;
};

export function validateFileType(args) {
  var ext =
    args.currentTarget.value && args.currentTarget.value.match(/\.(.+)$/)[1];

  if (ext) {
    switch (ext.toLowerCase()) {
      case "jpg":
      case "jpeg":
      case "png":
      case "docx":
      case "pdf":
      case "zip":
        return true;
      case "":
        return false;
      default:
        alert('Please upload "jpg, jpeg, png, doc, docx, pdf, zip" files only');
        args.currentTarget.value = "";
        return false;
    }
  } else {
    alert('Please upload "jpg, jpeg, png, doc, docx, pdf, zip" files only');
    args.currentTarget.value = "";
    return false;
  }
}
