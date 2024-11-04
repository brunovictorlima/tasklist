import styles from "../styles/DeleteButton.module.css";
import PropTypes from "prop-types";

const DeleteButton = ({ onClick }) => {
  return <button className={styles.deleteIcon} onClick={onClick}></button>;
};

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default DeleteButton;
