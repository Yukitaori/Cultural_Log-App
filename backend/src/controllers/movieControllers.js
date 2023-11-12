const models = require("../models");

const browse = (req, res) => {
  const userId = req.payloads?.sub;
  models.movie
    .findAll("movies", userId)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  const userId = req.payloads?.sub;
  models.movie
    .find(req.params.id, userId)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const transformDate = (day) => {
    // Transformation des dates en format facilitant la manipulation en base de données
    if (day) {
      const dayToTransform = new Date(day);
      const newDay = [
        `${dayToTransform.getFullYear()}`,
        `${dayToTransform.getMonth() + 1}`,
        `${dayToTransform.getDate()}`,
      ]
        .map((string) => (string.length === 1 ? `0${string}` : string))
        .join("-");
      return newDay;
    }
    return null;
  };
  const movie = req.body;
  const userId = req.payloads?.sub;

  movie.id = parseInt(req.params.id, 10);
  movie.when_seen = transformDate(movie.when_seen);

  models.movie
    .update(movie, userId)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = async (req, res) => {
  const movie = req.body;
  const userId = req.payloads?.sub;
  try {
    // Vérification du doublon du titre en base de données
    const [existingTitle] = await models.movie.findWithTitle(
      movie.title,
      userId
    );
    if (!existingTitle[0]) {
      models.movie
        .insert(movie, userId)
        .then(([result]) => {
          res.location(`/movies/${result.insertId}`).sendStatus(201);
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    } else {
      res.send("Ce titre existe déjà !");
    }
  } catch (error) {
    console.error(error);
  }
};

const destroy = (req, res) => {
  const userId = req.payloads?.sub;
  models.movie
    .delete(req.params.id, userId)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const searchWithPartTitle = (req, res) => {
  const userId = req.payloads?.sub;
  models.movie
    .findWithPartTitle(req.params.string, userId)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  searchWithPartTitle,
};
