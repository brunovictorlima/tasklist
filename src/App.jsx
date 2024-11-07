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
      const isDuplicate = tasks.some(
        (task) => task.title.toLowerCase() === newTask.title.toLowerCase()
      );

      if (isDuplicate) {
        alert("Já existe uma tarefa com este nome.");
        return;
      }

      const maxPosition =
        tasks.length > 0 ? Math.max(...tasks.map((task) => task.position)) : 0;

      newTask = {
        ...newTask,
        id: String(
          tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1
        ),
        position: maxPosition + 1,
      };

      const response = await api.post("/tasks", newTask);
      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      const isDuplicate = tasks.some(
        (task) =>
          task.id !== updatedTask.id &&
          task.title.toLowerCase() === updatedTask.title.toLowerCase()
      );

      if (isDuplicate) {
        alert("Já existe uma tarefa com este nome.");
        return;
      }

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

      setTasks((prevTasks) => {
        const updatedTasks = prevTasks
          .filter((task) => task.id !== taskId)
          .map((task, index) => ({
            ...task,
            position: index + 1,
          }));

        updatedTasks.forEach(async (task) => {
          await api.put(`/tasks/${task.id}`, {
            ...task,
            position: task.position,
          });
        });

        return updatedTasks;
      });
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  };

  const moveTaskUp = async () => {};

  const moveTaskDown = () => {};

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
