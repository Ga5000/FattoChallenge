import React, { useState, useEffect } from "react";
import "./styles/Tasks.css";
import TaskForm from "./components/TaskForm";
import DeleteConfirmation from "./components/DeleteConfirmation";
import CustomButton from "./components/CustomButton";
import Notification from "./components/Notification";
import messageType from "./constants/messageType";

const API_URL = "http://localhost:8080/tasks";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10); // Inicialmente 10
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [pageData, setPageData] = useState({ currentPage: 0, totalPages: 1 });
  const [taskRequest, setTaskRequest] = useState({
    name: "",
    cost: 0,
    limitDate: null,
  });
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const [message, setMessage] = useState({
    text: "",
    type: messageType.SUCCESS,
  });

  const getAllTasks = async () => {
    try {
      const response = await fetch(
        `${API_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      const data = await response.json();
      setTasks(data.content);
      setPageData({ currentPage: data.currentPage, totalPages: data.totalPages });
    } catch (error) {
      setMessage({
        text: "Falha ao carregar tarefas",
        type: messageType.FAILED,
      });
    }
  };

  const moveTask = async (taskId, moveUp) => {
    try {
      const response = await fetch(
        `${API_URL}/move?taskId=${taskId}&moveUp=${moveUp}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        getAllTasks();
      }
    } catch (error) {
      setMessage({
        text: "Erro ao mover tarefa",
        type: messageType.FAILED,
      });
    }
  };

  const saveTask = async (taskId) => {
    const url = taskId
      ? `${API_URL}/update?taskId=${taskId}`
      : `${API_URL}/add`;
    const method = taskId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskRequest),
      });

      if (response.status === 400) {
        setMessage({
          text: "Dado inválido, tente novamente",
          type: messageType.WARNING,
        });
        return;
      }

      if (response.ok) {
        setShowTaskForm(false);
        setSelectedTaskId(null);
        getAllTasks();
        setMessage({
          text: taskId ? "Tarefa atualizada com sucesso" : "Tarefa salva com sucesso!",
          type: messageType.SUCCESS,
        });
      } else {
        const bodyMessage = await response.text();
        setMessage({
          text: bodyMessage,
          type: messageType.WARNING,
        });
      }
    } catch (error) {
      setMessage({
        text: "Erro ao salvar tarefa",
        type: messageType.FAILED,
      });
    }
  };

  const deleteTask = async () => {
    try {
      const response = await fetch(`${API_URL}/delete?taskId=${taskToDelete}`, {
        method: "DELETE",
      });

      if (response.status == 204) {
        setShowDeleteConfirm(false);
        setTaskToDelete(null);
        getAllTasks();
        setMessage({
          text: "Tarefa removida com sucesso!",
          type: messageType.SUCCESS,
        });
      } else {
        const bodyMessage = await response.text();
        setMessage({
          text: bodyMessage,
          type: messageType.WARNING,
        });
      }
    } catch (error) {
      setMessage({
        text: "Erro ao remover tarefa",
        type: messageType.FAILED,
      });
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

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value)); // Atualiza o pageSize conforme a seleção
    setPageNumber(0); // Reseta para a primeira página ao alterar o tamanho da página
  };

  useEffect(() => {
    getAllTasks();
  }, [pageNumber, pageSize]);

  return (
    <div className="tasks-container">
      {message.text && (
        <Notification
          message={message}
          onClose={() => setMessage({ text: "", type: messageType.SUCCESS })}
        />
      )}

      <h1>Tarefas</h1>

      {/* Drop-down para selecionar o tamanho da página */}
      <div className="page-size-selector">
        <label htmlFor="page-size">Tamanho da página: </label>
        <select
          id="page-size"
          value={pageSize}
          onChange={handlePageSizeChange}
        >
          {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

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
          {pageData.currentPage + 1}/{pageData.totalPages === 0 ? pageData.totalPages + 1 : pageData.totalPages}
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
          taskId={selectedTaskId}  
          onSave={() => saveTask(selectedTaskId)}  
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
