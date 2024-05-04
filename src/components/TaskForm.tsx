import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  SelectChangeEvent,
} from "@mui/material";
import { useState, FormEvent, FormEventHandler, ChangeEvent } from "react";

export interface Task {
  id: number;
  name: string;
  contributorName: string;
  visibility: "public" | "private";
  status: "published" | "draft";
  lastUpdatedAt: string | number;
  logo: string;
}

interface Error {
  name: boolean;
  contributorName: boolean;
  visibility: boolean;
  status: boolean;
  lastUpdatedAt: boolean;
  logo: boolean;
}

interface TaskFormProps {
  handleTask: (value: Task) => void;
}

const TaskForm = ({ handleTask }: TaskFormProps) => {
  const [task, setTask] = useState<Task>({
    id: 0,
    name: "",
    contributorName: "",
    visibility: "public",
    status: "published",
    lastUpdatedAt: "",
    logo: "",
  });

  const [taskError, setTaskError] = useState<Error>({
    name: false,
    contributorName: false,
    visibility: false,
    status: false,
    lastUpdatedAt: false,
    logo: false,
  });

  const visibility = ["public", "private"];
  const status = ["published", "draft"];
  const randerSelectList = (arr: string[]) => {
    return arr.map((val, i) => {
      return (
        <MenuItem key={i} value={val}>
          {val}
        </MenuItem>
      );
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const handleSelectChange = (event: SelectChangeEvent<any>) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const date = Date.now();
    setTask({ ...task, lastUpdatedAt: date });
    const { name, contributorName, visibility, status } = task;

    if (name && contributorName && visibility && status) {
      handleTask(task);
      setTask({
        id: 0,
        name: "",
        contributorName: "",
        visibility: "public",
        status: "published",
        lastUpdatedAt: "",
        logo: "",
      });
    }
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div>
          <TextField
            name="name"
            onChange={handleChange}
            value={task.name}
            error={taskError.name}
            id="outlined-error"
            label="TaskName"
            helperText={taskError.name && "Incorrect entry."}
          />
          <TextField
            name="contributorName"
            onChange={handleChange}
            value={task.contributorName}
            error={taskError.contributorName}
            id="outlined-error-helper-text"
            label="contributorName"
            helperText={taskError.contributorName && "Incorrect entry."}
          />
        </div>

        <div>
          <FormControl sx={{ m: 1, minWidth: 120 }} error={taskError.status}>
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              name="status"
              value={task.status}
              onChange={handleSelectChange}
              renderValue={(value) => value}
            >
              {randerSelectList(status)}
            </Select>
            {taskError.status && <FormHelperText>Error</FormHelperText>}
          </FormControl>

          <FormControl
            sx={{ m: 1, minWidth: 120 }}
            error={taskError.visibility}
          >
            <InputLabel>Visiblity</InputLabel>
            <Select
              label="Visibility"
              name="visibility"
              value={task.visibility}
              onChange={handleSelectChange}
              renderValue={(value) => value}
            >
              {randerSelectList(visibility)}
            </Select>
            {taskError.visibility && <FormHelperText>Error</FormHelperText>}
          </FormControl>
        </div>

        <div>
          <input type="file" name="logo" />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </div>
      </Box>
    </>
  );
};

export default TaskForm;

