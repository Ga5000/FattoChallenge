import React, { useState, useEffect } from "react";
import Button from "./components/Button";

const API_URL = "http://localhost:8080/tasks";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [showTaskPanel, setShowTaskPanel] = useState(false); // Manage panel visibility
  const [taskRequest, setTaskRequest] = useState({
    name: "",
    cost: 0,
    limitDate: new Date().toLocaleDateString("en-GB"),
  });
  const [selectedTaskId, setSelectedTaskId] = useState(null); // Track the task ID to update
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // Manage delete confirmation visibility
  const [taskToDelete, setTaskToDelete] = useState(null); // Store task ID to delete

  const getAllTasks = async () => {
    try {
      const response = await fetch(`${API_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
      const data = await response.json();
      setTasks(data.content);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const moveTask = async (taskId, moveUp) => {
    try {
      const response = await fetch(`${API_URL}/move?taskId=${taskId}&moveUp=${moveUp}`, {
        method: "POST",
      });

      if (response.ok) {
        getAllTasks();
      } else {
        console.error("Failed to move task");
      }
    } catch (error) {
      console.error("Error moving task:", error);
    }
  };

  const addTask = async () => {
    try {
      const response = await fetch(`${API_URL}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskRequest),
      });

      if (response.ok) {
        setShowTaskPanel(false);
        getAllTasks();
      } else {
        console.error("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (taskId) => {
    try {
      const response = await fetch(`${API_URL}/update?taskId=${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskRequest),
      });

      if (response.ok) {
        setShowTaskPanel(false);
        getAllTasks();
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async () => {
    try {
      const response = await fetch(`${API_URL}/delete?taskId=${taskToDelete}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setShowDeleteConfirm(false); // Close confirmation panel
        getAllTasks();
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleTaskUpdate = (taskId) => {
    const taskToUpdate = tasks.find((task) => task.taskId === taskId);
    setTaskRequest({
      name: taskToUpdate.name,
      cost: taskToUpdate.cost,
      limitDate: taskToUpdate.limitDate,
    });
    setSelectedTaskId(taskId); // Set the task ID to be updated
    setShowTaskPanel(true); // Open the panel to update the task
  };

  const showDeleteConfirmation = (taskId) => {
    setTaskToDelete(taskId); // Set task ID to delete
    setShowDeleteConfirm(true); // Show confirmation panel
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false); // Close confirmation panel without deleting
    setTaskToDelete(null); // Clear task ID
  };

  useEffect(() => {
    getAllTasks();
  }, [pageNumber, pageSize, tasks]);

  return (
    <div>
      <h1>Task List</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.taskId}>
            <h2>{task.name}</h2>
            <p>{task.limitDate}</p>
            <p>{task.cost}</p>
            <p>Order: {task.presentationOrder}</p>
            <Button text="Move Up" onClick={() => moveTask(task.taskId, true)} />
            <Button text="Move Down" onClick={() => moveTask(task.taskId, false)} />
            <Button text="Update Task" onClick={() => handleTaskUpdate(task.taskId)} />
            <Button text="Delete Task" onClick={() => showDeleteConfirmation(task.taskId)} />
          </li>
        ))}
      </ul>
      <Button text="Next Page" onClick={() => setPageNumber(pageNumber + 1)} />
      <Button text="Previous Page" onClick={() => setPageNumber(Math.max(pageNumber - 1, 0))} />
      <Button text="Add New Task" onClick={() => setShowTaskPanel(true)} />

      {showTaskPanel && (
        <div className="task-panel">
          <h2>{selectedTaskId ? "Update Task" : "Create New Task"}</h2>
          <input
            type="text"
            placeholder="Task Name"
            value={taskRequest.name}
            onChange={(e) => setTaskRequest({ ...taskRequest, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Cost"
            value={taskRequest.cost}
            onChange={(e) => setTaskRequest({ ...taskRequest, cost: Number(e.target.value) })}
          />
          <input
            type="date"
            value={taskRequest.limitDate}
            onChange={(e) => setTaskRequest({ ...taskRequest, limitDate: e.target.value })}
          />
          <Button text="Confirm" onClick={() => selectedTaskId ? updateTask(selectedTaskId) : addTask()} />
          <Button text="Cancel" onClick={() => setShowTaskPanel(false)} />
        </div>
      )}

      {showDeleteConfirm && (
        <div className="delete-confirmation-panel">
          <p>Do you really want to delete this task? There is no way to recover it after deleting.</p>
          <Button text="Yes" onClick={deleteTask} />
          <Button text="No" onClick={cancelDelete} />
        </div>
      )}
    </div>
  );
}

export default Tasks;
