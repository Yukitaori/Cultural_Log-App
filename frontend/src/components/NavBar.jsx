import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import book from "../assets/icons/book.png";
import bookActive from "../assets/icons/bookActive.png";
import comics from "../assets/icons/comics.png";
import comicsActive from "../assets/icons/comicsActive.png";
import disc from "../assets/icons/disc.png";
import discActive from "../assets/icons/discActive.png";
import movie from "../assets/icons/movie.png";
import movieActive from "../assets/icons/movieActive.png";
import home from "../assets/icons/home.png";
import { useUserContext } from "../contexts/UserContext";

function NavBar() {
  const { user } = useUserContext();

  return (
    <div className={styles.navBar}>
      <NavLink to={user?.id ? "/books" : ""}>
        {({ isActive }) => (
          <img
            src={isActive && user?.id ? bookActive : book}
            alt="livre ouvert"
          />
        )}
      </NavLink>
      <NavLink to={user?.id ? "/comics" : ""}>
        {({ isActive }) => (
          <img
            src={isActive && user?.id ? comicsActive : comics}
            alt="bulle de bande dessinée"
          />
        )}
      </NavLink>
      <NavLink to={user?.id ? "/discs" : ""}>
        {({ isActive }) => (
          <img src={isActive && user?.id ? discActive : disc} alt="disque" />
        )}
      </NavLink>
      <NavLink to={user?.id ? "/movies" : ""}>
        {({ isActive }) => (
          <img
            src={isActive && user?.id ? movieActive : movie}
            alt="pellicule de film"
          />
        )}
      </NavLink>
      <div className={styles.home}>
        <NavLink to="/">
          <img src={home} alt="house" />
        </NavLink>
      </div>
    </div>
  );
}

export default NavBar;
