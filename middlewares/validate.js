const { celebrate, Joi } = require('celebrate');

module.exports.loginValidate = celebrate(
  {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(2),
    }),
  },
);

module.exports.createUserValidate = celebrate(
  {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(2),
      name: Joi.string().required().min(2).max(30),
    }),
  },
);

module.exports.changeUserDataValidate = celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().email(),
    }).or('name', 'email'),
  },
);

module.exports.addMovieValidate = celebrate(
  {
    body: Joi.object().keys({
      country: Joi.string().required().min(2).max(30),
      director: Joi.string().required().min(2).max(30),
      duration: Joi.number().required(),
      year: Joi.string().required().min(2).max(4),
      description: Joi.string().required().min(10).max(1000),
      image: Joi.string().required().min(2).uri({
        scheme: [
          /https?/,
        ],
      }),
      trailerLink: Joi.string().required().min(2).uri({
        scheme: [
          /https?/,
        ],
      }),
      thumbnail: Joi.string().required().min(2).uri({
        scheme: [
          /https?/,
        ],
      }),
      owner: Joi.string().pattern(/^[a-z0-9]{24}$/),
      movieId: Joi.string().pattern(/^[a-z0-9]{24}$/), // потом надо првоерить как выглядит это поле
      nameRU: Joi.string().required().min(2).max(30),
      nameEN: Joi.string().required().min(2).max(30),
    }),
  },
);

module.exports.tokenValidate = celebrate(
  {
    cookies: Joi.object().keys({
      // eslint-disable-next-line no-useless-escape
      jwt: Joi.string().required().pattern(/^[\w\._\-]{10,}$/),
    }),
  },
);

module.exports.idValidate = celebrate(
  {
    params: Joi.object().keys({
      // eslint-disable-next-line no-useless-escape
      id: Joi.string().required().pattern(/^[a-z0-9]{24}$/),
    }),
  },
);
