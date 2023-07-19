import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styles from "./List.module.css";
import instance from "../services/APIService";

function List({ part }) {
  const navigate = useNavigate();
  const [itemsToDisplay, setItemsToDisplay] = useState(null);

  useEffect(() => {
    instance
      .get(`/${part}`)
      .then((response) => {
        setItemsToDisplay(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className={styles.list}>
      {itemsToDisplay &&
        itemsToDisplay.map((item) => {
          return (
            <button
              className={styles.listButtons}
              type="button"
              onClick={() => navigate(`/${part}/${item.id}`)}
            >
              <p>{item.title}</p>
            </button>
          );
        })}
    </div>
  );
}

export default List;

List.propTypes = {
  part: PropTypes.string.isRequired,
};
