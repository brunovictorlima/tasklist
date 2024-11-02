import styles from "../styles/Header.module.css";
import PropTypes from "prop-types";

const Header = () => {
  return (
    <div>
      <h1 className={styles.title}>Lista de Tarefas</h1>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
