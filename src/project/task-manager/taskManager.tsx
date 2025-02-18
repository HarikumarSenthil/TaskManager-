import React, { useState } from 'react';
import TaskList from './components/TaskList';  
import TaskForm from './components/TaskForm';  
import Button from '@/shared-components/ui/Button';
import Input from '@/shared-components/ui/Input'; 
import Popup from '@/shared-components/components/Popup';
import { SideBarMainLayout } from '@/shared-components/layouts';

const TaskManager = () => {
  const [tasks, setTasks] = useState<{ id: string; name: string; description: string; priority: string }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<{ id: string; name: string; description: string; priority: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const addTask = (name: string, description: string, priority: string) => {
    const newTask = {
      id: `${tasks.length + 1}`,
      name,
      description,
      priority,
    };
    setTasks([...tasks, newTask]);
    setIsModalOpen(false); 
  };

  const editTask = (name: string, description: string, priority: string) => {
    if (selectedTask) {
      const updatedTasks = tasks.map((task) =>
        task.id === selectedTask.id ? { ...task, name, description, priority } : task
      );
      setTasks(updatedTasks);
      setIsModalOpen(false); 
    }
  };

  const handleEdit = (task: { id: string; name: string; description: string; priority: string }) => {
    console.log("Selected Task for Editing:", task); 
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleDelete = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));

    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask(null);
      setIsModalOpen(false);
    }
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SideBarMainLayout
      heading="Task Manager"
      showHeader={true}
      inputComplete={true}
    >
      <div className="task-manager">
        <Input
          name="text"
          placeholder="Search by task name or description"
          className="mb-4 p-2 border border-gray-300 rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} 
        />

        <Button onClick={() => {
          setSelectedTask(null);
          setIsModalOpen(true);
        }}>Add Task</Button>

        <TaskList tasks={filteredTasks} onEdit={handleEdit} onDelete={handleDelete} />

        {isModalOpen && (
          <Popup closePopup={() => setIsModalOpen(false)}>
            <TaskForm 
              task={selectedTask} 
              onSave={selectedTask ? editTask : addTask} 
              onCancel={() => setIsModalOpen(false)} 
            />
          </Popup>
        )}
      </div>
    </SideBarMainLayout>
  );
};

export default TaskManager;
