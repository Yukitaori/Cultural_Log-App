import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import styles from "./DisplayedItem.module.css";
import instance from "../services/APIService";
import pen from "../assets/icons/pen.png";
import bin from "../assets/icons/bin.png";

function DisplayedItem({ part }) {
  const { id } = useParams();
  const [itemToDisplay, setItemToDisplay] = useState(null);

  useEffect(() => {
    instance
      .get(`/${part}/${id}`)
      .then((response) => {
        setItemToDisplay(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    itemToDisplay && (
      <div className={styles.displayedItem}>
        <p>{itemToDisplay.title}</p>
        <p>
          {itemToDisplay.director ||
            itemToDisplay.writer ||
            itemToDisplay.artist}
        </p>
        <p>
          {itemToDisplay.when_seen ||
            itemToDisplay.when_read ||
            itemToDisplay.when_listened}
        </p>
        <div className={styles.buttons}>
          <button className={styles.edit} type="button">
            <img src={pen} alt="crayon" />
          </button>
          <button className={styles.delete} type="button">
            <img src={bin} alt="poubelle" />
          </button>
        </div>
      </div>
    )
  );
}

export default DisplayedItem;

DisplayedItem.propTypes = {
  part: PropTypes.string.isRequired,
};
