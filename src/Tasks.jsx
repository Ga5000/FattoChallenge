import React, { useState, useEffect } from "react";
import Task from "./components/Task";
import Button from "./components/Button";

const API_URL = "http://localhost:8080/tasks";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState([0, 0]); // [currentPage, totalPages]

  const getAllTasks = async () => {
    try {
      const response = await fetch(`${API_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
      const data = await response.json();
      setTasks(data.content);
      setPage([data.currentPage, data.totalPages])
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`${API_URL}/delete?taskId=${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        getAllTasks(); // Refresh task list after deletion
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
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

  useEffect(() => {
    getAllTasks();
  }, [pageNumber, pageSize]);

  return (
    <div className="main-container">
      <h1>Tarefas</h1>
      <div className="task-list">
        {tasks.map((task) => (
          <Task
            key={task.taskId}
            taskId={task.taskId}
            name={task.name}
            cost={task.cost}
            limitDate={task.limitDate}
            onDelete={deleteTask}
            onMove={moveTask}
          />
        ))}
      </div>
      <div>
      <Button text="<" onClick={() => setPageNumber(Math.max(pageNumber - 1, 0))} />
        <p>{page[0]+1}/{page[1]}</p>
        <Button
          text=">"
          onClick={page[0] < page[1] - 1 ? () => setPageNumber(pageNumber + 1) : null} 
          disabled={page[0] >= page[1] - 1} 
        />
      </div>
    </div>
  );
}

export default Tasks;
