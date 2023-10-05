import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import styles from "./Home.module.css";
import bg from "../assets/images/books.jpg";

export default function Home() {
  return (
    <div className={styles.home}>
      <NavBar />
      <div className={styles.screen}>
        <img
          src={bg}
          className={styles.background}
          alt="fond d'écran d'une bibliothèque cosy"
        />
        <main className={styles.body}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
