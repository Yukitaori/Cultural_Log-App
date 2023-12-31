import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from "../services/validators";
import styles from "./Register.module.css";
import instance from "../services/APIService";

function Register() {
  const navigate = useNavigate();
  const [registerInfo, setRegisterInfo] = useState({
    pseudo: "",
    password: "",
    verifyPassword: "",
  });
  const [infoMessage, setInfoMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = registerSchema.validate(registerInfo);
    if (error) {
      setInfoMessage(error.message);
    } else {
      instance
        .post("/register", registerInfo)
        .then((res) => {
          if (res.status === 201) {
            setInfoMessage(
              `Le compte a bien été créé. Tu vas être redirigé vers la page de connexion.`
            );
            setTimeout(() => navigate("/"), 2000);
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            setInfoMessage(`Ce pseudo existe déjà.`);
          } else {
            setInfoMessage(`Il y a eu une erreur. Essaye plus tard.`);
          }
        });
    }
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
          Déjà inscrit ? <Link to="/">Reviens par là.</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
