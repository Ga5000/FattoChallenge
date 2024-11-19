import CustomButton from './CustomButton';
import arrowUp from '../assets/arrowUp.svg';
import arrowDown from '../assets/arrowDown.svg';

function Task({taskId, name, cost, limitDate, onMove}){
    return(
        <div className="task-card" key={taskId}>
            <h2 className="task-name">{name}</h2>
            <div className="task-data">
                <p className={`task-cost ${cost >= 1000 ? '-thousand' : null}`}>Valor: R${cost}</p>
                <p className="task-limitDate"> Data limite: {limitDate}</p>
            </div>
            <div className="move-btns">
                <CustomButton
                 image={null}
                 onClick={() => onMove(taskId, true)}
                />

                <CustomButton
                 image={null}
                 onClick={() => onMove(taskId, false)}
                />
                
            </div>
        </div>
    );
}

export default Task;