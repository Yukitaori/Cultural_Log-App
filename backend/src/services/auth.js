const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const { JWT_SECRET, JWT_TIMING } = process.env;

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
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

const verifyPassword = (req, res, next) => {
  // vérification que le hash du password fourni par l'utilisateur est le même que dans la base de données
  // Si oui => suppression du hashedPassword et du password et on fournit un token
  argon2
    .verify(req.user.hashed_password, req.body.password, hashingOptions)
    .then((isPasswordOk) => {
      if (isPasswordOk) {
        // Création du token avec le mdp secret défini dans le .env
        const token = jwt.sign({ sub: req.user.id }, JWT_SECRET, {
          algorithm: "HS512",
          expiresIn: JWT_TIMING, // le token expire après le délai défini dans le .env
        });
        delete req.user.hashedPassword;
        delete req.user.password;
        res.cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        });
        next();
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(400);
    });
};

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.sendStatus(401);
    }
    req.payloads = jwt.verify(token, JWT_SECRET);
    return next();
  } catch (err) {
    return res.sendStatus(401);
  }
};

const logout = (req, res) => {
  res.clearCookie("access_token").sendStatus(200);
};

module.exports = {
  verifyPassword,
  hashPassword,
  verifyToken,
  logout,
};
