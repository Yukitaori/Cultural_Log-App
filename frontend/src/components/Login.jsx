/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import styles from "./Login.module.css";
import { useUserContext } from "../contexts/UserContext";
import instance from "../services/APIService";

function Login() {
  const {login} = useUserContext();
  const [loginInfo, setLoginInfo] = useState({
    pseudo: "",
    password: "",
  });
  const [infoMessage, setInfoMessage] = useState(null);

  const handleChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    instance.post("/login", loginInfo).then((response) => {
      if (response.data) {
        login(response.data)
        setLoginInfo({
          pseudo: "",
          password: "",
        })
        setInfoMessage(null);
      }
    }).catch((error) => {
      if (error.response?.status === 401)
        setInfoMessage("Les informations renseignées sont incorrectes.");
      else setInfoMessage("Merci d'essayer plus tard.");
    });

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
        {infoMessage ? <div className={styles.infoMessage}>
          <p>{infoMessage}</p>
        </div> : null}
        <button type="submit" className={styles.loginButton}>Se connecter</button>
      </form>
    </div>
  );
}

export default Login;
