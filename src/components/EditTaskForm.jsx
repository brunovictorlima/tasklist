import styles from "../styles/EditTaskForm.module.css";

import { useState, useEffect } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import Button from "./Button";

Modal.setAppElement("#root");

const EditTaskForm = ({ isOpen, onRequestClose, updateTask, task }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [cost, setCost] = useState(task?.cost || 0);
  const [dueDate, setDueDate] = useState(task?.dueDate || "");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setCost(task.cost);
      setDueDate(task.dueDate);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTask = {
      ...task,
      title,
      cost: parseFloat(cost),
      dueDate,
    };

    updateTask(updatedTask);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Editar tarefa"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        },
        content: {
          backgroundColor: "var(--darkgray)",
          border: "none",
          padding: "0",
          inset: "40px",
          maxWidth: "400px",
          maxHeight: "600px",
          margin: "auto",
          borderRadius: "20px",
        },
      }}
    >
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <label>Tarefa:</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Custo:</label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            required
          />

          <label>Data limite:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
          <div className={styles.buttons}>
            <Button name="ATUALIZAR" type="submit" />
            <Button name="CANCELAR" type="cancel" onClick={onRequestClose} />
          </div>
        </form>
      </div>
    </Modal>
  );
};

EditTaskForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    position: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    cost: PropTypes.number,
    dueDate: PropTypes.string.isRequired,
  }).isRequired,
};

export default EditTaskForm;
