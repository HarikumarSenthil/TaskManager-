import React, { useState, useEffect } from "react";
import FormRender from "@/shared-components/ui/FormRender";
import useFormValidation from "@/shared-components/components/useFormValidation";

interface TaskFormProps {
  task: { name: string; description: string; priority: string } | null;
  onSave: (name: string, description: string, priority: string) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priority: "low"
  });

  const taskFormValidations = {
    name: {
      required: { value: true, message: "Task name is required" }
    },
    description: {
      required: { value: true, message: "Task description is required" }
    },
    priority: {
      required: { value: true, message: "Priority selection is required" }
    }
  };

  useEffect(() => {
    if (task) {
      setFormData({
        name: task.name,
        description: task.description,
        priority: task.priority || "low", 
      });
    } else {
      setFormData({ name: "", description: "", priority: "low" });
    }
  }, [task]);

  const { errors, validate } = useFormValidation(formData, taskFormValidations);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validate(); 
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    console.log("Form Data on Submit:", formData);
    onSave(formData.name, formData.description, formData.priority);
  };

  const formFields: {
    name: string;
    type: "text"  | "radio"; 
    options?: { value: string; label: string }[];
  }[] = [
    {
      name: "name", 
      type: "text", 
    },
    {
      name: "description", 
      type: "text", 
    },
    {
      name: "priority", 
      type: "radio", 
      options: [
        { value: "low", label: "Low" },
        { value: "medium", label: "Medium" },
        { value: "high", label: "High" },
      ],
    },
  ];

  return (
    <FormRender
      formHeading="Manage Task"
      headingStyle="text-center text-[#006400] mt-5"
      formLabelStyle="text-base font-bold mb-2"
      formData={formData}
      formFields={formFields}
      formColumn={1}
      formStyle="w-96 mt-2"
      btnConfig={{
        label: task ? "Save Task" : "Add Task",
        className: "w-full fully-rounded p-3 mt-5"
      }}
      submitForm={handleSubmit}
      onChange={handleChange}
      onCancel={onCancel}
      errors={errors}
    />
  );
};

export default TaskForm;