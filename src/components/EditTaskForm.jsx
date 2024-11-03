import { useState, useEffect } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import Button from "./Button";

Modal.setAppElement("#root");

const EditTaskForm = ({ isOpen, onRequestClose, editTask, task }) => {
  const [title, setTitle] = useState("");
  const [cost, setCost] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setCost(task.cost);
      setDueDate(task.dueDate);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    editTask({ ...task, title, cost, dueDate });
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Editar tarefa"
    >
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
        <Button name="ATUALIZAR" type="submit" />
        <Button name="CANCELAR" type="button" onClick={onRequestClose} />
      </form>
    </Modal>
  );
};

EditTaskForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    order: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    dueDate: PropTypes.string.isRequired,
  }).isRequired,
};

export default EditTaskForm;
