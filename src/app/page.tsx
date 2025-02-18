'use client'
import React from 'react';
import TaskManager from '../project/task-manager/taskManager';  

const Page: React.FC = () => {

  return (
   <>
    <div className='flex flex-col justify-center align-middle'>
      <TaskManager />
      </div>
      </>
  );
};

export default Page;
