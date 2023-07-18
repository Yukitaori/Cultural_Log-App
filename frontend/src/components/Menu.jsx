import React from "react";
import styles from "./Menu.module.css";

function Menu() {
  return (
    <div className={styles.menu}>
      <button type="button" className={styles.menuButton}>
        Rechercher
      </button>
      <button type="button" className={styles.menuButton}>
        Ajouter
      </button>
      <button type="button" className={styles.menuButton}>
        Liste
      </button>
    </div>
  );
}

export default Menu;
