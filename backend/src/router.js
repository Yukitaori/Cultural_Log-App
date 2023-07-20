const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");
const bookControllers = require("./controllers/bookControllers");
const comicControllers = require("./controllers/comicControllers");
const discControllers = require("./controllers/discControllers");
const movieControllers = require("./controllers/movieControllers");
const userControllers = require("./controllers/userControllers");

const {
  hashPassword,
  verifyPassword,
  getUserByPseudo,
  logout,
  verifyToken,
} = require("./services/auth");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

router.post("/login", getUserByPseudo, verifyPassword);
router.get("/logout", logout);

/* ------------------ BOOKS ------------------ */

router.get("/books", verifyToken, bookControllers.browse);
router.get(
  "/booksWithTitle/:string",
  verifyToken,
  bookControllers.searchWithPartTitle
);
router.get("/books/:id", verifyToken, bookControllers.read);
router.put("/books/:id", verifyToken, bookControllers.edit);
router.delete("/books/:id", verifyToken, bookControllers.destroy);
router.post("/books", verifyToken, bookControllers.add);

/* ------------------ COMICS ------------------ */

router.get("/comics", verifyToken, comicControllers.browse);
router.get(
  "/comicsWithTitle/:string",
  verifyToken,
  comicControllers.searchWithPartTitle
);
router.get("/comics/:id", verifyToken, comicControllers.read);
router.put("/comics/:id", verifyToken, comicControllers.edit);
router.delete("/comics/:id", verifyToken, comicControllers.destroy);
router.post("/comics", verifyToken, comicControllers.add);

/* ------------------ DISCS ------------------ */

router.get("/discs", verifyToken, discControllers.browse);
router.get(
  "/discsWithTitle/:string",
  verifyToken,
  discControllers.searchWithPartTitle
);
router.get("/discs/:id", verifyToken, discControllers.read);
router.put("/discs/:id", verifyToken, discControllers.edit);
router.delete("/discs/:id", verifyToken, discControllers.destroy);
router.post("/discs", verifyToken, discControllers.add);

/* ------------------ MOVIES ------------------ */

router.get("/movies", verifyToken, movieControllers.browse);
router.get(
  "/moviesWithTitle/:string",
  verifyToken,
  movieControllers.searchWithPartTitle
);
router.get("/movies/:id", verifyToken, movieControllers.read);
router.put("/movies/:id", verifyToken, movieControllers.edit);
router.delete("/movies/:id", verifyToken, movieControllers.destroy);
router.post("/movies", verifyToken, movieControllers.add);

/* ------------------ USERS ------------------ */

router.get("/users", verifyToken, userControllers.browse);
router.post("/users", hashPassword, userControllers.add);

module.exports = router;
