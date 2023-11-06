const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const models = require("../models");

const { JWT_SECRET, JWT_TIMING } = process.env;

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const getUserByPseudo = (req, res, next) => {
  // On récupère l'utilisateur en fonction du pseudo rentré lors du login
  models.user
    .findByPseudo(req.body)
    .then(([users]) => {
      if (users[0]) {
        [req.user] = users;
        next();
      } else {
        // Si aucun utilisateur avec cet email n'existe => 401
        res.sendStatus(401);
      }
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const hashPassword = (req, res, next) => {
  // hash du password avec argon2 puis next()
  argon2
    .hash(req.body.password, hashingOptions)
    .then((hashedPassword) => {
      req.body.hashed_password = hashedPassword;
      delete req.body.password;
      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(400);
    });
};

const verifyPassword = (req, res) => {
  // vérification que le hash du password fourni par l'utilisateur est le même que dans la base de données
  // Si oui => suppression du hashedPassword et du password du corps de la requête et on fournit un token
  argon2
    .verify(req.user.hashed_password, req.body.password, hashingOptions)
    .then((isPasswordOk) => {
      if (isPasswordOk) {
        // Création du token avec le mdp secret défini dans le .env
        const token = jwt.sign({ sub: req.user.id }, JWT_SECRET, {
          algorithm: "HS512",
          expiresIn: JWT_TIMING, // le token expire après le délai défini dans le .env
        });
        delete req.user.hashed_password;
        delete req.user.password;
        res.cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        });
        res.send(req.user);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(400);
    });
};

const verifyToken = (req, res, next) => {
  // On vérifie si le token est toujours vaide
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.sendStatus(401);
    }
    req.payloads = jwt.verify(token, JWT_SECRET);
    return next();
  } catch (err) {
    // Si non, on renvoit une 401 pour déconnexion auto de l'utilisateur
    return res.sendStatus(401);
  }
};

const logout = (req, res) => {
  // Lors de la déconnexion, on nettoie le cookie relatif au token
  res.clearCookie("access_token").sendStatus(200);
};

module.exports = {
  getUserByPseudo,
  verifyPassword,
  hashPassword,
  verifyToken,
  logout,
};
