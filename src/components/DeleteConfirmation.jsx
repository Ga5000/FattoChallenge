import React from "react";
import CustomButton from "./CustomButton";
import warningIcon from '../assets/warning-icon.svg';
import successIcon from '../assets/success-icon.svg';
import failedIcon from '../assets/failed-icon.svg';
import '../styles/DeleteConfirmation.css';

const DeleteConfirmation = ({ onConfirm, onCancel }) => {
  return (
    <>
      <div className="delete-confirmation">
        <img src={warningIcon} alt="warning" />
        <p>Tem certeza que deseja deletar esta tarefa? Essa ação é irreversível.</p>
        <div className="confirmation-actions">
          <CustomButton image={successIcon} onClick={onConfirm} className="success-icon" />
          <CustomButton image={failedIcon} onClick={onCancel} className="failed-icon" />
        </div>
      </div>
    </>
  );
};

export default DeleteConfirmation;
