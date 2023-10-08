import React, { useState, useEffect } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import Autocomplete from "react-autocomplete";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useUserContext } from "../contexts/UserContext";
import styles from "./Search.module.css";
import instance from "../services/APIService";

function Search({ part }) {
  const navigate = useNavigate();
  const { logout } = useUserContext();
  const [search, setSearch] = useState("");
  const [searchBaseString, setSearchBaseString] = useState(null);
  const [itemsToCheck, setItemsToCheck] = useState([]);
  const [itemsToBrowse, setItemsToBrowse] = useState(null);
  const [message, setMessage] = useState(
    "Renseigne une partie du titre à chercher."
  );

  // Lorsque l'utilisateur clique sur un titre, il est redirigé vers la page correspondant à l'item concerné
  const handleClick = (title) => {
    const itemToDisplayId = itemsToCheck.find(
      (item) => item.title === title
    ).id;
    navigate(`/${part}/${itemToDisplayId}`);
  };

  // Une requête n'est envoyée que si la string cherchée comporte au moins 3 caractères
  useEffect(() => {
    if (
      (search.length >= 3 && !searchBaseString) ||
      (search.length >= 3 &&
        searchBaseString &&
        !search.includes(searchBaseString))
    ) {
      instance
        .get(`/${part}WithTitle/${search}`)
        .then((response) => {
          setItemsToCheck(response.data);
          setSearchBaseString(search.slice(0));
          setItemsToBrowse(null);
          setMessage("");
        })
        .catch((error) => {
          if (error.response.status === 401) {
            logout(true);
          }
          if (error.response.status === 404) {
            setItemsToCheck([]);
            setItemsToBrowse(null);
            setSearchBaseString(null);
            setMessage("Aucun titre n'a été trouvé pour cette recherche !");
          }
        });
    } else if (
      search.length >= 3 &&
      searchBaseString &&
      search.includes(searchBaseString)
    ) {
      const browsableItems = [];
      itemsToCheck.forEach((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
          ? browsableItems.push(item)
          : null
      );
      setItemsToBrowse(browsableItems);
    } else if (search.length < 3 && searchBaseString) {
      setSearchBaseString(null);
      setItemsToBrowse(null);
      setItemsToCheck([]);
    } else {
      if (search.length > 0) {
        setMessage("La recherche doit contenir au moins trois lettres.");
      } else {
        setMessage("Renseigne une partie du titre à chercher.");
      }
      setItemsToCheck([]);
    }
  }, [search]);

  return (
    <div className={styles.search}>
      <h1>Tu cherches un titre ?</h1>
      <Autocomplete
        getItemValue={(item) => item.title}
        items={itemsToBrowse || itemsToCheck}
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
      <div>
        <p className={styles.messageToDisplay}>{message}</p>
      </div>
    </div>
  );
}

export default Search;

Search.propTypes = {
  part: PropTypes.string.isRequired,
};
