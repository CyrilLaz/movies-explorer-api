const { celebrate, Joi } = require('celebrate');

module.exports.loginValidate = celebrate(
  {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  },
);

module.exports.createUserValidate = celebrate(
  {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().required().min(2).max(30),
    }),
  },
);

module.exports.changeUserDataValidate = celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
    }),
  },
);

module.exports.addMovieValidate = celebrate(
  {
    body: Joi.object().keys({
      country: Joi.string().required().min(2).max(30),
      director: Joi.string().required().min(2).max(30),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().uri({
        scheme: [
          /https?/,
        ],
      }),
      trailerLink: Joi.string().required().uri({
        scheme: [
          /https?/,
        ],
      }),
      thumbnail: Joi.string().required().uri({
        scheme: [
          /https?/,
        ],
      }),
      movieId: Joi.number().required(), // приходит целое число
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  },
);

module.exports.idValidate = celebrate(
  {
    params: Joi.object().keys({
      id: Joi.string().required().max(24).hex(),
    }),
  },
);
