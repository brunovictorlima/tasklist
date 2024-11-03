import styles from "./App.module.css";

import { useState } from "react";

import Header from "./components/Header";
import TaskList from "./components/TaskList";
import Button from "./components/Button";
import AddTaskForm from "./components/AddTaskForm";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <Header />
      <TaskList />
      <Button name="ADICIONAR TAREFA" type="submit" onClick={openModal} />
      <AddTaskForm isOpen={isModalOpen} onRequestClose={closeModal} />
    </div>
  );
}

export default App;
