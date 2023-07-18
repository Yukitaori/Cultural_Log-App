import React from "react";
import styles from "./Welcome.module.css";
import Login from "./Login";

function Welcome() {
  return (
    <div className={styles.welcome}>
      <h1>Bienvenue !</h1>
      <Login />
    </div>
  );
}

export default Welcome;
