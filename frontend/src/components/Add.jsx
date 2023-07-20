import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import styles from "./Add.module.css";
import schema from "../services/validators";
import instance from "../services/APIService";

function Add({ part, edition }) {
  const [itemToAdd, setItemToAdd] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [infoMessage, setInfoMessage] = useState(null);
  const { id } = useParams();
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
    if (edition) {
      instance
        .get(`/${part}/${id}`)
        .then((response) => {
          setItemToEdit(response.data);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            logout(true);
          }
        });
    } else {
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
    }
  }, []);

  const handleChange = (e) => {
    if (edition) {
      setItemToEdit({ ...itemToEdit, [e.target.name]: e.target.value });
    } else {
      setItemToAdd({ ...itemToAdd, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO améliorer le schéma de validation
    if (edition) {
      // TODO gérer la suppression des valeurs des champs when_*** et lent_to si la propriété is_*** ou is_lent est à faux
      // et le champ rating si les champs is_*** sont à faux
      instance
        .put(`/${part}/${id}`, itemToEdit)
        .then((response) => {
          if (response.status === 204) {
            setItemToEdit(null);
            setInfoMessage("La modification s'est hyper bien passée !");
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            logout(true);
          } else {
            setInfoMessage("Il y a eu un problème. Réessaye plus tard");
          }
        });
    } else {
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
              setTimeout(() => navigate(-1), 2000);
            } else {
              setInfoMessage(response.data);
            }
          })
          .catch((err) => {
            if (err.response.status === 401) {
              logout(true);
            } else {
              setInfoMessage("Il y a eu un problème. Réessaye plus tard");
            }
          });
      }
    }
  };

  return (
    <div className={styles.add}>
      <div className={styles.title}>
        <h2>{edition ? "Modifier" : "Ajouter"} un titre</h2>
      </div>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        {/* ----------- PARTIE EDITION -----------*/}

        {itemToEdit
          ? Object.keys(itemToEdit).map((itemKey) => {
              if (itemKey === "id" || itemKey === "user_id") return null;
              const getField = (key) => {
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
                  itemKey === "lent_to" &&
                  (itemToEdit.is_lent === "0" || itemToEdit.is_lent === 0)
                ) {
                  return null;
                }

                if (
                  (itemKey === "lent_to" && itemToEdit.is_lent === "1") ||
                  (itemKey === "lent_to" && itemToEdit.is_lent === 1)
                ) {
                  return (
                    <div className={styles.formBlock} key={itemKey}>
                      <label htmlFor={itemKey}>{getField(itemKey).field}</label>
                      <input
                        name={itemKey}
                        type={getField(itemKey).input}
                        value={itemToEdit.itemKey}
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
                          defaultChecked={itemToEdit[itemKey] === 0}
                          onChange={(e) => handleChange(e)}
                        />
                        <label htmlFor={itemKey}>Oui</label>
                        <input
                          name={itemKey}
                          type="radio"
                          value={1}
                          defaultChecked={itemToEdit[itemKey] === 1}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                  );
                }

                if (
                  (itemKey === "when_read" || itemKey === "rating") &&
                  (itemToEdit.is_read === 0 || itemToEdit.is_read === "0")
                ) {
                  return null;
                }
                if (
                  (itemKey === "when_listened" || itemKey === "rating") &&
                  (itemToEdit.is_listened === 0 ||
                    itemToEdit.is_listened === "0")
                ) {
                  return null;
                }
                if (
                  (itemKey === "when_seen" || itemKey === "rating") &&
                  (itemToEdit.is_seen === 0 || itemToEdit.is_seen === "0")
                ) {
                  return null;
                }

                if (input === "text") {
                  return (
                    <div className={styles.formBlock} key={itemKey}>
                      <label htmlFor={itemKey}>{getField(itemKey).field}</label>
                      <input
                        name={itemKey}
                        type={getField(itemKey).input}
                        value={itemToEdit[itemKey]}
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
                        value={transformDate(itemToEdit[itemKey])}
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
                      value={itemToEdit.itemKey}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                );
              };
              return getFormPart(getField(itemKey).input);
            })
          : null}

        {/* ----------- PARTIE AJOUT -----------*/}

        {itemToAdd
          ? Object.keys(itemToAdd).map((itemKey) => {
              const getField = (key) => {
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
                  itemKey === "lent_to" &&
                  (itemToAdd.is_lent === "0" || itemToAdd.is_lent === 0)
                ) {
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
                          defaultChecked
                          onChange={(e) => handleChange(e)}
                        />
                        <label htmlFor={itemKey}>Oui</label>
                        <input
                          name={itemKey}
                          type="radio"
                          value={1}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                  );
                }

                if (
                  (itemKey === "when_read" || itemKey === "rating") &&
                  (itemToAdd.is_read === 0 || itemToAdd.is_read === "0")
                ) {
                  return null;
                }
                if (
                  (itemKey === "when_listened" || itemKey === "rating") &&
                  (itemToAdd.is_listened === 0 || itemToAdd.is_listened === "0")
                ) {
                  return null;
                }
                if (
                  (itemKey === "when_seen" || itemKey === "rating") &&
                  (itemToAdd.is_seen === 0 || itemToAdd.is_seen === "0")
                ) {
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
        {itemToAdd || itemToEdit ? (
          <button type="submit" className={styles.addButton}>
            {edition ? "Modifier" : "Ajouter"}
          </button>
        ) : null}
      </form>
    </div>
  );
}

export default Add;

Add.propTypes = {
  part: PropTypes.string.isRequired,
  edition: PropTypes.bool.isRequired,
};
