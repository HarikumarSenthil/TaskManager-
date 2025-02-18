import React, { useState, useEffect, useCallback } from "react";
import Input from "@/shared-components/ui/Input";
import Button from "@/shared-components/ui/Button";
import RadioButton from "@/shared-components/ui/RadioButton";

interface TaskFormProps {
  task: { name: string; description: string } | null;
  onSave: (name: string, description: string, priority: string) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSave, onCancel }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("low");
  const [touched, setTouched] = useState({
    taskName: false,
    taskDescription: false,
  });

  const [errors, setErrors] = useState({
    taskName: "",
    taskDescription: "",
  });

  useEffect(() => {
    if (task) {
      setTaskName(task.name);
      setTaskDescription(task.description);
    } else {
      setTaskName("");
      setTaskDescription("");
    }
  }, [task]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "taskName") {
      setTaskName(value);
    } else if (name === "taskDescription") {
      setTaskDescription(value);
    }
  }, []);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    if (name === "taskName" && taskName.trim() === "") {
      setErrors((prev) => ({
        ...prev,
        taskName: "Task name is required.",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        taskName: "",
      }));
    }
  }, [taskName]);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!errors.taskName && taskName.trim() !== "") {
      onSave(taskName, taskDescription, taskPriority);
    }
  }, [taskName, taskDescription, errors, taskPriority, onSave]);

  return (
    <form onSubmit={handleSubmit} className="m-6 p-10 bg-gray-400 rounded-lg shadow-lg max-w-xl mx-auto">
      <div className="mb-4">
        <Input
          name="taskName"
          value={taskName}
          onChange={handleChange}
          placeholder="Enter task name"
          error={errors.taskName}
          touched={touched.taskName}
        />

      </div>

      <div className="mb-4">
        <Input
          name="taskDescription"
          value={taskDescription}
          onChange={handleChange}
          placeholder="Enter task description"
        />
      </div>

      <div className="mb-4">
        <span className="text-white">Priority:</span>
        <div className="flex space-x-4 mt-2">
          <RadioButton
            id="priority-low"
            name="priority"
            value="low"
            checked={taskPriority === "low"}
            onChange={() => setTaskPriority("low")}
            label="Low"
            className="text-white"
          />
          <RadioButton
            id="priority-medium"
            name="priority"
            value="medium"
            checked={taskPriority === "medium"}
            onChange={() => setTaskPriority("medium")}
            label="Medium"
            className="text-white"
          />
          <RadioButton
            id="priority-high"
            name="priority"
            value="high"
            checked={taskPriority === "high"}
            onChange={() => setTaskPriority("high")}
            label="High"
            className="text-white"
          />
        </div>
      </div>

      <div className="flex space-x-4">
        <Button
          type="submit"
          size="large"
          variant="primary"
        >
          {task ? "Save Task" : "Add Task"}
        </Button>
        <Button
          type="button"
          size="large"
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
