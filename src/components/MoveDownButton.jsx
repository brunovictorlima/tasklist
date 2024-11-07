import styles from "../styles/MoveDownButton.module.css";
import PropTypes from "prop-types";

const MoveDownButton = ({ onClick }) => {
  return <div className={styles.downIcon} onClick={onClick}></div>;
};

MoveDownButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default MoveDownButton;
