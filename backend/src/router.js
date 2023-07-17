const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");
const bookControllers = require("./controllers/bookControllers");
const comicControllers = require("./controllers/comicControllers");
const discControllers = require("./controllers/discControllers");
const movieControllers = require("./controllers/movieControllers");
const userControllers = require("./controllers/userControllers");

const { hashPassword } = require("./services/auth");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

router.get("/books", bookControllers.browse);
router.post("/books", hashPassword, bookControllers.add);

router.get("/comics", comicControllers.browse);
router.post("/comics", hashPassword, comicControllers.add);

router.get("/discs", discControllers.browse);
router.post("/discs", hashPassword, discControllers.add);

router.get("/movies", movieControllers.browse);
router.post("/movies", hashPassword, movieControllers.add);

router.get("/users", userControllers.browse);
router.post("/users", hashPassword, userControllers.add);

module.exports = router;
