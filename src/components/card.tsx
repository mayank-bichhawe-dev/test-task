import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Box, Grid } from "@mui/material";
import { useRouter } from 'next/navigation'
import { formatDistanceToNow } from 'date-fns';
import { Task } from "@/interface/task";

interface CardProps {
    task: Task
}

export default function TaskCard({ task }: CardProps) {
  const router = useRouter();

  const openEditTaskForm=(id: number)=>{
    router.push(`edit-task/${id}`)
  }

  return (
    <Grid item key={task.id} xs={12} sm={4} md={4} style={{ display: 'flex', justifyContent: 'center' }}>
    <Card onClick={()=> openEditTaskForm(task.id)} sx={{ height: 150, width: 180 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500], width: 20, height: 20 }}
            aria-label="recipe"
            src={task.logo}
          >
            R
          </Avatar>
        }
        title={
          <Typography fontSize={10} sx={{ float: "right" }}>
            {task.visibility}
          </Typography>
        }
      />

      <CardContent>
        <Box>
          <Typography fontSize={10} marginBottom={1}>Name: {task.name}</Typography>
          <Typography fontSize={10}>contributor: {task.contributorName}</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 3,
          }}
        >
          <Typography fontSize={10}>{task.status}</Typography>
          <Typography fontSize={10}>{formatDistanceToNow(task.lastUpdatedAt, { addSuffix: true })}</Typography>
        </Box>
      </CardContent>
    </Card>
    </Grid>
  );
}
