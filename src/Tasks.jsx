import React, { useState, useEffect } from "react";
import "./styles/Tasks.css";
import TaskForm from "./components/TaskForm";
import DeleteConfirmation from "./components/DeleteConfirmation";
import CustomButton from "./components/CustomButton";

const API_URL = "http://localhost:8080/tasks";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [pageData, setPageData] = useState({ currentPage: 0, totalPages: 1 });
  const [taskRequest, setTaskRequest] = useState({
    name: "",
    cost: 0,
    limitDate: "",
  });
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const getAllTasks = async () => {
    try {
      const response = await fetch(`${API_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
      const data = await response.json();
      setTasks(data.content);
      setPageData({ currentPage: data.currentPage, totalPages: data.totalPages });
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

  const saveTask = async () => {
    const url = selectedTaskId
      ? `${API_URL}/update?taskId=${selectedTaskId}`
      : `${API_URL}/add`;
    const method = selectedTaskId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskRequest),
      });
      if (response.ok) {
        setShowTaskForm(false);
        setSelectedTaskId(null);
        getAllTasks();
      }
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const deleteTask = async () => {
    try {
      const response = await fetch(`${API_URL}/delete?taskId=${taskToDelete}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setShowDeleteConfirm(false);
        setTaskToDelete(null);
        getAllTasks();
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleTaskUpdate = (task) => {
    setTaskRequest({
      name: task.name,
      cost: task.cost,
      limitDate: task.limitDate,
    });
    setSelectedTaskId(task.taskId);
    setShowTaskForm(true);
  };

  const showDeleteConfirmation = (taskId) => {
    setTaskToDelete(taskId);
    setShowDeleteConfirm(true);
  };

  useEffect(() => {
    getAllTasks();
  }, [pageNumber]);

  return (
    <div className="tasks-container">
      <h1>Tarefas</h1>

      <ul>
        {tasks.map((task, index) => (
          <li key={task.taskId}>
            <h2>{task.name}</h2>
            <p className="limit-date">Data de Entrega: {task.limitDate}</p>
            <p className="cost">Valor: R$ {task.cost}</p>

            <CustomButton
              text="Move Up"
              onClick={() => moveTask(task.taskId, true)}
              disabled={index === 0} 
            />

            <CustomButton
              text="Move Down"
              onClick={() => moveTask(task.taskId, false)}
              disabled={index === tasks.length - 1} 
            />

            <CustomButton
              text="Update"
              onClick={() => handleTaskUpdate(task)}
            />

            <CustomButton
              text="X"
              onClick={() => showDeleteConfirmation(task.taskId)}
            />
          </li>
        ))}
      </ul>

      <div className="pagination">
        <CustomButton
          text="<"
          onClick={() => setPageNumber(Math.max(pageNumber - 1, 0))}
          disabled={pageNumber === 0}
        />
        <p>
          {pageData.currentPage + 1}/{pageData.totalPages}
        </p>
        <CustomButton
          text=">"
          onClick={() => setPageNumber(pageNumber + 1)}
          disabled={pageData.currentPage >= pageData.totalPages - 1}
        />
      </div>

      <CustomButton
        text="+"
        onClick={() => {
          setShowTaskForm(true);
          setTaskRequest({ name: "", cost: 0, limitDate: "" });
          setSelectedTaskId(null);
        }}
      />

     
      {showTaskForm && (
        <TaskForm
          taskRequest={taskRequest}
          setTaskRequest={setTaskRequest}
          onSave={saveTask}
          onCancel={() => setShowTaskForm(false)}
        />
      )}

      
      {showDeleteConfirm && (
        <DeleteConfirmation
          onConfirm={deleteTask}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </div>
  );
}

export default Tasks;
