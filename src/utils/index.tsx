
import { format, formatDistance, intervalToDuration, parse } from "date-fns";
import { NextResponse } from "next/server";
import { SyntheticEvent } from "react";
import Joi from "joi";
import validationMessages from "./validation/validationMessages";
import validationRegex from "./validation/validationRegex";
import { enUS } from "date-fns/locale";
import * as XLSX from "xlsx";

export const customizeEvent = (
  event: SyntheticEvent | Event,
  name: string,
  value: string | boolean | any[]
): void => {
  Object.defineProperty(event, "target", {
    writable: true,
    value: {
      name: name,
      value: value,
    },
  });
};

export const isArrayOfObjects = (array: Array<any>) => {
  const isObject =
    Array.isArray(array) &&
    array?.every((el) => {
      if (typeof el === "object" && el !== null) {
        return true;
      } else {
        return false;
      }
    });
  return isObject;
};

export const getItemFromLocalStorage = (key: string) => {
  let item;
  item = typeof window !== "undefined" ? localStorage.getItem(key) : "";
  return item ? item : "";
};

export const clearLocalStorage = () => {
  if (typeof window !== "undefined") {
    localStorage.clear();
  }
};

// export const trackEvent = (event: GAEvent, customPayload?: Record<any, string>): void => {
//     if (window?.dataLayer) {
//         const customEvent = {
//             event: 'user_actions',
//             eventAction: event?.action,
//             eventCategory: event?.category,
//             eventLabel: event?.label,
//             eventValue: event?.value,
//             cd_timestamp: Date.now().toString(),
//             cd_userID: undefined,
//             ...customPayload,
//         };
//         if (getCookie('cs-login-policy') && getCookie('cs-login-auth')) {
//             customEvent.cd_userID = getCookie('cs-login-policy');
//         }
//         window.dataLayer.push(customEvent);
//     }
// };

export const getError = (
  statusCode: number,
  message = ""
): Record<any, any> => {
  let errorMessage;
  let toasterCb;
  switch (statusCode) {
    case 500:
      errorMessage =
        "Oops! Something went wrong. Please try again after some time.";
      break;
    case 502:
    case 503:
    case 504:
      errorMessage =
        "We're currently experiencing technical difficulties. Please try again later.";
      break;
    case 400:
      errorMessage = "Invalid or Bad Request.";
      break;
    case 401:
      errorMessage = "You are unauthorized to make this request.";
      break;
    case 404:
      errorMessage =
        "Sorry! The resource you requested is not found. Try again.";
      break;
    default:
      errorMessage =
        message ||
        "Oops! Something went wrong. Please try again after some time.";
  }
  return { errorMessage, toasterCb };
};

export const requestWrapper = async (
  res: any,
  dispatch?: any,
  onSuccess?: () => void,
  onFailure?: () => any,
  toast = true
): Promise<any> => {
  let defaultError;
  let customErrorMessage;
  let customFunc;
  let showToast = toast;
  let toastTime = 3000;
  let customErrorCode;
  try {
    if (res?.errors || res?.error) {
      if (typeof onFailure === "function") {
        const customFailureObj = onFailure();
        customErrorMessage = customFailureObj?.customErrorMessage;
        customFunc = customFailureObj?.customFunc;
        customErrorCode = customFailureObj?.customErrorCode;
        showToast =
          customFailureObj?.showToast !== undefined
            ? customFailureObj?.showToast
            : true;
        toastTime = customFailureObj?.toastTime || toastTime;
      }
      if (showToast) {
        if (customErrorCode) {
          const { errorMessage } = getError(customErrorCode);
          customErrorMessage = errorMessage;
        }
        // dispatch(
        //   showToaster({
        //     description: customErrorMessage,
        //     toasterCb: customFunc,
        //     timer: toastTime,
        //   })
        // );
      }
    } else if (typeof onSuccess === "function") {
      const successObj: any = onSuccess();
      const successMsg = successObj?.message;
      if (successMsg && showToast) {
        // dispatch(
        //   showToaster({
        //     description: successMsg,
        //     timer: toastTime,
        //   })
        // );
      }

      return res;
    }
    return res;
  } catch (err: any) {
    // dispatch({
    //   type: API_CALL_RESOLVED,
    // });
    const { errorMessage } = getError(err.code);
    // if (showToast) {
    //   dispatch(
    //     showToaster({
    //       description: errorMessage,
    //       timer: toastTime,
    //     })
    //   );
    // }
    throw err;
  }
};

export const noOperation = (e?: Event | SyntheticEvent): void => {
  // no operation;
  if (e && typeof e.preventDefault === "function") e.preventDefault();
};

export const getFirstName = (name: string): string => {
  const regex = /(Mr|Mr.|MR|MR.|Ms|Ms.|Miss|Mrs|Dr|Sir)(\.?)\s/;
  const match = regex.exec(name);
  let n = "";
  if (match !== null) {
    n = name.replace(match[0], "").split(" ")[0];
  } else {
    n = name;
  }
  return n;
};

export const getNameInitials = (name: string): string => {
  let initials: string = "";
  const names = name?.split(" ");
  const regex = /Mr|Mr.|MR|MR.|Ms|Ms.|Miss|Mrs|Mrs.|Dr|Sir\s/;
  if (names) {
    const salutation = regex.exec(names[0]);
    const firstName = names[0] && salutation ? names[1] : names[0];
    const lastName = names.length > 1 ? names[names.length - 1] : "";
    initials =
      firstName && lastName
        ? firstName.charAt(0) + lastName.charAt(0)
        : firstName.charAt(0);
  }
  return initials;
};

// export const logoutHandler = async (redirectUrl = ROUTES.LOGOUT.path) => {
//   localStorage.clear();
// };

export const getCurrentDevice = (): string => {
  if (window?.screen) {
    if (window.screen.width >= 1280) return "desktop";
    if (window.screen.width >= 768) return "laplet";
    return "mobile";
  }
  return "mobile";
};

export const calculateFullAge = (
  date: string,
  endDate?: string,
  dateFormat?: string
): Record<any, any> => {
  const dateFmt = dateFormat || "dd/MM/yyyy";
  const birthDate = parse(date, dateFmt, new Date());
  const end = endDate && parse(endDate, dateFmt, new Date());
  const { years, months, days } = intervalToDuration({
    start: birthDate,
    end: end || new Date(),
  });
  return { years, months, days };
};

export const getSplitDate = (date: string, dateFormat = "dd/MM/yyyy"): any => {
  const dateVal = parse(date, dateFormat, new Date());
  const dateNum = `${format(dateVal, "do")}`;
  const month = `${format(dateVal, "MMM")}`;
  const year = `${format(dateVal, "yy")}`;
  return `${dateNum} ${month}' ${year}`;
};

export const isAsyncFn = (fn: Record<any, any>): boolean => {
  return (
    fn instanceof
    (async () => {
      /** * */
    }).constructor
  );
};

// export const getFileExtension = (filename: string): string => {
//   return filename.split(".").pop();
// };

export const repositionArrayElement = (
  arrayToUpdate: any[],
  elementToReposition: any,
  newIndex: number
): any[] => {
  if (
    arrayToUpdate.length === 1 ||
    arrayToUpdate.indexOf(elementToReposition) === newIndex ||
    newIndex > arrayToUpdate.length - 1 ||
    !arrayToUpdate.includes(elementToReposition)
  ) {
    return arrayToUpdate;
  }
  const array = [...arrayToUpdate];
  array.splice(array.indexOf(elementToReposition), 1);
  array.splice(newIndex, 0, elementToReposition);
  return array;
};

export const getMonthName = (monthNum: number): string => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[monthNum];
};

export const dateAndTimeFormatter = (dateToFormat: Date): Record<any, any> => {
  const date = new Date(dateToFormat).getDate();
  const day = new Date(dateToFormat).getDay();
  const finalDate = date >= 10 ? date : `0${date}`;
  const month = new Date(dateToFormat).getMonth();
  const finalMonth: any = month + 1 > 9 ? month + 1 : `0${month + 1}`;
  const formattedMonth = getMonthName(month);
  const formattedDay = getDayName(day);
  const year = new Date(dateToFormat).getFullYear();
  const formattedDate = `${finalDate} ${formattedMonth} ${year}`;
  const formattedDateMonth = `${finalDate} ${formattedMonth}`;
  const formattedDateUpdate = `${finalMonth}/${finalDate}/${year}`;
  const formattedReversedUpdateDate = `${year},${finalMonth},${finalDate}`;
  let hours = new Date(dateToFormat).getHours();
  const mins = new Date(dateToFormat).getMinutes();
  const time = hours >= 12 ? "PM" : "AM";
  hours %= 12;
  const formattedHours = hours.toString().padStart(2, "0") || 12;
  const formattedMins = mins.toString().padStart(2, "0");
  const formattedTime = `${formattedHours}:${formattedMins} ${time}`;
  return (
    dateToFormat && {
      formattedTime,
      formattedDate,
      formattedDateUpdate,
      formattedDay,
      month,
      date,
      formattedDateMonth,
      formattedReversedUpdateDate,
    }
  );
};

export const greeting = () => {
  const hour = new Date().getHours();
  const welcomeTypes = ["Good morning", "Good afternoon", "Good evening"];
  let welcomeText = "";
  if (hour < 12) welcomeText = welcomeTypes[0];
  else if (hour < 18) welcomeText = welcomeTypes[1];
  else welcomeText = welcomeTypes[2];
  return welcomeText;
};

export const formatArray = (key: string, arr: any) => {
  const resArr = arr?.map((item: { [x: string]: any }, index: number) => {
    return { id: index, value: item[key], label: item[key], name: item[key] };
  });
  return resArr;
};

export const decodeUserToken = () => {
  let token;
  if (typeof localStorage !== "undefined") {
    token = localStorage.getItem("token");
  }
  const userDetails = token && JSON.parse(atob(token.split(".")[1]));
  return userDetails || "";
};

export const getFilteredObj = (arr: any, filterCondition: any, key: string) => {
  const obj = arr?.filter((item: any) => {
    return item[key] === filterCondition;
  });
  return obj;
};

export const durationCalculator = (sourceDate: string) => {
  const today = new Date();
  const joinedDate = new Date(sourceDate);
  let monthsNum = (today.getFullYear() - joinedDate.getFullYear()) * 12;
  monthsNum -= joinedDate.getMonth();
  monthsNum += today.getMonth();
  const months = monthsNum % 12;
  const year = Math.floor(monthsNum / 12);
  let duration = "";
  if (year && months) {
    if (year > 1 && months > 1) {
      duration = `${year} years ${months} months`;
    } else if (year === 1 && months > 1) {
      duration = `${year} year ${months} months`;
    } else if (year > 1 && months === 1) {
      duration = `${year} years ${months} month`;
    } else if (year === 1 && months === 1) {
      duration = `${year} year ${months} month`;
    }
  } else if (!months && year) {
    if (year === 1) {
      duration = `${year} year`;
    } else {
      duration = `${year} years`;
    }
  } else if (!year && months) {
    if (months === 1) {
      duration = `${months} month`;
    } else {
      duration = `${months} months`;
    }
  }
  return duration;
};

export const getDayName = (dayNum: number): string => {
  const weeks = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weeks[dayNum];
};

export const getFinancialYear = () => {
  let financialYearStart, financialYearEnd;
  const date = new Date();

  // const lastMonth = new Date(date).setDate(1);
  // const crossingYear=new Date(lastMonth)
  // console.log(crossingYear?.getDate(),crossingYear?.getMonth())

  const currentYear = date.getFullYear();
  const currentDate = date.getDate();
  const currentMonth = date.getMonth() + 1;
  const prevMonth = date.getMonth();
  const nextYear = currentYear + 1;
  const prevYear = currentYear - 1;
  const currentMonthDate = `${currentYear},${currentMonth},${currentDate}`;
  const prevMonthDate = `${prevMonth == 0 ? prevYear : currentYear},${
    prevMonth == 0 ? "12" : prevMonth
  },01`;

  if (currentMonth > 3) {
    financialYearStart = currentYear + ",04,01";
    financialYearEnd = nextYear + ",03,31";
  } else {
    financialYearStart = prevYear + ",04,01";
    financialYearEnd = currentYear + ",03,31";
  }
  return {
    financialYearStart,
    financialYearEnd,
    currentMonthDate,
    prevMonthDate,
  };
};

export const getTimeDifference = (sourceDate: string) => {
  const daysDiff = formatDistance(new Date(sourceDate), new Date());
  return daysDiff;
};

// Function to calculate duration in days between two dates
export const calculateDateDuration = (startDate: Date, endDate: Date) => {
  const timeDifference: number =
    new Date(endDate).getTime() - new Date(startDate).getTime();
  const durationInDays: number = timeDifference / (1000 * 3600 * 24);
  return Math.floor(durationInDays + 1);
};

//view documents
export const viewDocumentsHandler = async (e: any) => {
  const url = e?.attachment ? e?.attachment[0] : e?.filePath[0];
  const newTab = window.open(url, "_blank");
  if (newTab) {
    newTab.focus();
  } else {
    window.location.href = url;
  }
};

//initial letter will get get Capital
export const letterFormater = (value: any) => {
  let result = value?.charAt(0)?.toUpperCase() + value?.slice(1) || "";
  return result;
};

export const ErrorHandler = (error: any) => {
  console.log("error", error.name, error, error.message);

  if (error.name === "ValidationError") {
    let validationErrors: any = {};
    for (const field in error.errors) {
      validationErrors = error.errors[field].message;
    }
    return NextResponse.json({ status: 400, message: validationErrors });
  } else if (error.name === "MongoServerError" && error.code === 11000) {
    const fieldName = Object.keys(error.keyPattern)[0];
    const duplicateValue = error.keyValue[fieldName];
    const duplicateErrorMessage = `The ${fieldName} '${duplicateValue}' already exists.`;
    return NextResponse.json({ status: 400, message: duplicateErrorMessage });
  } else if (error.name === "CastError") {
    const invalidField = error.path;
    return NextResponse.json({
      status: 400,
      message: `Invalid data type provided for field: ${invalidField}.`,
    });
  } else if (error.name === "MongooseError") {
    return NextResponse.json({
      status: 400,
      message: error.message,
    });
  } else if (error.name === "TypeError") {
    return NextResponse.json({
      status: 400,
      message: error.message,
    });
  } else if (error.name === "TimeoutError") {
    return NextResponse.json({
      status: 504,
      message: error.message,
    });
  } else {
    return NextResponse.json({
      message: "Internal server error.",
      status: 500,
      error:error,
    });
  }
};



const PASSWORD = {
  REGEXP: validationRegex.passwordRegex,
  MSG: validationMessages.isPassword,
  MINCHAR: 8,
  MAXCHAR: 20,
};
const pass = Joi.string()
  .regex(PASSWORD.REGEXP)
  .message(PASSWORD.MSG)
  .min(PASSWORD.MINCHAR)
  .required();

export const generateValidPassword = () => {
  const generateRandomPassword = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$!%*?&";
    let password = "";
    for (let i = 0; i < PASSWORD.MINCHAR; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
    }
    return password;
  };
  let password = generateRandomPassword();
  const { error } = pass.validate(password);

  while (error) {
    password = generateRandomPassword();
    const validationResult = pass.validate(password);

    if (!validationResult.error) {
      break;
    }
  }

  return password;
};

export const formatWithMonthName = (date: Date) => {
  return format(date, "dd MMM yyyy", { locale: enUS });
};

export const getLocalStorage = () => {
  if (typeof localStorage !== "undefined") {
    return localStorage.getItem("token");
  }
};

export const fileView = (blob: any) => {
  const blobUrl = URL.createObjectURL(blob);
  const link: any = document.createElement("a");
  link.href = blobUrl;
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

function convertToCSV(data: any) {
  const csvRows = [];
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(","));
  for (const rowData of data) {
    const values = headers.map((header) => {
      const escaped = ("" + rowData[header])?.replace(/"/g, '\\"');
      return `${escaped}`;
    });
    csvRows.push(values.join(","));
  }
  return csvRows.join("\n");
}

export const generateRandomFileName = (filename: string, format: string) => {
  const timestamp = new Date().getTime(); // Current timestamp
  // const randomString = Math.random().toString(36).substring(2, 8); // Random string of length 6
  return `${filename}_${timestamp}.${format}`; // Combining timestamp and random string
};
export const handleDownloadCSV = (data: any, file: string) => {
  const csvData = convertToCSV(data);
  const blob = new Blob([csvData]);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const fileName = generateRandomFileName(file, "csv");
  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const convertToXLSX = (data: any[]) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const xlsxData = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  return xlsxData;
};

export const handleDownloadXLS = (data: any[], file: string) => {
  const xlsxData = convertToXLSX(data);
  const blob = new Blob([xlsxData], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const fileName = generateRandomFileName(file, "xlsx");
  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
