import './App.css';
import Tasks from './Tasks';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    alert("Para mover uma tarefa entre páginas, basta arrastar a tarefa e mantê-la sobre o botão de próxima página (>) até a página mudar. Em seguida, solte-a na posição desejada. A API PODE DEMORAR ALGUM TEMPO PARA RESPONDER AS REQUISIÇÕES POR CONTA DA POLITICA DO RENDER.COM");
  }, []);

  return (
    <div>
      <Tasks />
    </div>
  );
}

export default App;
