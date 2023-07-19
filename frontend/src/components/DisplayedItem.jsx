import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import styles from "./List.module.css";
import instance from "../services/APIService";

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
      </div>
    )
  );
}

export default DisplayedItem;

DisplayedItem.propTypes = {
  part: PropTypes.string.isRequired,
};
