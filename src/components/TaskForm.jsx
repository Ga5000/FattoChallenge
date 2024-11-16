import React from "react";
import CustomButton from "./CustomButton";

const TaskForm = ({ taskRequest, setTaskRequest, onSave, onCancel }) => {
  return (
    <div className="task-form">
      <h2>{taskRequest.taskId ? "Atualizar Tarefa" : "Adicionar Tarefa"}</h2>
      <input
        type="text"
        placeholder="Nome da Tarefa"
        value={taskRequest.name}
        onChange={(e) => setTaskRequest({ ...taskRequest, name: e.target.value })}
      />
        <input
        type="text"
        placeholder="Valor"
        value={taskRequest.cost}
        onChange={(e) => {
            const value = e.target.value;
            if (value === "" || !isNaN(value) || /^(\d+(\.\d*)?|\.\d+)$/.test(value)) {
            setTaskRequest({ ...taskRequest, cost: value });
            }
        }}
        />

      <input
        type="date"
        value={taskRequest.limitDate}
        onChange={(e) => setTaskRequest({ ...taskRequest, limitDate: e.target.value })}
      />
      <div className="form-actions">
        <CustomButton text="Salvar" onClick={onSave} />
        <CustomButton text="Cancelar" onClick={onCancel} />
      </div>
    </div>
  );
};

export default TaskForm;
