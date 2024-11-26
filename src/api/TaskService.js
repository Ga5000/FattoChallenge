import axios from "axios";
import messageType from "../constants/messageType";

const apiClient = axios.create({
    baseURL: 'https://fattochallenge.onrender.com/',
    timeout: 5000
  });


  
const getTasks = async (currentPage, pageSize) => { //currentPage = pageNumber

    try{
        const response = await apiClient.get(`/tasks?pageNumber=${currentPage}&pageSize=${pageSize}`);
        const { content, totalPages, totalElements, currentPage: current} = response.data;

        return {
          content,
          totalPages,
          totalElements,
          currentPage: current
      };
      
    }catch(error){
        return {
            text: "Algo deu errado ao carregar as tarefas, recarregue a página e tente novamente.",
            type: messageType.WARNING,
          };
    }
}

const saveTask = async (taskId = null, taskRequest) => {
    try {
      const response = taskId == null
        ? await apiClient.post("tasks/add", taskRequest)
        : await apiClient.put(`/tasks/update?taskId=${taskId}`, taskRequest);

      
      return {
        text: "Tarefa salva com sucesso.",
        type: messageType.SUCCESS,
      };
    } catch (error) {
      let messages = [];

      if (error.response && Array.isArray(error.response.data)) {
        error.response.data.forEach((err) => {
  
          messages.push(`${err.message}`);
        });
  
    
        return {
          text: messages.join(", "),
          type: messageType.WARNING,
        };
      } 
  
      else if (error.response && typeof error.response.data === 'string') {
        return {
          text: error.response.data, 
          type: messageType.FAILED,
        };
      }
  
      return {
        text: "Erro desconhecido ao tentar salvar a tarefa.",
        type: messageType.FAILED,
      };
    }
  };
  
  

const moveTask = async (taskId, moveUp, currentPage, pageSize) => { // moveUp = boolean, currentPage = pageNumber
    try{
        const response = await apiClient.post(`/tasks/move?taskId=${taskId}&moveUp=${moveUp}&pageNumber=${currentPage}&pageSize=${pageSize}`);

        return {
          text : "Tarefa movida com sucesso",
          type : messageType.SUCCESS
        }
    }catch(error){

        if (error.response && typeof error.response.data === 'string') {
            return {
              text: error.response.data, 
              type: messageType.FAILED,
            };
          }

        return {
            text: "Algo deu errado ao mover essa tarefa, tente novamente.",
            type: messageType.FAILED,
        };
    }
}

const deleteTask =  async (taskId) => {
    try{
        const response = await apiClient.delete(`/tasks/delete?taskId=${taskId}`);
        return {
            text : "Tarefa removida com sucesso",
            type : messageType.SUCCESS
        };
    }catch(error){

        if (error.response && typeof error.response.data === 'string') {
            return {
              text: error.response.data, 
              type: messageType.FAILED,
            };
          }

        return {
            text: "Algo deu errado ao deletar essa tarefa, tente novamente.",
            type: messageType.FAILED,
        };
    }
}

const dragTask = async (taskId, task2Id) => { // taskId = task that will be dragged, task2Id = task that is under the dragged task when the dragged task is placed
  try{
    const response =  await apiClient.post(`/tasks/drag?taskId=${taskId}&task2Id=${task2Id}`);
    return {
      text : "Tarefa movida com sucesso",
      type : messageType.SUCCESS
    };
  }catch(error){
    return {
      text: "Algo deu errado ao mover essa tarefa, tente novamente.",
      type: messageType.FAILED,
    };
  }
};

export { getTasks, moveTask, saveTask, deleteTask, dragTask};