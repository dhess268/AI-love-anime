const myAnimeList = require('../services/myAnimeList.service');

async function get(req, res, next) {
  return res.status(404).send({ anime: req.user.anime });
}

async function create(req, res, next) {
  try {
    await myAnimeList.create(req.body);
  } catch (err) {
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
}

async function update(req, res, next) {
  try {
    if (!req.query?.username) {
      return res.status(400).send({ success: false });
    }

    const result = await myAnimeList.update(req.query.username, req.user);

    if (result.success) {
      return res.status(200).send(result);
    }

    return res.status(404).send(result);
  } catch (err) {
    console.error(`Error while getting anime list`, err.message);
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    res.json(await myAnimeList.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting programming language`, err.message);
    next(err);
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
};
