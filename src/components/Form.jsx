import { useEffect, useState } from "react";
import CustomButton from "./CustomButton";

function Form({ taskId = null, setVisible, handleSaveTask, name = null, cost = null, limitDate = null }) {
  const formatDateForInput = (date) => {
    if (!date) return "";
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  };

  const [taskRequest, setTaskRequest] = useState({
    name: name || "",
    cost: cost || "",
    limitDate: formatDateForInput(limitDate) || null,
  });

  const handleInputChange = (field, value) => {
    setTaskRequest((prev) => ({
      ...prev,
      [field]: field === "cost" ? handleCostInput(value) : value,
    }));
  };

  const handleCostInput = (value) => {
    const parsedValue = value.replace(/[^0-9.]/g, "");
    const decimalsCheck = /^\d*\.?\d*$/;
    return decimalsCheck.test(parsedValue) ? parsedValue : taskRequest.cost;
  };

  useEffect(() => {
    console.log(taskRequest.limitDate);
  }, [taskRequest.limitDate]);

  return (
    <>
      <h2>{taskId == null ? "Adicionar Tarefa" : "Editar Tarefa"}</h2>
      <form className="save-form">
        <input
          type="text"
          className="name"
          placeholder="Nome da Tarefa"
          value={taskRequest.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
        <input
          type="text"
          className="cost"
          placeholder="Custo"
          value={taskRequest.cost}
          onChange={(e) => handleInputChange("cost", e.target.value)}
        />
        <input
          type="date"
          className="limitDate"
          value={taskRequest.limitDate || ""}
          onChange={(e) => handleInputChange("limitDate", e.target.value)}
        />
      </form>

      <div>
        <CustomButton
          text="Salvar"
          onClick={() => {
            handleSaveTask(taskId, {
              ...taskRequest,
              cost: parseFloat(taskRequest.cost) || 0,
              limitDate: taskRequest.limitDate,
            });
            setVisible({ visible: false, taskId: null });
          }}
        />
      </div>
      <div>
        <CustomButton
          text="Cancelar"
          onClick={() => setVisible({ visible: false, taskId: null })}
        />
      </div>
    </>
  );
}

export default Form;
