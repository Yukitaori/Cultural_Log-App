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

router.get("/books", bookControllers.browse);
router.get("/booksWithTitle/:string", bookControllers.searchWithTitle);
router.get("/books/:id", bookControllers.read);
router.put("/books/:id", verifyToken, bookControllers.edit);
router.delete("/books/:id", verifyToken, bookControllers.destroy);
router.post("/books", verifyToken, bookControllers.add);

router.get("/comics", comicControllers.browse);
router.get("/comicsWithTitle/:string", comicControllers.searchWithTitle);
router.get("/comics/:id", comicControllers.read);
router.put("/comics/:id", verifyToken, comicControllers.edit);
router.delete("/comics/:id", verifyToken, comicControllers.destroy);
router.post("/comics", verifyToken, comicControllers.add);

router.get("/discs", discControllers.browse);
router.get("/discsWithTitle/:string", discControllers.searchWithTitle);
router.get("/discs/:id", discControllers.read);
router.put("/discs/:id", verifyToken, discControllers.edit);
router.delete("/discs/:id", verifyToken, discControllers.destroy);
router.post("/discs", verifyToken, discControllers.add);

router.get("/movies", movieControllers.browse);
router.get("/moviesWithTitle/:string", movieControllers.searchWithTitle);
router.get("/movies/:id", movieControllers.read);
router.put("/movies/:id", verifyToken, movieControllers.edit);
router.delete("/movies/:id", verifyToken, movieControllers.destroy);
router.post("/movies", verifyToken, movieControllers.add);

router.get("/users", userControllers.browse);
router.post("/users", hashPassword, userControllers.add);

module.exports = router;
