import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./Comics.module.css";
import PartHeader from "./PartHeader";

function Comics() {
  return (
    <div className={styles.comics}>
      <PartHeader partName="Bandes dessinées" />
      <div className={styles.partBody}>
        <Outlet />
      </div>
    </div>
  );
}

export default Comics;
