import styles from "../styles/TaskList.module.css";

import { useState } from "react";
import PropTypes from "prop-types";

import TaskItem from "./TaskItem";
import EditTaskForm from "./EditTaskForm";

const TaskList = ({
  tasks,
  updateTask,
  deleteTask,
  moveTaskUp,
  moveTaskDown,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const openEditModal = (task) => {
    if (!isEditModalOpen) {
      setTaskToEdit(task);
      setIsEditModalOpen(true);
    }
  };

  const closeEditModal = () => {
    setTaskToEdit(null);
    setIsEditModalOpen(false);
  };

  return (
    <div className={styles.list}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          title={task.title}
          cost={task.cost}
          dueDate={task.dueDate}
          onEdit={() => openEditModal(task)}
          onDelete={() => deleteTask(task.id)}
          onMoveUp={() => moveTaskUp(task.id)}
          onMoveDown={() => moveTaskDown(task.id)}
        />
      ))}

      {isEditModalOpen && (
        <EditTaskForm
          isOpen={isEditModalOpen}
          onRequestClose={closeEditModal}
          task={taskToEdit}
          updateTask={updateTask}
        />
      )}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      cost: PropTypes.number,
      dueDate: PropTypes.string.isRequired,
    })
  ).isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  moveTaskUp: PropTypes.func.isRequired,
  moveTaskDown: PropTypes.func.isRequired,
};

export default TaskList;
