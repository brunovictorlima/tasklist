import styles from "../styles/MoveUpButton.module.css";
import PropTypes from "prop-types";

const MoveUpButton = ({ onClick }) => {
  return <div className={styles.upIcon} onClick={onClick}></div>;
};

MoveUpButton.propTypes = {
  onClick: PropTypes.func,
};

export default MoveUpButton;
