import styles from "../styles/TaskItem.module.css";

import { useState } from "react";
import PropTypes from "prop-types";

import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import MoveUpButton from "./MoveUpButton";
import MoveDownButton from "./MoveDownButton";
import DeleteConfirmation from "./DeleteConfirmation";

const TaskItem = ({
  id,
  title,
  cost,
  dueDate,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
}) => {
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const itemStyle = {
    backgroundColor: cost >= 1000 ? "#e6d600" : "#474747",
  };

  const customTextColor = {
    color: cost >= 1000 ? "#222222" : "#ffffff",
  };

  const customIconColor = {
    backgroundColor: cost >= 1000 ? "#222222" : "#ffffff",
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    onDelete(id);
    setIsDeleteModalOpen(false);
  };

  const handleMoveUpClick = () => onMoveUp(id);

  const handleMoveDownClick = () => onMoveDown(id);

  return (
    <div className={styles.item} style={itemStyle}>
      <div className={styles.infos} style={customTextColor}>
        <span className={styles.title}>{title}</span>
        <div className={styles.details}>
          <span className={styles.id}># {id}</span>
          <span>|</span>
          <span className={styles.cost}>
            R$ {cost.toFixed(2).replace(".", ",")}
          </span>
          <span>|</span>
          <div className={styles.dueDateBox}>
            <div className={styles.alarmIcon} style={customIconColor}></div>
            <span className={styles.dueDate}>{formatDate(dueDate)}</span>
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        <EditButton onClick={onEdit} />
        <DeleteButton onClick={handleDeleteClick} />
        <MoveUpButton onClick={handleMoveUpClick} />
        <MoveDownButton onClick={handleMoveDownClick} />
      </div>

      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        onDelete={confirmDelete}
      />
    </div>
  );
};

TaskItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cost: PropTypes.number,
  dueDate: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onMoveUp: PropTypes.func.isRequired,
  onMoveDown: PropTypes.func.isRequired,
};

export default TaskItem;
