import styles from "../styles/AddTaskForm.module.css";

import { useState } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";

import Button from "./Button";

Modal.setAppElement("#root");

const AddTaskForm = ({ isOpen, onRequestClose, addTask }) => {
  const [title, setTitle] = useState("");
  const [cost, setCost] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleCostChange = (e) => {
    let value = e.target.value;

    value = value.replace(",", ".");

    if (/^[0-9]*\.?[0-9]*$/.test(value)) {
      setCost(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const floatCost = Math.round(parseFloat(cost) * 100) / 100;

    addTask({ title, cost: floatCost, dueDate });

    setTitle("");
    setCost("");
    setDueDate("");
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Adicionar tarefa"
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
            placeholder="Digite a tarefa"
          />

          <label>{"Custo (R$):"}</label>
          <input
            type="text" // atencao a esse tipo
            value={cost}
            onChange={handleCostChange}
            required
            placeholder="Digite apenas o valor"
          />

          <label>Data limite:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />

          <div className={styles.buttons}>
            <Button name="ADICIONAR" type="submit" />
            <Button name="CANCELAR" type="cancel" onClick={onRequestClose} />
          </div>
        </form>
      </div>
    </Modal>
  );
};

AddTaskForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
};

export default AddTaskForm;
