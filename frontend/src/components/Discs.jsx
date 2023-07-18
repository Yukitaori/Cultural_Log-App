import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./Discs.module.css";
import PartHeader from "./PartHeader";

function Discs() {
  return (
    <div className={styles.discs}>
      <PartHeader partName="Disques" />
      <div className={styles.partBody}>
        <Outlet />
      </div>
    </div>
  );
}

export default Discs;
