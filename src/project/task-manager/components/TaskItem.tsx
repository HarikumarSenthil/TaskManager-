import React from "react";
import Button from "@/shared-components/ui/Button";
import Card from "@/shared-components/components/Card";

interface TaskItemProps {
  task: { id: string; name: string; description: string; priority: string }; 
  onEdit: (task: { id: string; name: string; description: string; priority: string }) => void;
  onDelete: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
  console.log("Card Data For Display!!!!!....." ,task)
  const btnConfig = [
    {
      type: "button",
      className: "btn-primary",
      clickHandler: () => onEdit(task),
      children: "Edit Task",
    },
  ];

  
  const priorityColor = task.priority === "high"
    ? "text-red-500"
    : task.priority === "medium"
    ? "text-yellow-500"
    : "text-green-500";

  return (
    <Card
      data={task}
      heading=""
      deleteHandler={() => onDelete(task.id)}
      showDeleteIcon={true}
      loggedinRole="admin"
      config={{}}
      columns={1}
      gridCols={1}
      noBorder={false}
      cardContainer={{}}
    >
      <div className="text-lg font-bold">Name: {task.name}</div>
      <div className="text-sm text-gray-600">Description: {task.description}</div>

      {task.priority && (
        <div className="text-sm text-gray-500 mt-2">
          <strong>Priority: </strong>
          <span className={`${priorityColor}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} 
          </span>
        </div>
      )}

      <Button className="mt-4" onClick={() => onEdit(task)}>
        Edit Task
      </Button>
      <Button className="mt-4" onClick={() => onDelete(task.id)}>
        Delete Task
      </Button>
    </Card>
  );
};

export default TaskItem;
