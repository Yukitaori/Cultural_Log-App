import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Menu.module.css";

function Menu() {
  const navigate = useNavigate();

  return (
    <div className={styles.menu}>
      <button
        type="button"
        className={styles.menuButton}
        onClick={() => navigate("search")}
      >
        Rechercher
      </button>
      <button
        type="button"
        className={styles.menuButton}
        onClick={() => navigate("add")}
      >
        Ajouter
      </button>
      <button
        type="button"
        className={styles.menuButton}
        onClick={() => navigate("list")}
      >
        Liste
      </button>
    </div>
  );
}

export default Menu;
