import React, { useState, useEffect } from "react";
import Input from "@/shared-components/ui/Input";
import Button from "@/shared-components/ui/Button";
import RadioButton from "@/shared-components/ui/RadioButton";
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
        priority: task.priority || "low", // Ensure priority is set correctly
      });
    } else {
      setFormData({ name: "", description: "", priority: "low" });
    }
  }, [task]);

  const { errors, validate } = useFormValidation(formData, taskFormValidations);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, priority: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      alert(Object.values(validationErrors).join("\n"));
      return;
    }

    console.log("Form Data on Submit:", formData); // Check if priority is included
    onSave(formData.name, formData.description, formData.priority);
  };

  return (
    <FormRender
      formHeading="Manage Task"
      headingStyle="text-center text-[#006400] mt-5"
      formLabelStyle="text-base font-bold mb-2"
      formData={formData}
      formColumn={1}
      formStyle="px-8 my-10 max-lg:px-4 max-w-2xl mx-auto"
      btnConfig={{
        label: task ? "Save Task" : "Add Task",
        className: "w-full fully-rounded p-3 mt-5"
      }}
      initialStaticData={{ name: "", description: "", priority: "low" }}
      submitForm={handleSubmit}
    >
      <Input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter task name"
        error={errors.name}
      />
      <Input
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Enter task description"
        error={errors.description}
      />
      <div className="flex space-x-4 mt-2">
        <RadioButton
          id="priority-low"
          name="priority"
          value="low"
          checked={formData.priority === "low"}
          onChange={handlePriorityChange}
          label="Low"
        />
        <RadioButton
          id="priority-medium"
          name="priority"
          value="medium"
          checked={formData.priority === "medium"}
          onChange={handlePriorityChange}
          label="Medium"
        />
        <RadioButton
          id="priority-high"
          name="priority"
          value="high"
          checked={formData.priority === "high"}
          onChange={handlePriorityChange}
          label="High"
        />
      </div>
      <div className="flex space-x-4">
        <Button type="submit" size="large" variant="primary">
          {task ? "Save Task" : "Add Task"}
        </Button>
        <Button type="button" size="large" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </FormRender>
  );
};

export default TaskForm;
