import styles from "../styles/TaskItem.module.css";
import PropTypes from "prop-types";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import MoveUpButton from "./MoveUpButton";
import MoveDownButton from "./MoveDownButton";

const TaskItem = ({
  id,
  order,
  title,
  cost,
  dueDate,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
}) => {
  return (
    <div className={styles.item}>
      <div className={styles.infos}>
        <span className={styles.title}>{title}</span>
        <div className={styles.details}>
          <span className={styles.id}># {id}</span>
          <span>|</span>
          <span className={styles.cost}>R$ {cost}</span>
          <span>|</span>
          <span className={styles.dueDate}>{dueDate}</span>
        </div>
      </div>
      <div className={styles.buttons}>
        <EditButton />
        <DeleteButton />
        <MoveUpButton />
        <MoveDownButton />
      </div>
    </div>
  );
};

TaskItem.propTypes = {
  id: PropTypes.number.isRequired,
  order: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  cost: PropTypes.number,
  dueDate: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onMoveUp: PropTypes.func.isRequired,
  onMoveDown: PropTypes.func.isRequired,
};

export default TaskItem;
