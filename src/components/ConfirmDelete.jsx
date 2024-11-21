import CustomButton from "./CustomButton";
import '../styles/ConfirmDelete.css';

function ConfirmDelete({ taskId, setConfirmDeletion, handleDeleteTask }) {
  return (
    <div className="confirm-overlay">
      <div className="confirm-dialog">
        <p>Deseja mesmo deletar esta tarefa? Essa ação é irreversível.</p>
        <div>
          <CustomButton
            text="Sim"
            onClick={() => handleDeleteTask(taskId)}
          />
          <CustomButton
            text="Não"
            onClick={() => setConfirmDeletion({ visible: false, taskId: null })}
          />
        </div>
      </div>
    </div>
  );
}

export default ConfirmDelete;
