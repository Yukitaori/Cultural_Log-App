import React, { useState, useEffect } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import Autocomplete from "react-autocomplete";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Search.module.css";
import instance from "../services/APIService";

function Search({ part }) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [itemsToCheck, setItemsToCheck] = useState([]);

  const handleClick = (title) => {
    const itemToDisplayId = itemsToCheck.find(
      (item) => item.title === title
    ).id;
    navigate(`/${part}/${itemToDisplayId}`);
  };

  useEffect(() => {
    if (search.length >= 3) {
      instance
        .get(`/${part}WithTitle/${search}`)
        .then((response) => {
          setItemsToCheck(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setItemsToCheck([]);
    }
  }, [search]);

  return (
    <div className={styles.search}>
      <Autocomplete
        getItemValue={(item) => item.title}
        items={itemsToCheck}
        menuStyle={{
          boxShadow: "0 5px 5px 0px black",
          border: "3px solid var(--second-bg-color)",
          backgroundColor: "var(--main-bg-color)",
          color: "var(--main-color)",
          borderRadius: "0 0 50px 50px",
          padding: "1rem",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "1rem",
          textAlign: "center",
          fontWeight: "bold",
          gap: "0.5em",
          cursor: "pointer",
        }}
        renderItem={(item, isHighlighted) => (
          <div
            style={{
              background: isHighlighted
                ? "var(--second-bg-color)"
                : "var(--main-bg-color)",
            }}
          >
            {item.title}
          </div>
        )}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onSelect={(val) => {
          handleClick(val);
        }}
      />
    </div>
  );
}

export default Search;

Search.propTypes = {
  part: PropTypes.string.isRequired,
};
