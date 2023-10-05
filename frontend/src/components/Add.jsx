import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import styles from "./Add.module.css";
import schema from "../services/validators";
import instance from "../services/APIService";

function Add({ part }) {
  const [itemToAdd, setItemToAdd] = useState(null);
  const [infoMessage, setInfoMessage] = useState(null);
  const { logout } = useUserContext();
  const navigate = useNavigate();

  const transformDate = (day) => {
    if (day) {
      const dayToTransform = new Date(day);
      const newDay = [
        `${dayToTransform.getFullYear()}`,
        `${dayToTransform.getMonth() + 1}`,
        `${dayToTransform.getDate()}`,
      ]
        .map((string) => (string.length === 1 ? `0${string}` : string))
        .join("-");
      return newDay;
    }
    return null;
  };

  useEffect(() => {
    // Le useEffect détermine la forme de l'objet (et du formulaire) en fonction de la catégorie de l'item
    if (part === "movies") {
      setItemToAdd({
        title: "",
        director: "",
        is_seen: "0",
        when_seen: null,
        rating: null,
        owned: "0",
        is_lent: "0",
        lent_to: null,
      });
    }
    if (part === "books") {
      setItemToAdd({
        title: "",
        author: "",
        is_read: "0",
        when_read: null,
        rating: null,
        owned: "0",
        is_lent: "0",
        lent_to: null,
      });
    }
    if (part === "discs") {
      setItemToAdd({
        title: "",
        artist: "",
        is_listened: "0",
        when_listened: null,
        rating: null,
        owned: "0",
        is_lent: "0",
        lent_to: null,
      });
    }
    if (part === "comics") {
      setItemToAdd({
        title: "",
        artist: "",
        writer: "",
        is_read: "0",
        when_read: null,
        rating: null,
        owned: "0",
        is_lent: "0",
        lent_to: null,
      });
    }
  }, []);

  const handleChange = (e) => {
    setItemToAdd({ ...itemToAdd, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    // TODO améliorer le schéma de validation
    e.preventDefault();
    const { error } = schema.validate(itemToAdd);
    if (error) {
      setInfoMessage(error.message);
    } else {
      // TODO empêcher l'ajout de deux fois la même entrée
      instance
        .post(`/${part}`, itemToAdd)
        .then((response) => {
          if (response.status === 201) {
            setItemToAdd(null);
            setInfoMessage("L'ajout s'est hyper bien passé !");
            setTimeout(() => navigate(-1), 1000);
          } else {
            setInfoMessage(response.data);
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            logout(true);
          } else {
            setInfoMessage("Il y a eu un problème. Réessaye plus tard.");
          }
        });
    }
  };

  return (
    <div className={styles.add}>
      <div className={styles.title}>
        <h2>Ajouter un titre</h2>
      </div>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        {itemToAdd
          ? Object.keys(itemToAdd).map((itemKey) => {
              const getField = (key) => {
                // Conditionnement des types d'input et des labels en fonction de la propriété de l'objet à afficher
                let field;
                let input;
                switch (key) {
                  case "title":
                    field = "Titre";
                    input = "text";
                    break;
                  case "writer":
                    field = "Scénariste";
                    input = "text";
                    break;
                  case "author":
                    field = "Auteur";
                    input = "text";
                    break;
                  case "artist":
                    field = "Artiste";
                    input = "text";
                    break;
                  case "director":
                    field = "Réalisateur";
                    input = "text";
                    break;
                  case "is_read":
                    field = "Lu ?";
                    input = "radio";
                    break;
                  case "when_read":
                    field = "Lu quand ?";
                    input = "date";
                    break;
                  case "is_seen":
                    field = "Vu ?";
                    input = "radio";
                    break;
                  case "when_seen":
                    field = "Vu quand ?";
                    input = "date";
                    break;
                  case "is_listened":
                    field = "Ecouté ?";
                    input = "radio";
                    break;
                  case "when_listened":
                    field = "Ecouté quand ?";
                    input = "date";
                    break;
                  case "rating":
                    field = "Note";
                    input = "text";
                    break;
                  case "owned":
                    field = "Possédé ?";
                    input = "radio";
                    break;
                  case "lent_to":
                    field = "Prêté à qui ?";
                    input = "text";
                    break;
                  case "is_lent":
                    field = "Prêté ?";
                    input = "radio";
                    break;
                  default:
                    field = "";
                    break;
                }
                return {
                  field,
                  input,
                };
              };

              const getFormPart = (input) => {
                if (
                  itemKey === "is_lent" &&
                  (itemToAdd.owned === "0" || itemToAdd.owned === 0)
                ) {
                  itemToAdd.is_lent = null;
                  return null;
                }

                if (
                  itemKey === "lent_to" &&
                  (itemToAdd.is_lent === "0" || itemToAdd.is_lent === 0)
                ) {
                  itemToAdd.lent_to = null;
                  return null;
                }

                if (
                  (itemKey === "lent_to" && itemToAdd.owned === "0") ||
                  (itemKey === "lent_to" && itemToAdd.owned === 0)
                ) {
                  itemToAdd.is_lent = 0;
                  itemToAdd.lent_to = null;
                  return null;
                }

                if (
                  (itemKey === "lent_to" && itemToAdd.is_lent === "1") ||
                  (itemKey === "lent_to" && itemToAdd.is_lent === 1)
                ) {
                  return (
                    <div className={styles.formBlock} key={itemKey}>
                      <label htmlFor={itemKey}>{getField(itemKey).field}</label>
                      <input
                        name={itemKey}
                        type={getField(itemKey).input}
                        value={itemToAdd.itemKey}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  );
                }

                if (input === "radio") {
                  return (
                    <div className={styles.formBlock} key={itemKey}>
                      <p>{getField(itemKey).field}</p>
                      <div className={styles.radio}>
                        <label htmlFor={itemKey}>Non</label>
                        <input
                          name={itemKey}
                          type="radio"
                          value={0}
                          defaultChecked={
                            !itemToAdd[itemKey] ||
                            itemToAdd[itemKey] === "0" ||
                            itemToAdd[itemKey] === 0
                          }
                          onChange={(e) => handleChange(e)}
                        />
                        <label htmlFor={itemKey}>Oui</label>
                        <input
                          name={itemKey}
                          type="radio"
                          value={1}
                          defaultChecked={
                            itemToAdd[itemKey] === "1" ||
                            itemToAdd[itemKey] === 1
                          }
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                  );
                }
                // Si une propriété is_*** est à false, l'input pour le when_*** associé n'est pas affichée
                if (
                  (itemKey === "when_read" || itemKey === "rating") &&
                  (itemToAdd.is_read === 0 || itemToAdd.is_read === "0")
                ) {
                  itemToAdd.when_read = null;
                  itemToAdd.rating = null;
                  return null;
                }
                if (
                  (itemKey === "when_listened" || itemKey === "rating") &&
                  (itemToAdd.is_listened === 0 || itemToAdd.is_listened === "0")
                ) {
                  itemToAdd.when_listened = null;
                  itemToAdd.rating = null;
                  return null;
                }
                if (
                  (itemKey === "when_seen" || itemKey === "rating") &&
                  (itemToAdd.is_seen === 0 || itemToAdd.is_seen === "0")
                ) {
                  itemToAdd.when_seen = null;
                  itemToAdd.rating = null;
                  return null;
                }

                if (input === "text") {
                  return (
                    <div className={styles.formBlock} key={itemKey}>
                      <label htmlFor={itemKey}>{getField(itemKey).field}</label>
                      <input
                        name={itemKey}
                        type={getField(itemKey).input}
                        value={itemToAdd.itemKey}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  );
                }

                if (
                  itemKey === "when_seen" ||
                  itemKey === "when_listened" ||
                  itemKey === "when_read"
                ) {
                  return (
                    <div className={styles.formBlock} key={itemKey}>
                      <label htmlFor={itemKey}>{getField(itemKey).field}</label>
                      <input
                        name={itemKey}
                        type={getField(itemKey).input}
                        value={transformDate(itemToAdd[itemKey])}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  );
                }

                return (
                  <div className={styles.formBlock} key={itemKey}>
                    <label htmlFor={itemKey}>{getField(itemKey).field}</label>
                    <input
                      name={itemKey}
                      type={getField(itemKey).input}
                      value={itemToAdd.itemKey}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                );
              };
              return getFormPart(getField(itemKey).input);
            })
          : null}

        {infoMessage ? (
          <div className={styles.infoMessage}>
            <p>{infoMessage}</p>
          </div>
        ) : null}
        {itemToAdd ? (
          <button type="submit" className={styles.confirmButton}>
            Ajouter
          </button>
        ) : null}
      </form>
    </div>
  );
}

export default Add;

Add.propTypes = {
  part: PropTypes.string.isRequired,
};
