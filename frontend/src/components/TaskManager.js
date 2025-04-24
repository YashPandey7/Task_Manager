import * as React from "react";
import { Box, Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TaskTable from "./TaskTable";
import TaskModal from "./TaskModal";
import { LoadingIndicator } from "./LoadingIndicator";
import { useTasks, useTaskManager } from "../hooks";
import { deleteTask, markTaskAsDone } from "../service";

import { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material"; 

export const TaskManager = () => {
  const { tasks, loading, refreshTasks } = useTasks();
  const {
    taskData,
    file,
    isEditing,
    open,
    handleAddClick,
    handleEditClick,
    handleClose,
    handleSave,
    handleFileChange,
    setTaskData,
  } = useTaskManager();

  const [filter, setFilter] = useState("all");

  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };


  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.status === "DONE";
    if (filter === "pending") return task.status === "TODO";
    return true;
  });

  const handleMarkAsDone = async (taskId) => {
    try {
      await markTaskAsDone(taskId);
      await refreshTasks();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(taskId);
        await refreshTasks();
      } catch (err) {
        console.error("Error deleting task:", err);
      }
    }
  };

  const handleDownloadFile = (data, contentType) => {
    const blob = new Blob([data], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `task-file-${new Date().toLocaleTimeString()}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <Box display="flex" justifyContent="center" my={2}>
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={handleFilterChange}
          aria-label="task filter"
        >
          <ToggleButton value="all" aria-label="all tasks">
            All
          </ToggleButton>
          <ToggleButton value="completed" aria-label="completed tasks">
            Completed
          </ToggleButton>
          <ToggleButton value="pending" aria-label="pending tasks">
            Pending
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {loading ? (
        <LoadingIndicator />
      ) : filteredTasks.length ? (
        <TaskTable
          tasks={filteredTasks}
          onMarkAsDone={handleMarkAsDone}
          onDownloadFile={handleDownloadFile}
          onEdit={handleEditClick}
          onDelete={handleDelete}
        />
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
          <Typography variant="h5">No tasks found for selected filter!</Typography>
        </Box>
      )}

      <TaskModal
        open={open}
        handleClose={handleClose}
        taskData={taskData}
        handleChange={(field, value) =>
          setTaskData((prev) => ({ ...prev, [field]: value }))
        }
        handleSave={() => handleSave(refreshTasks)}
        handleFileChange={handleFileChange}
        file={file}
        isEditing={isEditing}
      />

      <Fab
        aria-label="add"
        color="primary"
        onClick={handleAddClick}
        style={{ position: "absolute", bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};
