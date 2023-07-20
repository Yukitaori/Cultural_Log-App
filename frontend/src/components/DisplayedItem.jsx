import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import ModalWrapper from "./ModalWrapper/ModalWrapper";
import BasicModal from "./ModalWrapper/BasicModal";
import styles from "./DisplayedItem.module.css";
import instance from "../services/APIService";
import pen from "../assets/icons/pen.png";
import bin from "../assets/icons/bin.png";

function DisplayedItem({ part }) {
  const { logout } = useUserContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const [itemToDisplay, setItemToDisplay] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState(null);

  const handleClickDelete = () => {
    setOpenModal(true);
  };

  const handleClickEdit = () => {
    navigate(`/${part}/edit/${id}`);
  };

  const deleteForGood = () => {
    instance
      .delete(`/${part}/${id}`)
      .then((response) => {
        if (response.status === 204) {
          setMessage("Suppression effectuée !");
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          logout(true);
        } else {
          setMessage("Il y a eu une erreur. Réessaye plus tard.");
        }
      });
    setMessage("Suppression effectuée !");
  };

  const transformDate = (day) => {
    const dayToTransform = new Date(day);
    const newDay = [
      `${dayToTransform.getDate()}`,
      `${dayToTransform.getMonth() + 1}`,
      `${dayToTransform.getFullYear()}`,
    ]
      .map((string) => (string.length === 1 ? `0${string}` : string))
      .join("/");
    return newDay;
  };

  useEffect(() => {
    instance
      .get(`/${part}/${id}`)
      .then((response) => {
        setItemToDisplay(response.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          logout(true);
        }
      });
  }, []);
  const ratingStars = [];
  if (itemToDisplay) {
    for (let i = 1; i <= parseInt(itemToDisplay.rating, 10); i += 1) {
      ratingStars.push(<p>☆</p>);
    }
  }

  return (
    itemToDisplay && (
      <div className={styles.displayedItem}>
        <div className={styles.title}>
          <p>{itemToDisplay.title}</p>
        </div>
        <div className={styles.info}>
          <div className={styles.infoPart}>
            <p>
              {itemToDisplay.director ? <p>Réalisateur :</p> : null}
              {itemToDisplay.author ? <p>Auteur :</p> : null}
              {itemToDisplay.writer ? <p>Scénariste :</p> : null}
              {itemToDisplay.artist && part !== "comics" ? (
                <p>Artiste :</p>
              ) : null}
            </p>
            <p>
              {itemToDisplay.director ||
                itemToDisplay.author ||
                itemToDisplay.writer ||
                itemToDisplay.artist}
            </p>
          </div>

          {part === "comics" ? (
            <div className={styles.infoPart}>
              <p>Dessinateur :</p>
              <p>{itemToDisplay.artist}</p>
            </div>
          ) : null}

          {itemToDisplay.is_seen ||
          itemToDisplay.is_read ||
          itemToDisplay.is_listened ? (
            <div className={styles.infoPart}>
              {part === "movies" ? <p>Vu le :</p> : null}
              {part === "discs" ? <p>Ecouté le :</p> : null}
              {part === "books" || part === "comics" ? <p>Lu le :</p> : null}
              <p>
                {(itemToDisplay.when_seen &&
                  transformDate(itemToDisplay.when_seen)) ||
                  (itemToDisplay.when_read &&
                    transformDate(itemToDisplay.when_read)) ||
                  (itemToDisplay.when_listened &&
                    transformDate(itemToDisplay.when_listened))}
              </p>
            </div>
          ) : null}

          <div className={styles.infoPart}>
            {ratingStars.map((star) => star)}
            <p>{` (${itemToDisplay.rating} / 10)`}</p>
          </div>

          {itemToDisplay.owned === 1 ? (
            <div className={styles.infoPart}>
              <p>Dans la collec' !</p>
            </div>
          ) : (
            <div className={styles.infoPart}>
              <p>Pas dans la collec'.</p>
            </div>
          )}

          {itemToDisplay.is_lent === 1 ? (
            <div className={styles.infoPart}>
              <p>Prêté à : {itemToDisplay.lent_to}</p>
            </div>
          ) : null}
        </div>

        <div className={styles.buttons}>
          <button
            className={styles.edit}
            type="button"
            onClick={handleClickEdit}
          >
            <img src={pen} alt="crayon" />
          </button>
          <button
            className={styles.delete}
            type="button"
            onClick={handleClickDelete}
          >
            <img src={bin} alt="poubelle" />
          </button>
        </div>
        {openModal ? (
          <ModalWrapper>
            <BasicModal
              modalText="Souhaites-tu REELLEMENT supprimer cet élément ?"
              closeModal={() => setOpenModal(false)}
              actionYesButton={deleteForGood}
              actionNoButton={() => setOpenModal(false)}
              setOpenModal={setOpenModal}
              setMessage={setMessage}
              message={message}
              part={part}
            />
          </ModalWrapper>
        ) : null}
      </div>
    )
  );
}

export default DisplayedItem;

DisplayedItem.propTypes = {
  part: PropTypes.string.isRequired,
};
