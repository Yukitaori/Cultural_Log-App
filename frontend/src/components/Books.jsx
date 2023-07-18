import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./Books.module.css";
import PartHeader from "./PartHeader";

function Books() {
  return (
    <div className={styles.books}>
      <PartHeader partName="Livres" />
      <div className={styles.partBody}>
        <Outlet />
      </div>
    </div>
  );
}

export default Books;
