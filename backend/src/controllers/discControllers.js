const models = require("../models");

const browse = (req, res) => {
  models.disc
    .findAll("discs")
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.disc
    .find(req.params.id)
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

  const disc = req.body;
  const id = req.payloads?.sub;

  disc.id = parseInt(req.params.id, 10);
  disc.when_listened = transformDate(disc.when_listened);
  models.disc
    .update(disc, id)
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
  const disc = req.body;
  const id = req.payloads?.sub;
  try {
    // Vérification du doublon du titre en base de données
    const [existingTitle] = await models.disc.findWithTitle(disc.title);
    if (!existingTitle[0]) {
      models.disc
        .insert(disc, id)
        .then(([result]) => {
          res.location(`/discs/${result.insertId}`).sendStatus(201);
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
  models.disc
    .delete(req.params.id)
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
  models.disc
    .findWithPartTitle(req.params.string)
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
