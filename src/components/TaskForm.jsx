import React, { useState } from "react";
import Notification from "./Notification";
import messageType from "../constants/messageType";
import '../styles/TaskForm.css';

const TaskForm = ({ taskId, taskRequest, setTaskRequest, onSave, onCancel }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleNameChange = (e) => {
    const value = e.target.value;
    setTaskRequest({ ...taskRequest, name: value });
  };

  const handleCostChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setTaskRequest({ ...taskRequest, cost: value });
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    setTaskRequest({ ...taskRequest, limitDate: value });
  };

  const handleSave = () => {
    if (!taskRequest.name || !taskRequest.cost || !taskRequest.limitDate) {
      setErrorMessage("Todos os campos devem ser preenchidos!");
      return;
    }

    setErrorMessage(""); 
    onSave(); 
    setTaskRequest({ name: taskRequest.name, cost: taskRequest.cost, limitDate: "" });
  };

  const handleCancel = () => {
    setTaskRequest({ name: "", cost: "", limitDate: "" });
    setErrorMessage("");
    onCancel();
  };

  return (
    <>
      <div className="task-form-overlay" />
      <div className="task-form">
        <h2>{taskId ? "Atualizar Tarefa" : "Adicionar Tarefa"}</h2>
        <input
          type="text"
          placeholder="Nome da Tarefa"
          value={taskRequest.name}
          onChange={handleNameChange}
        />
        <input
          type="text"
          placeholder="Valor"
          value={taskRequest.cost}
          onChange={handleCostChange}
        />
        <input
          type="date"
          value={taskRequest.limitDate}
          onChange={handleDateChange}
        />

        {errorMessage && (
          <Notification
            message={{ text: errorMessage, type: messageType.WARNING }}
            onClose={() => setErrorMessage("")}
          />
        )}

        <div className="form-actions">
          <button onClick={handleSave}>Salvar</button>
          <button onClick={handleCancel}>Cancelar</button>
        </div>
      </div>
    </>
  );
};

export default TaskForm;
