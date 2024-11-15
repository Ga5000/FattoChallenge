import arrowUp from '../assets/arrowUp.svg';
import arrowDown from '../assets/arrowDown.svg';
import Button from './Button';
import { useState } from 'react';

function Task({taskId, name, cost, limitDate, onUpdate, onDelete, onMove }) {
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);
  const confirmDelete = () => {
    onDelete(taskId);
    setShowDeletePopUp(false);
  };

  const cancelDelete = () => {
    setShowDeletePopUp(false);
  };

  return (
    <div className="task" key={taskId}>
      <h2>{name}</h2>
      <p>Data Limite: {limitDate}</p>
      <p>Custo: R${cost}</p>
      <div className="move-buttons">
        <Button text="up" image={null} onClick={() => onMove(taskId, true)} />
        <Button text="down" image={null} onClick={() => onMove(taskId, false)} />
      </div>
      <div className="operation-buttons">
        <Button text="X" image={null} onClick={() => setShowDeletePopUp(true)} />
      </div>

      {showDeletePopUp && (
        <div className="delete-confirmation-panel">
          <p>
            Deseja remover esta tarefa? <span>Ela não poderá ser recuperada após a deleção.</span>
          </p>
          <Button text="Sim" onClick={confirmDelete} />
          <Button text="Não" onClick={cancelDelete} />
        </div>
      )}
    </div>
  );
}

export default Task;
