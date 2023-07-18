import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./components/Books";
import Comics from "./components/Comics";
import Discs from "./components/Discs";
import Movies from "./components/Movies";
import Welcome from "./components/Welcome";
import Menu from "./components/Menu";
import "./App.css";
import { useUserContext } from "./contexts/UserContext";

function App() {
  const { user } = useUserContext();
  return (
    <div className="App">
      {user?.id ? (
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Welcome />} />
            <Route path="books" element={<Books />}>
              <Route index element={<Menu part="books" />} />
              <Route path="search" element={<p>Rechercher</p>} />
              <Route path="add" element={<p>Ajouter</p>} />
              <Route path="list" element={<p>Liste</p>} />
            </Route>
            <Route path="comics" element={<Comics />}>
              <Route index element={<Menu part="comics" />} />
              <Route path="search" element={<p>Rechercher</p>} />
              <Route path="add" element={<p>Ajouter</p>} />
              <Route path="list" element={<p>Liste</p>} />
            </Route>
            <Route path="discs" element={<Discs />}>
              <Route index element={<Menu part="discs" />} />
              <Route path="search" element={<p>Rechercher</p>} />
              <Route path="add" element={<p>Ajouter</p>} />
              <Route path="list" element={<p>Liste</p>} />
            </Route>
            <Route path="movies" element={<Movies />}>
              <Route index element={<Menu part="movies" />} />
              <Route path="search" element={<p>Rechercher</p>} />
              <Route path="add" element={<p>Ajouter</p>} />
              <Route path="list" element={<p>Liste</p>} />
            </Route>
            <Route path="/:whatever" element={<Welcome />} />
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Welcome />} />
            <Route path="/:whatever" element={<Welcome />} />
          </Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
