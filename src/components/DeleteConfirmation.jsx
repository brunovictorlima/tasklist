import styles from "../styles/DeleteConfirmation.module.css";

import { useState } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";

import Button from "./Button";

Modal.setAppElement("#root");

const DeleteConfirmation = ({ isOpen, onRequestClose, onDelete }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirmação de exclusão"
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
        <h2>Confirma a exclusão da tarefa?</h2>
        <p>Esta ação não pode ser desfeita.</p>
        <div className={styles.buttons}>
          <Button name="CONFIRMAR" type="submit" onClick={onDelete} />
          <Button name="CANCELAR" type="cancel" onClick={onRequestClose} />
        </div>
      </div>
    </Modal>
  );
};

DeleteConfirmation.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteConfirmation;
