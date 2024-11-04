import styles from "./App.module.css";

import { useState, useEffect } from "react";
import api from "./api/api";

import Header from "./components/Header";
import TaskList from "./components/TaskList";
import Button from "./components/Button";
import AddTaskForm from "./components/AddTaskForm";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (newTask) => {
    try {
      const maxId =
        tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) : 0;
      const maxPosition =
        tasks.length > 0 ? Math.max(...tasks.map((task) => task.position)) : 0;

      newTask = { ...newTask, id: maxId + 1, position: maxPosition + 1 };

      const response = await api.post("/tasks", newTask);
      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      const response = await api.put(`/tasks/${updatedTask.id}`, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === response.data.id ? response.data : task
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const taskToDelete = tasks.find((task) => task.id === taskId);
      if (!taskToDelete) return;

      await api.delete(`/tasks/${taskId}`);

      setTasks((prevTasks) =>
        prevTasks
          .filter((task) => task.id !== taskId)
          .map((task) => ({
            ...task,
            position:
              task.position > taskToDelete.position
                ? task.position - 1
                : task.position,
          }))
      );
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  };

  const moveTaskUp = (id) => {
    setTasks((prevTasks) => {
      const tasksCopy = [...prevTasks];

      const index = tasksCopy.findIndex((task) => task.id === id);
      if (index === -1 || tasksCopy[index].position === 1) return prevTasks;

      const previousTask = tasksCopy.find(
        (task) => task.position === tasksCopy[index].position - 1
      );
      if (previousTask) {
        const currentTaskPosition = tasksCopy[index].position;
        tasksCopy[index].position = previousTask.position;
        previousTask.position = currentTaskPosition;
      }
      return tasksCopy.sort((a, b) => a.position - b.position);
    });
  };

  const moveTaskDown = (id) => {
    setTasks((prevTasks) => {
      const tasksCopy = [...prevTasks];

      const index = tasksCopy.findIndex((task) => task.id === id);
      if (index === -1 || tasksCopy[index].position === tasksCopy.length)
        return prevTasks;

      const nextTask = tasksCopy.find(
        (task) => task.position === tasksCopy[index].position + 1
      );
      if (nextTask) {
        const currentTaskPosition = tasksCopy[index].position;
        tasksCopy[index].position = nextTask.position;
        nextTask.position = currentTaskPosition;
      }
      return tasksCopy.sort((a, b) => a.position - b.position);
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <Header />
      <TaskList
        tasks={tasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
        moveTaskUp={moveTaskUp}
        moveTaskDown={moveTaskDown}
      />
      <Button name="ADICIONAR" type="submit" onClick={openModal} />
      <AddTaskForm
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        addTask={addTask}
      />
    </div>
  );
}

export default App;
