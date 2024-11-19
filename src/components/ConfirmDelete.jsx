import CustomButton from "./CustomButton";

function ConfirmDelete({taskId, setConfirmDeletion, handleDeleteTask}){
    return(
        <div className="confirm-dialog">
        <p>Deseja mesmo deletar esta tarefa? Essa ação é irreversível.</p>
        <div>
          <CustomButton
            text="Sim"
            onClick={() => handleDeleteTask(taskId)}
          />
        </div>
        <div>
          <CustomButton
            text="Não"
            onClick={() => setConfirmDeletion({ visible: false, taskId: null })}
          />
        </div>
      </div>
    );
}

export default ConfirmDelete;