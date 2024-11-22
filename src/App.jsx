import './App.css';
import Tasks from './Tasks';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    alert("Para mover uma tarefa entre páginas, basta arrastar a tarefa e mantê-la sobre o botão de próxima página (>) até a página mudar. Em seguida, solte-a na posição desejada.");
  }, []);

  return (
    <>
      <Tasks />
    </>
  );
}

export default App;
