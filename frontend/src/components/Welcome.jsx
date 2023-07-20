import React from "react";
import styles from "./Welcome.module.css";
import Login from "./Login";
import { useUserContext } from "../contexts/UserContext";

function Welcome() {
  const { user, logout, logoutMessage } = useUserContext();
  return (
    <div className={styles.welcome}>
      {!user?.id ? (
        <>
          <h1>Bienvenue !</h1>
          <Login />
          {logoutMessage ? (
            <div className={styles.message}>{logoutMessage}</div>
          ) : null}
        </>
      ) : (
        <>
          <h1>Bonjour, {user.pseudo}</h1>
          <button
            type="button"
            className={styles.logoutButton}
            onClick={() => logout(false)}
          >
            Se déconnecter
          </button>
        </>
      )}
    </div>
  );
}

export default Welcome;
