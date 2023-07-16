import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import book from "../assets/icons/open-book.png";
import comics from "../assets/icons/speech-bubble.png";
import disc from "../assets/icons/vinyl.png";
import movie from "../assets/icons/movie.png";

function NavBar() {
  return (
    <div className={styles.navBar}>
      <NavLink>
        <img src={book} alt="" />
      </NavLink>
      <NavLink>
        <img src={comics} alt="" />
      </NavLink>
      <NavLink>
        <img src={disc} alt="" />
      </NavLink>
      <NavLink>
        <img src={movie} alt="" />
      </NavLink>
    </div>
  );
}

export default NavBar;
