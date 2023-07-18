import React from "react";
import styles from "./Welcome.module.css";
import Login from "./Login";
import { useUserContext } from "../contexts/UserContext";

function Welcome() {
  const { user, logout } = useUserContext();
  return (
    <div className={styles.welcome}>
      {!user?.id ? (
        <>
          <h1>Bienvenue !</h1>
          <Login />
        </>
      ) : (
        <>
          <h1>Bonjour, {user.pseudo}</h1>
          <button
            type="button"
            className={styles.logoutButton}
            onClick={logout}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default Welcome;
