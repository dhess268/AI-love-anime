// const userService = require('../services/user.service');

async function get(req, res, next) {
  try {
    const { anime, avatar, email } = req.user;
    const safeUser = { user: { avatar, anime, email } };
    return res.status(200).send({ success: true, user: safeUser });
  } catch (err) {
    console.error(`Error while getting user.`, err.message);
    next(err);
  }
}

async function getAnime(req, res, next) {
  try {
    // const anime = await userService.getAnime();
    const { anime } = req.user;
    return res.status(200).send({ success: true, anime });
  } catch (err) {
    console.error(`Error while getting user.`, err.message);
    next(err);
  }
}

module.exports = {
  get,
  getAnime,
};
