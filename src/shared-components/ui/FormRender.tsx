import React from "react";
import Input from "@/shared-components/ui/Input";
import RadioButton from "@/shared-components/ui/RadioButton";

interface FormRenderProps {
  formHeading: string;
  headingStyle?: string;
  formLabelStyle?: string;
  formData: Record<string, any>;
  formFields: {
    name: string;
    type: "text" | "radio";
    options?: { value: string; label: string }[];
  }[];
  formColumn?: number;
  formStyle?: string;
  btnConfig?: {
    label: string;
    className?: string;
  };
  submitForm: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onCancel: () => void;
  errors: Record<string, string>;
}

const FormRender: React.FC<FormRenderProps> = ({
  formHeading,
  headingStyle = "",
  formLabelStyle = "",
  formData,
  formFields,
  formColumn = 1,
  formStyle = "",
  btnConfig,
  submitForm,
  onChange,
  onCancel,
  errors,
}) => {
  return (
    <form onSubmit={submitForm} className={`bg-white shadow-md rounded-lg p-8 ${formStyle}`}>
      <h2 className={`text-xl font-semibold ${headingStyle}`}>{formHeading}</h2>
      <div className={`grid grid-cols-${formColumn} gap-4 mt-4`}>
        {formFields.map((field) => (
          <div key={field.name}>
            <label>{field.name}</label>
            {field.type === "text"  ? (
              <Input
                name={field.name}
                value={formData[field.name]}
                onChange={onChange}
                placeholder={`Enter ${field.name}`}
                error={errors[field.name]}
              />
            ) : field.type === "radio" && field.options ? (
              <div className="flex space-x-4 mt-2">
                {field.options.map((option) => (
                  <RadioButton
                    key={option.value}
                    id={`${field.name}-${option.value}`}
                    name={field.name}
                    value={option.value}
                    checked={formData[field.name] === option.value}
                    onChange={onChange}
                    label={option.label}
                  />
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <div className="flex space-x-4 mt-4">
        <button type="button" className="bg-gray-400 text-white py-2 px-4 rounded" onClick={onCancel}>
          Cancel
        </button>
      </div>
      {btnConfig && (
        <button type="submit" className={`mt-5 bg-green-600 text-white py-2 px-4 rounded ${btnConfig.className}`}>
          {btnConfig.label}
        </button>
      )}
    </form>
  );
};

export default FormRender;
