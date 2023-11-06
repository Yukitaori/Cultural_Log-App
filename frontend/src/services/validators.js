import Joi from "joi";

const addSchema = Joi.object().keys({
  title: Joi.string().min(3).max(80).messages({
    "string.min": "Le titre doit avoir une longueur minimale de 3 caractères.",
    "string.max": "Le titre doit avoir une longueur maximale de 80 caractères.",
  }),
  director: Joi.string().min(3).max(80).allow("", null).messages({
    "string.min":
      "Le nom du réalisateur doit avoir une longueur minimale de 3 caractères.",
    "string.max":
      "Le nom du réalisateur doit avoir une longueur maximale de 80 caractères.",
  }),
  author: Joi.string().min(3).max(80).allow("", null).messages({
    "string.min":
      "Le nom de l'auteur doit avoir une longueur minimale de 3 caractères.",
    "string.max":
      "Le nom de l'auteur doit avoir une longueur maximale de 80 caractères.",
  }),
  writer: Joi.string().min(3).max(80).allow("", null).messages({
    "string.min":
      "Le nom du scénariste doit avoir une longueur minimale de 3 caractères.",
    "string.max":
      "Le nom du scénariste doit avoir une longueur maximale de 80 caractères.",
  }),
  artist: Joi.string().min(3).max(80).allow("", null).messages({
    "string.min":
      "Le nom de l'artiste/du dessinateur doit avoir une longueur minimale de 3 caractères.",
    "string.max":
      "Le nom de l'artiste/du dessinateur doit avoir une longueur maximale de 80 caractères.",
  }),
  rating: Joi.number()
    .integer()
    .min(0)
    .max(10)
    .optional()
    .allow("", null)
    .messages({
      "number.base":
        "La note doit être constitué uniquement de caractères numériques.",
      "number.min":
        "La note doit être un nombre entier positif ou nul et inférieur ou égal à 10.",
      "number.max":
        "La note doit être un nombre entier positif ou nul et inférieur ou égal à 10.",
    }),
  is_lent: Joi.number(),
  lent_to: Joi.string().allow("", null),
  is_read: Joi.number(),
  is_listened: Joi.number(),
  is_seen: Joi.number(),
  when_read: Joi.string().optional().allow("", null),
  when_listened: Joi.string().optional().allow("", null),
  when_seen: Joi.string().optional().allow("", null),
  owned: Joi.number(),
  id: Joi.number(),
  user_id: Joi.number(),
});

const registerSchema = Joi.object().keys({
  pseudo: Joi.string()
    .min(5)
    .max(45)
    .messages({
      "string.min":
        "Le pseudo doit avoir une longueur minimale de 5 caractères.",
      "string.max":
        "Le pseudo doit avoir une longueur maximale de 45 caractères.",
    })
    .required(),
  password: Joi.string()
    .min(5)
    .max(45)
    .messages({
      "string.min":
        "Le mot de passe doit avoir une longueur minimale de 5 caractères.",
      "string.max":
        "Le mot de passe doit avoir une longueur maximale de 45 caractères.",
    })
    .required(),
  verifyPassword: Joi.string()
    .min(8)
    .max(45)
    .valid(Joi.ref("password"))
    .messages({
      "string.min":
        "Le mot de passe doit avoir une longueur minimale de 8 caractères.",
      "string.max":
        "Le mot de passe doit avoir une longueur maximale de 45 caractères.",
      "any.only": "Les mots de passe ne correspondent pas.",
    })
    .required(),
});

export { addSchema, registerSchema };
