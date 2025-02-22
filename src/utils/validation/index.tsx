import validationUtils from "./validationUtils";

const errorObj = (key: string, message: string, formErrors: any) => {
  formErrors[key] = message;
};

export const validationLogic = (
  key: string,
  value: string,
  validationRules: any, 
  formErrors: any,
  values: any
) => {
  if ( 
    validationRules &&
    validationRules[key]?.required &&
    validationUtils.isEmpty(value)
  ) {
    errorObj(key, validationRules[key]?.required.message, formErrors);
  }

  if (
    !validationUtils.isEmpty(value) &&
    validationRules &&
    validationRules[key]?.pattern
  ) {
    switch (validationRules[key]?.pattern.type) {
      case "email":
        if (!validationUtils.isEmail(value)) {
          errorObj(key, validationRules[key]?.pattern.message, formErrors);
        }
        break;
      case "name":
        if (!validationUtils.isName(value)) {
          errorObj(key, validationRules[key]?.pattern.message, formErrors);
        }
        break;
      case "mobile":
        if (!validationUtils.isMobile(value)) {
          errorObj(key, validationRules[key]?.pattern.message, formErrors);
        }
        break;
      case "positiveNonzeroFloat":
        if (!validationUtils.isPositiveNonzeroFloat(value)) {
          errorObj(key, validationRules[key]?.pattern.message, formErrors);
        }
        break;
      case "positiveFloat":
        if (!validationUtils.isPositiveFloat(value)) {
          errorObj(key, validationRules[key]?.pattern.message, formErrors);
        }
        break;
      case "employeeId":
        if (!validationUtils.isEmployeeId(value)) {
          errorObj(key, validationRules[key]?.pattern.message, formErrors);
        }
        break;
      case "password":
        if (!validationUtils.isValidPassword(value)) {
          errorObj(key, validationRules[key]?.pattern.message, formErrors);
        }
        break;
      case "deviceNumber":
        if (!validationUtils.isDeviceNumber(value)) {
          errorObj(key, validationRules[key]?.pattern.message, formErrors);
        }
        break;
      case "panCardNumber":
        if (!validationUtils.isPanCardNumber(value)) {
          errorObj(key, validationRules[key]?.pattern.message, formErrors);
        }
        break;
      case "adhaarCardNumber":
        if (!validationUtils.isAdhaarCardNumber(value)) {
          errorObj(key, validationRules[key]?.pattern.message, formErrors);
        }
        break;
      case "ifscCode":
        if (!validationUtils.isIFSC_Code(value)) {
          errorObj(key, validationRules[key]?.pattern.message, formErrors);
        }
        break;
      case "leaveReason":
        if (!validationUtils.isValidLeaveReason(value)) {
          errorObj(key, validationRules[key]?.pattern.message, formErrors);
        }
        break;
      default:
        return null;
    }
  }
  if (
    !validationUtils.isEmpty(value) &&
    validationRules &&
    validationRules[key]?.customValidation
  ) {
    switch (validationRules[key]?.customValidation.type) {
      case "isDependent":
        if (
          !validationUtils.isDependentFieldFilled(
            validationRules[key]?.customValidation.dependentOn,
            values[validationRules[key]?.customValidation.dependentOn]
          )
        ) {
          errorObj(
            key,
            validationRules[key]?.customValidation.message,
            formErrors
          );
        }
        break;
      case "notFutureDate":
        if (!validationUtils.isNotFutureDate(value)) {
          errorObj(
            key,
            validationRules[key]?.customValidation.message,
            formErrors
          );
        }
        break;
      case "isDuplicate":
        if (
          !validationUtils.isDuplicate(
            value,
            values[validationRules[key]?.customValidation.fieldToBeCompared]
          )
        ) {
          errorObj(
            key,
            validationRules[key]?.customValidation.message,
            formErrors
          );
        }
        break;
      case "isAfterStartDate":
        if (
          validationRules[key]?.customValidation.isStartDate &&
          values[validationRules[key]?.customValidation.dateToCompare]
        ) {
          if (
            !validationUtils.isAfterStartDate(
              value,
              values[validationRules[key]?.customValidation.dateToCompare]
            )
          ) {
            errorObj(
              validationRules[key]?.customValidation.dateToCompare,
              validationRules[key]?.customValidation.message,
              formErrors
            );
          } else {
            errorObj(
              validationRules[key]?.customValidation.dateToCompare,
              "",
              formErrors
            );
          }
        } else if (
          values[validationRules[key]?.customValidation.dateToCompare]
        ) {
          if (
            !validationUtils.isAfterStartDate(
              values[validationRules[key]?.customValidation.dateToCompare],
              value
            )
          ) {
            errorObj(
              key,
              validationRules[key]?.customValidation.message,
              formErrors
            );
          }
        }
        break;
      default:
        return null;
    }
  }
};

export const validateFormField = (
  fieldName: string,
  fieldValue: string,
  validationRules: any,
  values?: any
) => {
  const fieldErrors: any = {};
  if (validationRules && validationRules?.required) {
    if (validationUtils.isEmpty(fieldValue)) {
      fieldErrors[fieldName] = validationRules.required.message;
    }
  }
  if (
    !validationUtils.isEmpty(fieldValue) &&
    validationRules &&
    validationRules?.pattern
  ) {
    switch (validationRules?.pattern.type) {
      case "email":
        if (!validationUtils.isEmail(fieldValue)) {
          fieldErrors[fieldName] = validationRules.pattern.message;
        }
        break;
      case "name":
        if (!validationUtils.isName(fieldValue)) {
          fieldErrors[fieldName] = validationRules.pattern.message;
        }
        break;
      case "mobile":
        if (!validationUtils.isMobile(fieldValue)) {
          fieldErrors[fieldName] = validationRules.pattern.message;
        }
        break;
      case "positiveNonzeroFloat":
        if (!validationUtils.isPositiveNonzeroFloat(fieldValue)) {
          fieldErrors[fieldName] = validationRules.pattern.message;
        }
        break;
      case "positiveFloat":
        if (!validationUtils.isPositiveFloat(fieldValue)) {
          fieldErrors[fieldName] = validationRules.pattern.message;
        }
        break;
      case "employeeId":
        if (!validationUtils.isEmployeeId(fieldValue)) {
          fieldErrors[fieldName] = validationRules.pattern.message;
        }
        break;
      case "password":
        if (!validationUtils.isValidPassword(fieldValue)) {
          fieldErrors[fieldName] = validationRules.pattern.message;
        }
        break;
      case "deviceNumber":
        if (!validationUtils.isDeviceNumber(fieldValue)) {
          fieldErrors[fieldName] = validationRules.pattern.message;
        }
        break;

      case "panCardNumber":
        if (!validationUtils.isPanCardNumber(fieldValue)) {
          fieldErrors[fieldName] = validationRules.pattern.message;
        }
        break;
      case "adhaarCardNumber":
        if (!validationUtils.isAdhaarCardNumber(fieldValue)) {
          fieldErrors[fieldName] = validationRules.pattern.message;
        }
        break;
      case "ifscCode":
        if (!validationUtils.isIFSC_Code(fieldValue)) {
          fieldErrors[fieldName] = validationRules.pattern.message;
        }
        break;
      case "leaveReason":
        if (!validationUtils.isValidLeaveReason(fieldValue)) {
          fieldErrors[fieldName] = validationRules.pattern.message;
        }
        break;

      default:
        return null;
    }
  }
  if (
    !validationUtils.isEmpty(fieldValue) &&
    validationRules &&
    validationRules?.customValidation
  ) {
    switch (validationRules?.customValidation.type) {
      case "isDependent":
        if (
          !validationUtils.isDependentFieldFilled(
            validationRules?.customValidation.dependentOn,
            values[validationRules?.customValidation.dependentOn]
          )
        ) {
          fieldErrors[fieldName] = validationRules.customValidation.message;
        }
        break;
      case "notFutureDate":
        if (!validationUtils.isNotFutureDate(fieldValue)) {
          fieldErrors[fieldName] = validationRules.customValidation.message;
        }
        break;
      case "isDuplicate":
        if (
          !validationUtils.isDuplicate(
            fieldValue,
            values[validationRules?.customValidation.fieldToBeCompared]
          )
        ) {
          fieldErrors[fieldName] = validationRules.customValidation.message;
        }
        break;
      case "isAfterStartDate":
        if (
          validationRules?.customValidation.isStartDate &&
          values[validationRules?.customValidation.dateToCompare]
        ) {
          if (
            !validationUtils.isAfterStartDate(
              fieldValue,
              values[validationRules?.customValidation.dateToCompare]
            )
          ) {
            fieldErrors[validationRules?.customValidation.dateToCompare] =
              validationRules.customValidation.message;
          } else {
            fieldErrors[validationRules?.customValidation.dateToCompare] = "";
          }
        } else if (values[validationRules?.customValidation.dateToCompare]) {
          if (
            !validationUtils.isAfterStartDate(
              values[validationRules?.customValidation.dateToCompare],
              fieldValue
            )
          ) {
            fieldErrors[fieldName] = validationRules.customValidation.message;
          }
        }
        break;
      default:
        return null;
    }
  }
  return fieldErrors;
};

export const validateForm = (values: any, validationRules: any, visibilityArr: any) => {
  let formErrors: Record<string, any> = {};

  Object.keys(values).forEach((key) => {
    if (!visibilityArr?.includes(key)) {
      const value = values[key];
      let fieldErrors: Record<string, any> = {};

      // Check if validation rules exist for the field
      if (validationRules[key]) {
        const rules = validationRules[key];

        // 🔹 Required Field Check
        if (rules.required && (!value || value.trim() === "")) {
          fieldErrors[key] = `${key} is required`;
        }

        // 🔹 Minimum Length Check
        if (rules.minLength && value.length < rules.minLength) {
          fieldErrors[key] = `${key} must be at least ${rules.minLength} characters long`;
        }

        // 🔹 Maximum Length Check
        if (rules.maxLength && value.length > rules.maxLength) {
          fieldErrors[key] = `${key} must not exceed ${rules.maxLength} characters`;
        }

        // 🔹 Pattern Check (Fix for `.test()` error)
        if (rules.pattern instanceof RegExp) {
          if (!rules.pattern.test(value)) {
            fieldErrors[key] = `Invalid ${key} format`;
          }
        } else if (rules.pattern) {
          console.warn(`Invalid pattern for ${key}:`, rules.pattern);
        }
      }

      // Assign field errors to `formErrors` if any exist
      if (Object.keys(fieldErrors).length > 0) {
        formErrors[key] = fieldErrors[key]; // Directly store error message
      }
    }
  });

  return Object.keys(formErrors).length > 0 ? formErrors : {}; // Return empty object if no errors
};


