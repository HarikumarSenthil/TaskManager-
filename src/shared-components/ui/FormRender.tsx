import React from "react";

interface FormRenderProps {
  formHeading: string;
  headingStyle?: string;
  formLabelStyle?: string;
  formData: Record<string, any>;
  formColumn?: number;
  formStyle?: string;
  btnConfig?: {
    label: string;
    className?: string;
  };
  initialStaticData?: Record<string, any>;
  submitForm: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

const FormRender: React.FC<FormRenderProps> = ({
  formHeading,
  headingStyle = "",
  formLabelStyle = "",
  formData,
  formColumn = 1,
  formStyle = "",
  btnConfig,
  initialStaticData,
  submitForm,
  children,
}) => {
  return (
    <form onSubmit={submitForm} className={`bg-white shadow-md rounded-lg p-8 ${formStyle}`}>
      <h2 className={`text-xl font-semibold ${headingStyle}`}>{formHeading}</h2>
      <div className={`grid grid-cols-${formColumn} gap-4 mt-4`}>{children}</div>
      {btnConfig && (
        <button type="submit" className={`mt-5 bg-green-600 text-white py-2 px-4 rounded ${btnConfig.className}`}>
          {btnConfig.label}
        </button>
      )}
    </form>
  );
};

export default FormRender;
