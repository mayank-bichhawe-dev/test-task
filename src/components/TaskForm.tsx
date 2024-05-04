import {
  getLocalStorageData,
  handleLocalStorageData,
} from "@/utils/localStorageHelper";
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
import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TaskFormProps, Task, TaskError } from "@/interface/task";

const TaskForm = ({ id }: TaskFormProps) => {
  const router = useRouter();
  const [task, setTask] = useState<Task>({
    id: 0,
    name: "",
    contributorName: "",
    visibility: "public",
    status: "published",
    lastUpdatedAt: "",
    logo: "",
  });

  const [taskError, setTaskError] = useState<TaskError>({
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] as File;
    const reader = new FileReader();
    reader.onload = () => {
        const imgUrl = reader.result as string;
        setTask({ ...task, logo: imgUrl });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, contributorName, visibility, status } = task;
    const error = {
      name: !name,
      contributorName: !contributorName,
      logo: true,
    };
    setTaskError({ ...taskError, ...error });
    if (name && contributorName && visibility && status) {
      handleLocalStorageData(task);
      setTask({
        id: 0,
        name: "",
        contributorName: "",
        visibility: "public",
        status: "published",
        lastUpdatedAt: "",
        logo: "",
      });
      setTaskError({
        name: false,
        contributorName: false,
        visibility: false,
        status: false,
        lastUpdatedAt: false,
        logo: false,
      });
      router.push("/");
    }
  };

  useEffect(() => {
    if (id) {
      const getLocalData = getLocalStorageData();
      const updatedTask = getLocalData.find((val: Task) => val.id === id);
      setTask(updatedTask);
    }
  }, [id]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Button onClick={() => router.push("/")}>Home</Button>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        sx={{
          width: "400px",
          p: 2,
          border: "1px solid #ccc",
          borderRadius: "4px",
          textAlign: "center",
        }}
      >
        <div>
          <TextField
            name="name"
            onChange={handleChange}
            value={task.name}
            error={taskError.name}
            id="outlined-error-helper-text"
            label="TaskName"
            helperText={taskError.name && "require."}
            sx={{
              width: 150,
            }}
          />
          <TextField
            name="contributorName"
            onChange={handleChange}
            value={task.contributorName}
            error={taskError.contributorName}
            id="outlined-error-helper-text"
            label="contributorName"
            helperText={taskError.contributorName && "require."}
            sx={{
              width: 150,
            }}
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
          <FormControl>
            <input type="file" onChange={handleFileChange} accept="image/*" />
            {taskError.logo && (
              <FormHelperText
                sx={{
                  color: "red",
                  fontSize: 10,
                }}
              >
                logo missing
              </FormHelperText>
            )}
          </FormControl>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default TaskForm;
