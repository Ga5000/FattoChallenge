import React from "react";
import CustomButton from "./CustomButton";

const DeleteConfirmation = ({ onConfirm, onCancel }) => {
  return (
    <div className="delete-confirmation">
      <p>Tem certeza que deseja deletar esta tarefa? Essa ação é irreversível.</p>
      <div className="confirmation-actions">
        <CustomButton text="Yes" onClick={onConfirm} />
        <CustomButton text="No" onClick={onCancel} />
      </div>
    </div>
  );
};

export default DeleteConfirmation;
