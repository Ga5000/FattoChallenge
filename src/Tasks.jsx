import { useState, useEffect } from "react";
import { deleteTask, getTasks, moveTask, saveTask } from './api/TaskService';
import messageType from "./constants/messageType";
import Task from './components/Task';
import CustomButton from "./components/CustomButton";
import ConfirmDelete from "./components/ConfirmDelete";
import Form from "./components/Form";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [message, setMessage] = useState({
    text: "",
    messageType: null,
  });
  const [confirmDeletion, setConfirmDeletion] = useState({ visible: false, taskId: null });
  const [formVisible, setFormVisible] = useState({visible : false, taskId : null, name : "", cost : 0, limitDate : ""});

  const handleGetTasks = async () => {
    const data = await getTasks(currentPage, pageSize);
    if (data.content) {
      setTasks(data.content);
      setTotalPages(data.totalPages)
    } else {
      setMessage({
        text: data.text,
        messageType: data.type,
      });
    }
  };

  const handleSaveTask = async (taskId = null, taskRequest) => {
    const response = await saveTask(taskId, taskRequest);
    setMessage({
      text: response.text,
      messageType: response.type,
    });
    if (response.type === messageType.SUCCESS) {
      handleGetTasks();
    }
  };

  const handleDeleteTask = async (taskId) => {
    const response = await deleteTask(taskId);
    setMessage({
      text: response.text,
      messageType: response.type,
    });
    if (response.type === messageType.SUCCESS) {
      handleGetTasks();
    }
    setConfirmDeletion({ visible: false, taskId: null });
  };

  const handleMoveTask = async (taskId, moveUp) => {
    const response = await moveTask(taskId, moveUp, currentPage, pageSize);
    setMessage({
      text: response.text,
      messageType: response.type,
    });
    if (response.type === messageType.SUCCESS) {
      handleGetTasks();
    }
  };

  useEffect(() => {
    handleGetTasks();
  }, [currentPage, pageSize]);

  return (
    <>
      <h1>Lista de Tarefas</h1>

      <div className="tasks-container">
      {tasks.map((task) => (
          <div key={task.taskId} className="task-wrapper">
            <Task
              taskId={task.taskId}
              name={task.name}
              cost={task.cost}
              limitDate={task.limitDate}
              onMove={handleMoveTask}
            />
            <div className="btn-group">
             
                <CustomButton
                text="Up"
                  image={null}
                  onClick={() => setFormVisible({visible : true, taskId : task.taskId, name : task.name, cost : task.cost, limitDate : task.limitDate})}
                />
             
      
                <CustomButton
                text="hshysuah"
                  image={null}
                  onClick={() => setConfirmDeletion({ visible: true, taskId: task.taskId })}
                />
             
            </div>
          </div>
        ))}
        <CustomButton 
         text="+"
         onClick={() => setFormVisible({visible : true, taskId : null, name : null, cost : null, limitDate : null})}
        />
      </div>

      <div className="page">
        <CustomButton 
        text="<"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage == 0}
        />
        <p className="page-data">{`${currentPage + 1}/${totalPages}`}</p>

        <CustomButton
        text=">"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage + 1 == totalPages}
        />
      </div>

      {confirmDeletion.visible && (
        <ConfirmDelete
        taskId={confirmDeletion.taskId}
        setConfirmDeletion={setConfirmDeletion}
        handleDeleteTask={handleDeleteTask}
        />
      )}

      {
        formVisible.visible && (
          <Form 
          taskId={formVisible.taskId}
          setVisible={setFormVisible}
          handleSaveTask={handleSaveTask}
          name={formVisible.name}
          cost={formVisible.cost}
          limitDate={formVisible.limitDate}
          />
        )
      }

    </>
  );
}

export default Tasks;
