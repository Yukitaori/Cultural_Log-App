const models = require("../models");

const browse = (req, res) => {
  models.comic
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.comic
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

  const comic = req.body;
  const id = req.payloads?.sub;

  comic.id = parseInt(req.params.id, 10);
  comic.when_read = transformDate(comic.when_read);

  models.comic
    .update(comic, id)
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
  const comic = req.body;
  const id = req.payloads?.sub;
  try {
    const [existingTitle] = await models.comic.findComicWithTitle(comic.title);
    if (!existingTitle[0]) {
      models.comic
        .insert(comic, id)
        .then(([result]) => {
          res.location(`/comics/${result.insertId}`).sendStatus(201);
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
  models.comic
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
  models.comic
    .findComicWithPartTitle(req.params.string)
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
