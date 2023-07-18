/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import styles from "./Login.module.css";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    pseudo: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className={styles.login}>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.formBlock}>
          <label htmlFor="pseudo">Pseudo</label>
          <input
            name="pseudo"
            type="text"
            value={loginInfo.pseudo}
            onChange={(e) => handleChange(e)}
            placeholder="Entre ton pseudo"
          />
        </div>
        <div className={styles.formBlock}>
          <label htmlFor="password">Mot de passe</label>
          <input
            name="password"
            type="password"
            value={loginInfo.password}
            onChange={(e) => handleChange(e)}
            placeholder="Entre ton mot de passe"
          />
        </div>
        <button type="submit" className={styles.loginButton}>Se connecter</button>
      </form>
    </div>
  );
}

export default Login;
