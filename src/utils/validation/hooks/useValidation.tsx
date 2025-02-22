import { useState, useRef, useEffect } from "react";
import useDeepEffect from "./useDeepEffect";
import { validateForm, validateFormField } from "../";
import validationUtils from "../validationUtils";

const useValidation: any = (
  formData: any,
  validationRules: any,
  visibilityArr?: any,
  autoValues?: any
) => {
  const data = Array.isArray(formData) ? [...formData] : { ...formData };
  const [values, setValues] = useState(data);
  const [array, setArray] = useState<any>();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState({});
  const ref = useRef();
  useDeepEffect(() => {
    setValues({ ...values, ...data });
  }, [data]);


  useEffect(() => {
    setValues({ ...values, ...autoValues });
  }, [autoValues]);

  useEffect(() => {
    Object.keys(values).map((el) => {
      if (Array.isArray(values[el])) {
        setArray(values[el]);
      }
    });
  }, [data]);

  const fieldDomRefs: any = {}; 

  const init = () => {
    initFieldDomRefs();
  };
  const initFieldDomRefs = () => {
    Object.keys(data).forEach((key) => {
      fieldDomRefs[key] = ref;
    });
  };

  init();

  const getFieldData = (event: any) => {
    if (!event || !event.target) {
      
      return { name: "", value: "" };
    }
  
    const { name, value, type, checked } = event.target;
    const fieldName = name;
    const fieldValue = type === "checkbox" ? checked : value;
  
    return { fieldName, fieldValue,type,checked };
  };
  
  const handleChange = (event: any) => {
    const { fieldName, fieldValue, type, checked } = getFieldData(event);

    if (type === "checkbox") {
      if (checked) {
        Array.isArray(values[fieldName])
          ? values[fieldName].push(fieldValue)
          : (values[fieldName] = checked);
      } else {
        if (Array.isArray(values[fieldName])) {
          const index = values[fieldName].indexOf(fieldValue);
          if (index >= 0) {
            values[fieldName].splice(index, 1);
          }
        } else {
          values[fieldName] = checked;
        }
      }
      setValues({ ...values, [fieldName]: values[fieldName] });
    } else {
      setValues({ ...values, [fieldName]: fieldValue });
    }
  };

  const handleBlur = async (event: any) => {
     event?.preventDefault();
    if (event?.relatedTarget && event?.relatedTarget.type === "submit") {
      return; 
    }
    const { fieldName, fieldValue } = getFieldData(event);
    updateTouched(fieldName);
    if (!visibilityArr.includes(fieldName)) {
      const fieldError =
        validationRules &&
        validateFormField(
          fieldName,
          fieldValue,
          validationRules[fieldName],
          values
        );
      updateFormErrors(fieldName, fieldError);
    }
  };

  const updateTouched = (fieldName: string) => {
    if (Object.keys(touched).indexOf(fieldName) === -1) {
      setTouched({ ...touched, [fieldName]: true });
    }
  };

  const updateFormErrors = (fieldName: string, fieldError: any) => {
    if (validationUtils.isEmpty(fieldError)) {
      const updatedErrors: any = { ...errors };
      delete updatedErrors[fieldName];
      setErrors(updatedErrors);
    } else {
      setErrors({ ...errors, ...fieldError });
    }
  };

  const markAllTouched = () => {
    const touchedData: any = {};
    Object.keys(data).forEach((key) => {
      touchedData[key] = true;
    });
    setTouched(touchedData);
  };

  const validateFormData = async ()=> {  
    const valuesToValidate = { ...values };

    console.log("Validating values:", valuesToValidate);

    const validationErrors = await validateForm(valuesToValidate, validationRules, visibilityArr);
    console.log("Validation Errors:", validationErrors);

    setErrors(validationErrors);  

    focusFirstFieldWithError(validationErrors);

    let isValid = Object.keys(validationErrors).length === 0;
    console.log("IsValid",isValid) 
    return isValid
};





  const focusFirstFieldWithError = (validationErrors: any) => {
    if (!validationUtils.isEmpty(validationErrors)) {
      const firstFieldWithError = Object.keys(validationErrors)[0];
      if (
        fieldDomRefs[firstFieldWithError] &&
        fieldDomRefs[firstFieldWithError].current
      ) {
        fieldDomRefs[firstFieldWithError].current.focus();
      }
    }
  };

  const resetForm = () => {
    setValues(data);
    setErrors({});
    setTouched({});
  };

  return [
    errors,
    values,
    touched,
    markAllTouched,
    fieldDomRefs,
    handleChange,
    handleBlur,
    resetForm,
    validateFormData,
    setErrors,
    updateFormErrors,
  ];
};

export default useValidation;
