import { useNavigate } from "react-router";
import styles from "./Modal.module.css";

const Modal = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.overlay}
      onClick={() => navigate(-1)}
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
