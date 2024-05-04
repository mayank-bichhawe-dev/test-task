"use client";

import TaskCard from "@/components/card";
import TaskForm, { Task } from "@/components/TaskForm";
import { useState } from "react";

const Page = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleTask = (data: Task) => {
    if (data.id === 0) {
      const id = Date.now();
      setTasks([...tasks, { ...data, id }]);
    } else {
    }
  };

  return (
    <>
      <TaskForm handleTask={handleTask} />
      {tasks.map((val)=>{
        return <TaskCard task={val} key={val.id} />
      })}
      {/* <TaskCard/> */}
    </>
  );
};

export default Page;
