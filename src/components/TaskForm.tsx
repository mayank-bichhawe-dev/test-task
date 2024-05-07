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
import { useState, FormEvent, ChangeEvent, useEffect, useRef } from "react";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import FolderIcon from "@mui/icons-material/Folder";
import Container from "@mui/material/Container";
import { useRouter } from "next/navigation";
import { TaskFormProps, Task, TaskError } from "@/interface/task";

const TaskForm = ({ id }: TaskFormProps) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [task, setTask] = useState<Task>({
    id: 0,
    name: "",
    contributorName: "",
    visibility: true,
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
    setTaskError({ ...taskError, [name]: !value });
  };

  const handleSelectChange = (event: SelectChangeEvent<any>) => {
    const { name, value } = event.target;
    if (name === "visibility") {
      setTask({ ...task, [name]: value === "public" });
    } else {
      setTask({ ...task, [name]: value });
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
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
    const error = {
      name: !task.name,
      contributorName: !task.contributorName,
      visibility: taskError.visibility,
      status: !task.status,
      logo: !task.logo,
      lastUpdatedAt: false,
    };
    setTaskError(error);

    if (!Object.values(error).some(Boolean)) {
      handleLocalStorageData(task);
      resetForm();
      router.push("/");
    }
  };

  const resetForm = () => {
    setTask({
      id: 0,
      name: "",
      contributorName: "",
      visibility: true,
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
  };

  const optimizeImage = (imageUrl: string) => {
    return imageUrl;
  };

  const handleDefaultImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <FormControl margin="normal" fullWidth>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "16px",
              }}
            >
              <Avatar
                onClick={handleDefaultImageClick}
                style={{ cursor: "pointer" }}
              >
                {task.logo ? (
                  <img
                    src={optimizeImage(task.logo)}
                    alt="Uploaded Image"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                ) : (
                  <FolderIcon />
                )}
              </Avatar>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
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
          <TextField
            margin="normal"
            name="name"
            onChange={handleChange}
            value={task.name}
            fullWidth
            error={taskError.name}
            id="outlined-error-helper-text"
            label="TaskName"
            helperText={taskError.name && "require."}
          />
          <TextField
            margin="normal"
            name="contributorName"
            onChange={handleChange}
            value={task.contributorName}
            error={taskError.contributorName}
            fullWidth
            id="outlined-error-helper-text"
            label="contributorName"
            helperText={taskError.contributorName && "require."}
          />

          <FormControl margin="normal" fullWidth error={taskError.status}>
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

          <FormControl margin="normal" fullWidth error={taskError.visibility}>
            <InputLabel>Visiblity</InputLabel>
            <Select
              label="Visibility"
              name="visibility"
              value={task.visibility ? "public" : "private"}
              onChange={handleSelectChange}
              renderValue={(value) => value}
            >
              {randerSelectList(visibility)}
            </Select>
            {taskError.visibility && <FormHelperText>Error</FormHelperText>}
          </FormControl>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <Button type="submit" fullWidth variant="contained">
              Submit
            </Button>
            <Button
              onClick={() => router.push("/")}
              fullWidth
              variant="contained"
              color="error"
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Box>
    </Container>
  );
};

export default TaskForm;
