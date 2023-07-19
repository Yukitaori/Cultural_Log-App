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
} = require("./services/auth");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

router.post("/login", getUserByPseudo, verifyPassword);
router.get("/logout", logout);

router.get("/books", bookControllers.browse);
router.get("/books/:id", bookControllers.read);
router.delete("/books/:id", bookControllers.destroy);
router.post("/books", hashPassword, bookControllers.add);

router.get("/comics", comicControllers.browse);
router.get("/comics/:id", comicControllers.read);
router.delete("/comics/:id", comicControllers.destroy);
router.post("/comics", hashPassword, comicControllers.add);

router.get("/discs", discControllers.browse);
router.get("/discs/:id", discControllers.read);
router.delete("/discs/:id", discControllers.destroy);
router.post("/discs", hashPassword, discControllers.add);

router.get("/movies", movieControllers.browse);
router.get("/movies/:id", movieControllers.read);
router.delete("/movies/:id", movieControllers.destroy);
router.post("/movies", hashPassword, movieControllers.add);

router.get("/users", userControllers.browse);
router.post("/users", hashPassword, userControllers.add);

module.exports = router;
