import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Register.module.css";

function Register() {
  const [registerInfo, setRegisterInfo] = useState({
    pseudo: "",
    password: "",
    verifyPassword: "",
  });
  const [infoMessage, setinfoMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setinfoMessage(`Bienvenue ${registerInfo.pseudo}`);
  };

  const handleChange = (e) => {
    setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.register}>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.formBlock}>
          <label htmlFor="pseudo">Pseudo</label>
          <input
            name="pseudo"
            type="text"
            value={registerInfo.pseudo}
            onChange={(e) => handleChange(e)}
            placeholder="Entre ton pseudo"
          />
        </div>
        <div className={styles.formBlock}>
          <label htmlFor="password">Mot de passe</label>
          <input
            name="password"
            type="password"
            value={registerInfo.password}
            onChange={(e) => handleChange(e)}
            placeholder="Entre ton mot de passe"
          />
        </div>
        <div className={styles.formBlock}>
          <label htmlFor="verifyPassword">Mot de passe</label>
          <input
            name="verifyPassword"
            type="password"
            value={registerInfo.verifyPassword}
            onChange={(e) => handleChange(e)}
            placeholder="Entre de nouveau ton mot de passe"
          />
        </div>
        {infoMessage ? (
          <div className={styles.infoMessage}>
            <p>{infoMessage}</p>
          </div>
        ) : null}
        <button type="submit" className={styles.registerButton}>
          S'inscrire
        </button>
        <p className={styles.redirect}>
          Déjà inscrit ? <Link to="/">Reviens par-là.</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
