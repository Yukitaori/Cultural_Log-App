import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styles from "./BasicModal.module.css";

export default function BasicModal({
  closeModal,
  modalText,
  actionNoButton,
  actionYesButton,
  setOpenModal,
  message,
  setMessage,
  part,
  filter,
  filterMenu,
}) {
  const navigate = useNavigate();
  const handleModalClose = () => {
    closeModal(false);
    setMessage(null);
    actionNoButton();
  };
  const handleAction = () => {
    if (message) {
      setOpenModal(false);
      setMessage(null);
      navigate(`/${part}/list`);
    } else {
      actionYesButton();
    }
  };

  return (
    <div className={styles.basic_modal_container}>
      {message ? (
        <p className={styles.modal_text}>{message}</p>
      ) : (
        <p className={styles.modal_text}>{modalText}</p>
      )}
      {filter ? filterMenu() : null}
      {message ? (
        <div className={styles.btn_modal_box}>
          <button
            type="button"
            className={`${styles.btn_inside_modal} ${styles.btn_for_yes}`}
            onClick={handleAction}
          >
            Merci !
          </button>
        </div>
      ) : (
        <div className={styles.btn_modal_box}>
          <button
            type="button"
            className={`${styles.btn_inside_modal} ${styles.btn_for_no}`}
            onClick={filter ? actionNoButton : handleModalClose}
          >
            Nope
          </button>
          <button
            type="button"
            className={`${styles.btn_inside_modal} ${styles.btn_for_yes}`}
            onClick={filter ? actionYesButton : handleAction}
          >
            Banco
          </button>
        </div>
      )}
    </div>
  );
}

BasicModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalText: PropTypes.string.isRequired,
  actionNoButton: PropTypes.func.isRequired,
  actionYesButton: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  part: PropTypes.string.isRequired,
  filter: PropTypes.bool.isRequired,
  filterMenu: PropTypes.func.isRequired,
};
