import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./Add.module.css";

function Add({ part }) {
  const [itemToAdd, setItemToAdd] = useState(null);
  const [infoMessage, setInfoMessage] = useState(null);

  useEffect(() => {
    if (part === "movies") {
      setItemToAdd({
        title: "",
        director: "",
        is_seen: "0",
        when_seen: "",
        rating: "",
        owned: "0",
        is_lent: "0",
        lent_to: "",
      });
    }
    if (part === "books") {
      setItemToAdd({
        title: "",
        author: "",
        is_read: "0",
        when_read: "",
        rating: "",
        owned: "0",
        is_lent: "0",
        lent_to: "",
      });
    }
    if (part === "discs") {
      setItemToAdd({
        title: "",
        artist: "",
        is_listened: "0",
        when_listened: "",
        rating: "",
        owned: "0",
        is_lent: "0",
        lent_to: "",
      });
    }
    if (part === "comics") {
      setItemToAdd({
        title: "",
        artist: "",
        writer: "",
        is_read: "0",
        when_read: "",
        rating: "",
        owned: "0",
        is_lent: "0",
        lent_to: "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setItemToAdd({ ...itemToAdd, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.info(itemToAdd);
    setInfoMessage("Yessss");
    setItemToAdd(null);
  };

  useEffect(() => {
    if (itemToAdd) {
      if (itemToAdd.is_lent === "0") {
        itemToAdd.lent_to = "";
      }
      if (itemToAdd.is_read === "0") {
        itemToAdd.when_read = "";
      }
      if (itemToAdd.is_listened === "0") {
        itemToAdd.when_listened = "";
      }
      if (itemToAdd.is_seen === "0") {
        itemToAdd.when_seen = "";
      }
    }
  }, [itemToAdd]);

  return (
    <div className={styles.add}>
      <div className={styles.title}>
        <h2>Ajouter un titre</h2>
      </div>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
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
                    input = "number";
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
                if (itemKey === "lent_to" && itemToAdd.is_lent === "0") {
                  return null;
                }

                if (itemKey === "lent_to" && itemToAdd.is_lent === "1") {
                  return (
                    <div className={styles.formBlock}>
                      <label htmlFor={itemKey}>{getField(itemKey).field}</label>
                      <input
                        key={itemKey}
                        name={itemKey}
                        type={getField(itemKey).input}
                        value={itemToAdd.itemKey}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  );
                }
                if (input === "text") {
                  return (
                    <div className={styles.formBlock}>
                      <label htmlFor={itemKey}>{getField(itemKey).field}</label>
                      <input
                        key={itemKey}
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
                    <div className={styles.formBlock}>
                      <p>{getField(itemKey).field}</p>
                      <div className={styles.radio}>
                        <label htmlFor={itemKey}>Non</label>
                        <input
                          key={itemKey}
                          name={itemKey}
                          type="radio"
                          value={0}
                          defaultChecked
                          onChange={(e) => handleChange(e)}
                        />
                        <label htmlFor={itemKey}>Oui</label>
                        <input
                          key={itemKey}
                          name={itemKey}
                          type="radio"
                          value={1}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                  );
                }

                const checkname = itemKey.replace("when", "is");
                if (itemToAdd[checkname] === "0" && itemKey !== "owned") {
                  return null;
                }

                return (
                  <div className={styles.formBlock}>
                    <label htmlFor={itemKey}>{getField(itemKey).field}</label>
                    <input
                      key={itemKey}
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
        <button type="submit" className={styles.addButton}>
          Ajouter
        </button>
      </form>
    </div>
  );
}

export default Add;

Add.propTypes = {
  part: PropTypes.string.isRequired,
};
