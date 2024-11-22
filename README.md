# Fatto Challenge - Task Management API

Este é um projeto de API para gerenciamento de tarefas desenvolvido como parte do desafio **Fatto Challenge**. A API oferece funcionalidades para adicionar, atualizar, excluir e organizar tarefas em uma lista, com suporte a validações e paginação.

## 🛠 Tecnologias Utilizadas

- **Spring Boot**: Framework para desenvolvimento de aplicações Java.
- **MySQL**: Banco de dados relacional para armazenar as informações das tarefas.
- **JPA (Java Persistence API)**: Para mapeamento objeto-relacional e persistência dos dados.
- **Validation (Jakarta)**: Para validação dos dados das requisições.

## ⚙️ Funcionalidades

- **Adicionar Tarefa**: Criar novas tarefas com validações de dados.
- **Atualizar Tarefa**: Atualizar os detalhes de uma tarefa existente.
- **Excluir Tarefa**: Remover uma tarefa da lista.
- **Listar Tarefas**: Obter uma lista paginada de todas as tarefas.
- **Mover Tarefa**: Alterar a posição de uma tarefa na lista (movimento para cima ou para baixo).
- **Arrastar Tarefa**: Trocar a posição entre duas tarefas específicas.

## 📂 Endpoints

### Adicionar Tarefa
**POST** `/tasks/add`  
Adiciona uma nova tarefa.
- **Body**: `TaskRequestDto` (JSON)
- **Resposta**: `TaskResponseDto` (JSON) ou mensagem de erro.

---

### Atualizar Tarefa
**PUT** `/tasks/update`  
Atualiza os dados de uma tarefa existente.
- **Query Params**: `taskId` (UUID)
- **Body**: `TaskRequestDto` (JSON)
- **Resposta**: `TaskResponseDto` (JSON) ou mensagem de erro.

---

### Excluir Tarefa
**DELETE** `/tasks/delete`  
Remove uma tarefa da lista.
- **Query Params**: `taskId` (UUID)
- **Resposta**: Sem corpo ou mensagem de erro.

---

### Listar Tarefas
**GET** `/tasks`  
Obtém uma lista paginada de todas as tarefas.
- **Query Params**:
    - `pageNumber` (int)
    - `pageSize` (int)
- **Resposta**: `PaginatedResponseDTO<TaskResponseDto>` (JSON).

---

### Mover Tarefa
**POST** `/tasks/move`  
Move uma tarefa para cima ou para baixo na lista.
- **Query Params**:
    - `taskId` (UUID)
    - `moveUp` (boolean)
    - `pageNumber` (int)
    - `pageSize` (int)
- **Resposta**: Sem corpo ou mensagem de erro.

---

### Arrastar Tarefa
**POST** `/tasks/drag`  
Troca a posição de uma tarefa com outra.
- **Query Params**:
    - `taskId` (UUID)
    - `task2Id` (UUID)
- **Resposta**: Sem corpo ou mensagem de erro.

---

## 🚨 Tratamento de Erros

### Validação de Dados
Caso algum campo da requisição seja inválido, a API retorna uma lista de erros no seguinte formato:
```json
[
  {
    "message": "Descrição do erro"
  }
]
