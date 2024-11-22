# Fatto Challenge - Front-End

Este é o front-end da aplicação de gerenciamento de tarefas do **Fatto Challenge**. A interface foi desenvolvida com **React**, com foco em proporcionar uma experiência intuitiva e interativa para o usuário. A comunicação com a API é feita utilizando **Axios**.

## 🛠 Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Axios**: Biblioteca para realizar requisições HTTP para a API.
- **CSS**: Estilização personalizada para os componentes e layout.

---

## ⚙️ Funcionalidades da Interface

### 📝 Adicionar Tarefa
- **Como funciona**: Ao clicar no botão **Adicionar Tarefa**, um formulário é exibido para preencher os campos necessários. Após o envio, a tarefa é adicionada à lista.
- **Validação**: Campos obrigatórios são validados antes do envio.

---

### ✏️ Editar Tarefa
- **Como funciona**: Clique no botão de edição de uma tarefa específica para abrir um formulário pré-preenchido com os dados atuais. Após as alterações, clique em **Salvar** para atualizar a tarefa.

---

### 🗑️ Excluir Tarefa
- **Como funciona**: Clique no botão de exclusão para abrir um pop-up de confirmação. A tarefa será removida apenas após a confirmação do usuário.

---

### 🔼🔽 Mover Tarefa (Para Cima/Para Baixo)
- **Como funciona**: Cada tarefa possui dois botões: **Mover para cima** e **Mover para baixo**. Clique para alterar a posição da tarefa na lista.

---

### 🖱️ Arrastar e Soltar Tarefas
- **Como funciona**:  
  1. Clique e segure em uma tarefa para arrastá-la.  
  2. Arraste a tarefa para a posição desejada e solte-a sobre outra tarefa para trocar suas posições.  
  3. **Arrastar entre páginas**: Arraste a tarefa para o botão **Próxima Página**; a interface irá navegar automaticamente para a próxima página, onde você pode soltar a tarefa na posição desejada.

---

## 📂 Estrutura dos Componentes

### Componentes Principais
- **Tasks**: Lista as tarefas paginadas, com opções de mover, editar, excluir e arrastar.  
- **Form**: Formulário reutilizável para adicionar e editar tarefas.  
- **ConfirmDelete**: Componente de pop-up para confirmação de exclusão.  
- **Task**: Componente que contem todas as informações das tarefas

---

