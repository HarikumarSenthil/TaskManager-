"use client";

import React, { useEffect, useState } from "react";
import Form from "../../shared-components/ui/Form";
import { useValidation } from "../validation/hooks";
import Button from "@/shared-components/ui/Button";

interface FormField {
  id: string;
  class?: string;
  fieldName: string;
  elementType: string;
  type?: string;
  placeholder?: string;
  options?: string[] | { id: string; label: string; value: string; }[];
  visible?: boolean;
  dependencies?: any[];
}

interface FormRenderProps {
  formHeading?: string;
  formSubHeading?: string;
  formData: Record<string, FormField>;
  formLabelStyle?: string;
  formStyle?: string;
  formColumn?: number;
  headingStyle?: string;
  initialStaticData: Record<string, any>;
  btnConfig?: any[];
  btnStyle?: string;
  validations?: any;
  resetFormHandler?: () => Promise<void>;
  submitForm?: (values: Record<string, any>) => Promise<any>;
  buttonPlace?: boolean;
}

const FormRender: React.FC<FormRenderProps> = ({
  formHeading,
  formSubHeading,
  formData,
  formLabelStyle = "text-base mb-4",
  formColumn = 1,
  headingStyle,
  formStyle,
  btnConfig,
  btnStyle,
  initialStaticData,
  validations,
  resetFormHandler,
  submitForm,
  buttonPlace = false,
}) => {
  const [updatedData, setUpdatedData] = useState<Record<string, FormField>>(formData);

  useEffect(() => {
    setUpdatedData(formData);
  }, [formData]);

  const [
    errors,
    values,
    touched,
    markAllTouched,
    handleChange,
    handleBlur,
    resetForm,
    validateFormData,
    setValues,
    setErrors,
  ] = useValidation(initialStaticData, validations, []);

  useEffect(() => {

    if (initialStaticData) {
      setValues((prevValues: Record<string, any>) => ({
        ...prevValues,
        ...initialStaticData,
      }));
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!event?.target) {
      console.warn("Invalid event in handleInputChange", event);
      return;
    }
  
    const { name, type, value } = event.target;
    const formattedKey = name.trim().replace(/\s+/g, "_");
  
    console.log("CHECKING VALUES", name, "Value:", value);
  
    setValues((prevValues: Record<string,any>) => {
      const updatedValues = {
        ...prevValues,
        [formattedKey]: value, 
      };
  
      console.log("Updated State:", updatedValues); 
  
      return updatedValues;
    });
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("ValidationForm Results!!!!.....",)
    if (!submitForm) {
      return;
    }
    length = await validateFormData();
     const Errorlength = Object.keys(errors).length
  
    if (Errorlength > 0) {
      markAllTouched(); 
      setErrors(errors); 
      console.log("Errors", errors)
      console.log("LENGTH VALUE",errors.length )
      return;
    }
  
    console.log("Form is valid, submitting with values:", values);
  
    try {
      const response = await submitForm(values);
      console.log("Form submitted successfully:", response);
    } catch (error) {
      console.error("Error in submitForm:", error);
    }
  };
  
  
  

  
  const resetDataHandler = async () => {
    if (resetFormHandler) {
      await resetFormHandler();
    }
    resetForm();
  };

  return (
    <div className="bg-white p-6 mt-2">
      {formHeading && <h3 className={`font-bold text-xl mb-4 ${headingStyle}`}>{formHeading}</h3>}
      {formSubHeading && (
        <h3 className={`font-bold text-base tracking-wide text-secondary mb-10 ${headingStyle}`}>
          {formSubHeading}
        </h3>
      )}

      <form noValidate className={`${formStyle}`} onSubmit={handleSubmit}>
        <div className={`grid grid-cols-${formColumn} gap-6`}>
          {Object.keys(updatedData).map((fieldKey, index) => {
            const fieldData = updatedData[fieldKey];
            return (
              <div key={fieldData.id || index} className={`${fieldData.class || ""}`}>
                <label className={formLabelStyle}>{fieldData.fieldName}</label>
                <Form
                  formData={fieldData}
                  handleChange={handleInputChange}
                  handleBlur={handleBlur}
                  formValues={values} 
                  touched={touched}
                  errors={errors}
                  updatedData={updatedData}
                  setUpdatedData={setUpdatedData}
                />


                {touched[fieldData.id] && errors[fieldData.id] && (
                  <span className="text-red-500 text-sm">{errors[fieldData.id]}</span>
                )}
              </div>
            );
          })}
        </div>

    
        <div className={btnStyle}>
          {btnConfig?.map((btn, index) => (
            <Button
              key={index}
              type={btn.type}
              size={btn.size}
              onClick={btn.onClick ? btn.onClick : btn.type === "reset" ? resetDataHandler : undefined}
              variant={btn.variant}
              className={btn.className}
              precedingText={btn.precedingText}
              loading={btn.loading}
              disabled={btn.disabled}
            >
              {btn.children}
            </Button>
  ))}
</div>

      </form>
    </div>
  );
};

export default FormRender;
