"use client";

import TaskForm from "@/components/TaskForm";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  return <TaskForm id={Number(id)} />;
};

export default Page;
