import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./Movies.module.css";
import PartHeader from "./PartHeader";

function Movies() {
  return (
    <div className={styles.movies}>
      <PartHeader partName="Films" />
      <div className={styles.partBody}>
        <Outlet />
      </div>
    </div>
  );
}

export default Movies;
