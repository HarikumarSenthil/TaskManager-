import React from "react";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: { id: string; name: string; description: string; priority: string }[];
  onEdit: (task: { id: string; name: string; description: string; priority: string }) => void;
  onDelete: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onEdit={onEdit} 
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
