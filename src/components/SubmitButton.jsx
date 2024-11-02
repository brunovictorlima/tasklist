import styles from "../styles/SubmitButton.module.css";

import PropTypes from "prop-types";

const SubmitButton = ({ name }) => {
  return <button className={styles.button}>{name}</button>;
};

SubmitButton.propTypes = {
  name: PropTypes.string.isRequired,
};

export default SubmitButton;
