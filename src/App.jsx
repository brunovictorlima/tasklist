import styles from "./App.module.css";

import Header from "./components/Header";
import TaskList from "./components/TaskList";
import NewTaskButton from "./components/NewTaskButton";

function App() {
  return (
    <div className={styles.container}>
      <Header className={styles.robotoRegular} />
      <TaskList />
      <NewTaskButton />
    </div>
  );
}

export default App;
