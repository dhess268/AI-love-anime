// const db = require('./db.service');
const axios = require('axios');

const helper = require('../utils/helper.util').default;
const config = require('../configs/general.config');
const Anime = require('../models/Anime');

async function getMultiple(page = 1) {
  // const offset = helper.getOffset(page, config.listPerPage);
  // const rows = await db.query(
  //   `SELECT id, name, released_year, githut_rank, pypl_rank, tiobe_rank
  //   FROM programming_languages LIMIT ?,?`,
  //   [offset, config.listPerPage]
  // );
  // const data = helper.emptyOrRows(rows);
  // const meta = { page };
  // return {
  //   data,
  //   meta,
  // };
}

async function create(programmingLanguage) {
  // const result = await db.query(
  //   `INSERT INTO programming_languages
  //   (name, released_year, githut_rank, pypl_rank, tiobe_rank)
  //   VALUES
  //   (?, ?, ?, ?, ?)`,
  //   [
  //     programmingLanguage.name,
  //     programmingLanguage.released_year,
  //     programmingLanguage.githut_rank,
  //     programmingLanguage.pypl_rank,
  //     programmingLanguage.tiobe_rank,
  //   ]
  // );
  // let message = 'Error in creating programming language';
  // if (result.affectedRows) {
  //   message = 'Programming language created successfully';
  // }
  // return { message };
}

async function update(id, programmingLanguage) {
  // const result = await db.query(
  //   `UPDATE programming_languages
  //   SET name=?, released_year=?, githut_rank=?,
  //   pypl_rank=?, tiobe_rank=?
  //   WHERE id=?`,
  //   [
  //     programmingLanguage.name,
  //     programmingLanguage.released_year,
  //     programmingLanguage.githut_rank,
  //     programmingLanguage.pypl_rank,
  //     programmingLanguage.tiobe_rank,
  //     id,
  //   ]
  // );
  // let message = 'Error in updating programming language';
  // if (result.affectedRows) {
  //   message = 'Programming language updated successfully';
  // }
  // return { message };
}

async function remove(id) {
  // const result = await db.query(
  //   `DELETE FROM programming_languages WHERE id=?`,
  //   [id]
  // );
  // let message = 'Error in deleting programming language';
  // if (result.affectedRows) {
  //   message = 'Programming language deleted successfully';
  // }
  // return { message };
}

// gets the entire MAL list and saves it to the user
async function get(username, user) {
  const queryParams = `/${username}/animelist?status=completed&fields=list_status&limit=100&sort=list_score`;
  let nextPage = config.myAnimeListUrl + queryParams;

  do {
    const result = await axios
      .get(nextPage, {
        headers: {
          'X-MAL-CLIENT-ID': '9dfc847e8513a45e3590df53abdfef46',
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
      });

    result.data.forEach((entry) => {
      const newAnime = new Anime();
      newAnime.malId = entry.node.id;
      newAnime.title = entry.node.title;
      newAnime.score = entry.list_status.score;
      newAnime
        .save()
        .then()
        .catch((err) => console.log(err));
      user.anime.push(newAnime);
    });

    // from mal api this is always a string or undefined
    nextPage = result.paging.next;
  } while (nextPage);

  // user.Anime.create({ anime: animeList });

  await user
    .save()
    .then()
    .catch((error) => console.log(error));

  return { success: true };
}

module.exports = {
  getMultiple,
  remove,
  create,
  update,
  get,
};
