/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import { useUserContext } from "../contexts/UserContext";
import instance from "../services/APIService";

function Login() {
  const { login, setLogoutMessage } = useUserContext();
  const [loginInfo, setLoginInfo] = useState({
    pseudo: "",
    password: "",
  });
  const [infoMessage, setInfoMessage] = useState(null);

  const handleChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  // Si l'utilisateur ne rentre pas les bons éléments de login, un message s'affiche, sinon => Login
  const handleSubmit = (e) => {
    e.preventDefault();
    instance
      .post("/login", loginInfo)
      .then((response) => {
        if (response.data) {
          login(response.data);
          setLoginInfo({
            pseudo: "",
            password: "",
          });
          setLogoutMessage(null);
          setInfoMessage(null);
        }
      })
      .catch((error) => {
        if (error.response?.status === 401)
          setInfoMessage(
            "Tu n'es pas autorisé(e) à utiliser cette application."
          );
        else setInfoMessage("Merci d'essayer plus tard.");
      });
  };

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
        {infoMessage ? (
          <div className={styles.infoMessage}>
            <p>{infoMessage}</p>
          </div>
        ) : null}
        <button type="submit" className={styles.loginButton}>
          Se connecter
        </button>
        <p className={styles.redirect}>
          Pas encore inscrit ?{" "}
          <Link to="/register">C'est ici que ça se passe !</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
