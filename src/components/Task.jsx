import CustomButton from './CustomButton';
import arrowUp from '../assets/arrowUp.svg';
import arrowDown from '../assets/arrowDown.svg';
import '../styles/Task.css';

function Task({ taskId, name, cost, limitDate, onMove, isFirstTask, isLastTask, currentPage, totalPages }) {
  const moveUpDisabled = currentPage === 0 && isFirstTask;
  const moveDownDisabled = currentPage === totalPages - 1 && isLastTask;

  return (
    <div className="task-card" key={taskId}>
      <h2 className="task-name">{name}</h2>
      <div className="task-data">
        <p className={`task-cost ${cost >= 1000 ? '-thousand' : null}`}>Valor: R${cost}</p>
        <p className="task-limitDate"> Data limite: {limitDate}</p>
      </div>
      <div className="move-btns">
        <CustomButton
          image={arrowUp}
          onClick={() => onMove(taskId, true)}
          disabled={moveUpDisabled}
        />
        <CustomButton
          image={arrowDown}
          onClick={() => onMove(taskId, false)}
          disabled={moveDownDisabled}
        />
      </div>
    </div>
  );
}

export default Task;
