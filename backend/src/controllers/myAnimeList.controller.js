const myAnimeList = require('../services/myAnimeList.service');

async function get(req, res, next) {
  try {
    if (!req.query?.username) {
      return res.status(400).send({ success: false });
    }
    return res.json(await myAnimeList.get(req.query.username, req.user));
  } catch (err) {
    console.error(`Error while getting anime list`, err.message);
    next(err);
  }
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
    res.json(await myAnimeList.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating programming language`, err.message);
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
