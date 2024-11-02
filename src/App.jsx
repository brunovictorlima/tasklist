import styles from "./App.module.css";

import Header from "./components/Header";
import TaskList from "./components/TaskList";
import SubmitButton from "./components/SubmitButton";

function App() {
  return (
    <div className={styles.container}>
      <Header className={styles.robotoRegular} />
      <TaskList />
      <SubmitButton name="ADICIONAR TAREFA" />
    </div>
  );
}

export default App;
