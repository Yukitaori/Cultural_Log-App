import NavBar from "../components/NavBar";
import styles from "./Home.module.css";
import bg from "../assets/images/books.jpg";

export default function Home() {
  return (
    <div className={styles.home}>
      <NavBar />
      <div className={styles.screen}>
        <img src={bg} className={styles.background} alt="" />
      </div>
    </div>
  );
}
