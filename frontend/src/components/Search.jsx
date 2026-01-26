import React, { useState, useEffect } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
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

  const handleSearch = (value) => {
    setSearch(value);
  };

  useEffect(() => {
    const items = itemsToBrowse || itemsToCheck;
    if (items && items.length > 0) {
      document.getElementById("searchList").innerHTML = "";
      items.map((item) => {
        const line = document.createElement("li");
        line.innerText = item.title;
        document.getElementById("searchList").append(line);
        line.addEventListener("click", (e) => {
          handleClick(e.target.innerText);
        });
        return true;
      });
    }
  }, [itemsToBrowse, itemsToCheck]);

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
      setMessage("La recherche doit contenir au moins trois lettres.");
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
      <div className={styles.searchListBox} id="searchListBox">
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {(itemsToBrowse || itemsToCheck.length > 0) && <ul id="searchList" />}
      </div>
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
