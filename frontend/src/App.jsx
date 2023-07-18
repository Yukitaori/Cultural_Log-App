import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./components/Books";
import Comics from "./components/Comics";
import Discs from "./components/Discs";
import Movies from "./components/Movies";
import Welcome from "./components/Welcome";
import "./App.css";
import { UserContextProvider } from "./contexts/UserContext";

function App() {
  return (
    <UserContextProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Welcome />} />
            <Route path="books" element={<Books />} />
            <Route path="comics" element={<Comics />} />
            <Route path="discs" element={<Discs />} />
            <Route path="movies" element={<Movies />} />
          </Route>
        </Routes>
      </div>
    </UserContextProvider>
  );
}

export default App;
