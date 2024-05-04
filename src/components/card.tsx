import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Box } from "@mui/material";
import { Task } from "./TaskForm";

interface CardProps {
    task: Task
}

export default function TaskCard({ task }: CardProps) {
  return (
    <Card sx={{ height: 150, width: 150 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500], width: 20, height: 20 }}
            aria-label="recipe"
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
          <Typography fontSize={10}>{task.lastUpdatedAt} hours</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
