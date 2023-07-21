import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./components/Books";
import Comics from "./components/Comics";
import Discs from "./components/Discs";
import Movies from "./components/Movies";
import Welcome from "./components/Welcome";
import Menu from "./components/Menu";
import Add from "./components/Add";
import Search from "./components/Search";
import List from "./components/List";
import "./App.css";
import { useUserContext } from "./contexts/UserContext";
import DisplayedItem from "./components/DisplayedItem";

function App() {
  const { user } = useUserContext();
  return (
    <div className="App">
      {user?.id ? (
        // Les routes ne sont accessibles que si l'utilisateur est connecté.
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Welcome />} />
            <Route path="books" element={<Books />}>
              <Route index element={<Menu part="books" />} />
              <Route path="search" element={<Search part="books" />} />
              <Route path="add" element={<Add part="books" />} />
              <Route path="list" element={<List part="books" />} />
              <Route path="edit/:id" element={<Add part="books" edition />} />
              <Route path=":id" element={<DisplayedItem part="books" />} />
            </Route>
            <Route path="comics" element={<Comics />}>
              <Route index element={<Menu part="comics" />} />
              <Route path="search" element={<Search part="comics" />} />
              <Route path="add" element={<Add part="comics" />} />
              <Route path="list" element={<List part="comics" />} />
              <Route path="edit/:id" element={<Add part="comics" edition />} />
              <Route path=":id" element={<DisplayedItem part="comics" />} />
            </Route>
            <Route path="discs" element={<Discs />}>
              <Route index element={<Menu part="discs" />} />
              <Route path="search" element={<Search part="discs" />} />
              <Route path="add" element={<Add part="discs" />} />
              <Route path="list" element={<List part="discs" />} />
              <Route path="edit/:id" element={<Add part="discs" edition />} />
              <Route path=":id" element={<DisplayedItem part="discs" />} />
            </Route>
            <Route path="movies" element={<Movies />}>
              <Route index element={<Menu part="movies" />} />
              <Route path="search" element={<Search part="movies" />} />
              <Route path="add" element={<Add part="movies" />} />
              <Route path="list" element={<List part="movies" />} />
              <Route path="edit/:id" element={<Add part="movies" edition />} />
              <Route path=":id" element={<DisplayedItem part="movies" />} />
            </Route>
            <Route path="/:whatever" element={<Welcome />} />
          </Route>
        </Routes>
      ) : (
        // Si l'utilisateur non connecté essaye d'accéder à une autre route, il est redirigé vers le home.
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
