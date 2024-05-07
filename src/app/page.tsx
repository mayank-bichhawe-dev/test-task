"use client";

import TaskCard from "@/components/card";
import { getLocalStorageData } from "@/utils/localStorageHelper";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { Box, Button } from "@mui/material";
import { Grid } from "@mui/material";
import { Task } from "@/interface/task";

export default function Home() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);

  const openTaskForm=()=>{
    router.push('create-task')
  }

  useEffect(()=> {
    setTasks(getLocalStorageData())
  }, [])

  return (
    <Fragment>
      <Box display="flex" justifyContent="center" marginBottom={4}>
        <Button sx={{ fontSize: 20 }} onClick={openTaskForm} variant="outlined">Create Task</Button>
      </Box>
      <Grid container rowSpacing={4}>
        {tasks.map((val) => (
            <TaskCard task={val} key={val.id}/>
        ))}
      </Grid>
    </Fragment>
  );
}
