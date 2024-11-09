import styles from "../styles/TaskList.module.css";

import { useState, useCallback } from "react";
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

  const handleMoveUpClick = useCallback(
    (id) => {
      moveTaskUp(id);
    },
    [moveTaskUp]
  );

  const handleMoveDownClick = useCallback(
    (id) => {
      moveTaskDown(id);
    },
    [moveTaskDown]
  );

  return (
    <div className={styles.list}>
      {tasks
        .slice()
        .sort((a, b) => a.position - b.position)
        .map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            title={task.title}
            cost={task.cost}
            dueDate={task.dueDate}
            onEdit={() => openEditModal(task)}
            onDelete={() => deleteTask(task.id)}
            onMoveUp={() => handleMoveUpClick(task.id)}
            onMoveDown={() => handleMoveDownClick(task.id)}
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
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      cost: PropTypes.number,
      dueDate: PropTypes.string.isRequired,
    })
  ).isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  moveTaskUp: PropTypes.func,
  moveTaskDown: PropTypes.func,
};

export default TaskList;
