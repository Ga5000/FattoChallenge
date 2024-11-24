import './App.css';
import Tasks from './Tasks';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    alert("Para mover uma tarefa entre páginas, basta arrastar a tarefa e mantê-la sobre o botão de próxima página (>) até a página mudar. Em seguida, solte-a na posição desejada. Pode ser que o seu antivirus esteja bloqueando as requests, abra o console e acesse a url da api ('https://44.210.114.62:443'), assim o problema será corrigido");
  }, []);

  return (
    <div>
      <Tasks />
    </div>
  );
}

export default App;
