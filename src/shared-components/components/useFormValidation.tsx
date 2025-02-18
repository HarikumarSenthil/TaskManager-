import { useState } from "react";

interface ValidationRule {
  required?: { value: boolean; message: string };
}

interface ValidationErrors {
  [key: string]: string;
}

const useFormValidation = (formData: any, validations: { [key: string]: ValidationRule }) => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validate = () => {
    const newErrors: ValidationErrors = {};
    
    Object.keys(validations).forEach((field) => {
      const rules = validations[field];
      if (rules.required && !formData[field]?.trim()) {
        newErrors[field] = rules.required.message;
      }
      // You can add other validation logic (e.g., regex, minLength) here
    });

    setErrors(newErrors);
    return newErrors;
  };

  return { errors, validate };
};

export default useFormValidation;
