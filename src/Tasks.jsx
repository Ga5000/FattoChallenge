import { useState, useEffect } from "react";
import { deleteTask, getTasks, saveTask, dragTask, moveTask } from './api/TaskService';
import messageType from "./constants/messageType";
import Task from './components/Task';
import CustomButton from "./components/CustomButton";
import ConfirmDelete from "./components/ConfirmDelete";
import Form from "./components/Form";
import Message from "./components/Message";
import './styles/Tasks.css';
import editIcon from './assets/edit-icon.svg';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [message, setMessage] = useState({
    text: "",
    messageType: null,
  });
  const [confirmDeletion, setConfirmDeletion] = useState({ visible: false, taskId: null });
  const [formVisible, setFormVisible] = useState({ visible: false, taskId: null, name: "", cost: 0, limitDate: "" });
  const [draggedTask, setDraggedTask] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [totalElements, setTotalElements] = useState(0);

  const handleGetTasks = async () => {
    const data = await getTasks(currentPage, pageSize);
    if (data.content) {
      setTasks(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
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

  const handleDragStart = (taskId) => {
    setDraggedTask(taskId);
  };

  const handleDragOverPageButton = (direction) => {
    if (!hoverTimeout) {
      const newPage = direction === "next" ? currentPage + 1 : currentPage - 1;
      if (newPage >= 0 && newPage < totalPages) {
        setHoverTimeout(
          setTimeout(() => {
            setCurrentPage(newPage);
            setHoverTimeout(null);
          }, 500)
        );
      }
    }
  };

  const handleDragEndPageButton = () => {
    clearTimeout(hoverTimeout);
    setHoverTimeout(null);
  };

  const handleDropTask = async (task2Id) => {
    if (draggedTask) {
      const response = await dragTask(draggedTask, task2Id);
      setMessage({
        text: response.text,
        messageType: response.type,
      });
      if (response.type === messageType.SUCCESS) {
        handleGetTasks();
      }
      setDraggedTask(null);
    }
  };

  const handlePageSizeChange = (e) => {
    const selectedValue = parseInt(e.target.value, 10);
    setPageSize(selectedValue === -1 ? totalElements : selectedValue);
    setCurrentPage(0);
  };

  useEffect(() => {
    handleGetTasks();
  }, [currentPage, pageSize]);

  return (
    <>
      <h1>Lista de Tarefas</h1>
      <div className="page-controls">
        <div className="page-size-selector">
          <label htmlFor="page-size">Tarefas por página:</label>
          <select id="page-size" onChange={handlePageSizeChange} value={pageSize === totalElements ? -1 : pageSize}>
            {[5, 10, 20, 30, 40, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
            <option value={-1}>Todos</option>
          </select>
        </div>
        <div className="page">
          <CustomButton
            text="<"
            onDragOver={(e) => {
              e.preventDefault();
              handleDragOverPageButton("prev");
            }}
            onDragLeave={handleDragEndPageButton}
            onDrop={handleDragEndPageButton}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
          />
          <p className="page-data">{`${currentPage + 1}/${totalPages}`}</p>
          <CustomButton
            text=">"
            onDragOver={(e) => {
              e.preventDefault();
              handleDragOverPageButton("next");
            }}
            onDragLeave={handleDragEndPageButton}
            onDrop={handleDragEndPageButton}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage + 1 === totalPages + 1}
          />
        </div>
      </div>

      <div className="tasks-container">
        {tasks.map((task, index) => (
          <div
            key={task.taskId}
            className="task-wrapper"
            draggable
            onDragStart={() => handleDragStart(task.taskId)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDropTask(task.taskId)}
          >
            <Task
              taskId={task.taskId}
              name={task.name}
              cost={task.cost}
              limitDate={task.limitDate}
              onMove={handleMoveTask}
              isFirstTask={index === 0}
              isLastTask={index === tasks.length - 1}
              currentPage={currentPage}
              totalPages={totalPages}
            />
            <div className="btn-group">
              <CustomButton
              className="update-btn"
                image={editIcon}
                onClick={() => setFormVisible({ visible: true, taskId: task.taskId, name: task.name, cost: task.cost, limitDate: task.limitDate })}
              />
              <CustomButton
                className="delete-btn"
                text="X"
                onClick={() => setConfirmDeletion({ visible: true, taskId: task.taskId })}
              />
            </div>
          </div>
        ))}
        <CustomButton
          className="add-task-btn"
          text="+"
          onClick={() => setFormVisible({ visible: true, taskId: null, name: null, cost: null, limitDate: null })}
        />
      </div>

      {message.text != null && (
        <Message
          text={message.text}
          type={message.messageType}
          setMessage={setMessage}
        />
      )}

      {confirmDeletion.visible && (
        <ConfirmDelete taskId={confirmDeletion.taskId} setConfirmDeletion={setConfirmDeletion} handleDeleteTask={handleDeleteTask} />
      )}
      {formVisible.visible && (
        <Form
          taskId={formVisible.taskId}
          setVisible={setFormVisible}
          handleSaveTask={handleSaveTask}
          name={formVisible.name}
          cost={formVisible.cost}
          limitDate={formVisible.limitDate}
        />
      )}
    </>
  );
}

export default Tasks;
