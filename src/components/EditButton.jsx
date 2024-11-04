import styles from "../styles/EditButton.module.css";
import PropTypes from "prop-types";

const EditButton = ({ onClick }) => {
  return <button className={styles.editIcon} onClick={onClick}></button>;
};

EditButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default EditButton;
