import React, { useEffect } from "react";
import { useMemo } from "react";
import FormRender from "@/utils/form/formRender";
import { useValidation } from "@/utils/validation/hooks";
import validationMessages from "@/utils/validation/validationMessages";

interface Task {
  name: string;
  description: string;
  priority: string;
}

interface TaskFormProps {
  task: Task | null;
  onSave: (taskData: Task) => void;
  onCancel: () => void;
}
const TaskForm: React.FC<TaskFormProps> = ({ task, onSave, onCancel }) => {
  const initialData = useMemo(() => ({
    name: task?.name || "",
    description: task?.description || "",
    priority: task?.priority || "medium",
  }), [task]);


  const taskValidations = {
    name: {
      required: { value: true, message: validationMessages.isEmpty },
      pattern: { type: "name", message: validationMessages.isOrganisation },
    },
    description: {
      required: { value: true, message: validationMessages.isEmpty },
      pattern: { type: "text", message: validationMessages.isText },
    },
    priority: {
      required: { value: true, message: validationMessages.isEmpty },
    },
  };


  const [
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
  ] = useValidation(initialData, taskValidations, []);
  useEffect(() => {
    if (task) {
      setErrors({});    
      resetForm({
        name: task.name,
        description: task.description,
        priority: task.priority,
      });
    }
  }, [task]); 
  
  const handleSubmit = async (formData: any) => {
  
 
    onSave(formData);
  
   
    return formData;
  };

  
  
  
  const formFields = {
    name: {
      id: "task-name",
      fieldName: "name",
      elementType: "FormInput",
      class: "form-grid",
      type: "text",
      placeholder: "Enter task name",
      visible: true,
      onChange: handleChange,
      onBlur: handleBlur,
      value: values.name,
      error: errors.name,
    },
    description: {
      id: "task-description",
      fieldName: "description",
      elementType: "FormTextarea",
      class: "form-grid",
      placeholder: "Enter task description",
      visible: true,
      onChange: handleChange,
      onBlur: handleBlur,
      value: values.description,
      error: errors.description,
    },
    priority: { 
      id: "task-priority",
      fieldName: "priority",
      elementType: "FormDropdown", 
      class: "form-grid",
      options: [
        { id: "low", label: "Low", value: "Low" },
        { id: "medium", label: "Medium", value: "Medium" },
        { id: "high", label: "High", value: "High" }
      ], 
      visible: true,
      onChange: handleChange,
      onBlur: handleBlur,
      value: values.priority, 
      error: errors.priority,
    }
  };

  return (
    <FormRender
      formHeading="Manage Task"
      headingStyle="text-center text-[#006400] mt-5"
      formLabelStyle="text-base font-bold mb-2"
      formData={formFields}
      formColumn={1}
      formStyle="w-96"
      initialStaticData={values}
      btnConfig={[
        {
          type: "submit",
          children: task ? "Save Task" : "Add Task",
          className: "w-full fully-rounded p-3 mt-5",
        },
        {
          type: "button",
          children: "Cancel",
          className: "w-full fully-rounded p-3 mt-5",
          onClick: onCancel,
        },
      ]}
      submitForm={handleSubmit}
      validations={taskValidations}
    />
  );
};

export default TaskForm;
