import styles from "../styles/TaskList.module.css";

import TaskItem from "./TaskItem";

const TaskList = () => {
  return (
    <div className={styles.list}>
      <TaskItem
        title="Criar lógica dos botões"
        id="77"
        cost="799,90"
        order={2}
        dueDate="02/11"
      />
      <TaskItem
        title="Criar botão para inserir nova tarefa"
        id="78"
        cost="100,00"
        order={1}
        dueDate="01/11"
      />
      <TaskItem
        title="Adicionar ícone ao lado da data limite"
        id="79"
        cost="80,00"
        order={3}
        dueDate="03/11"
      />
    </div>
  );
};

export default TaskList;
