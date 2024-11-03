import { useState } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import Button from "./Button";

Modal.setAppElement("#root");

const AddTaskForm = ({ isOpen, onRequestClose, addTask }) => {
  const [title, setTitle] = useState("");
  const [cost, setCost] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ title, cost, dueDate });
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Adicionar tarefa"
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
        <Button name="ADICIONAR" type="submit" onClick={handleSubmit} />
        <Button name="CANCELAR" type="button" onClick={onRequestClose} />
      </form>
    </Modal>
  );
};

AddTaskForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
};

export default AddTaskForm;
