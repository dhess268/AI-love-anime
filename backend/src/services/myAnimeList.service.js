// const db = require('./db.service');
const axios = require('axios');

const helper = require('../utils/helper.util').default;
const config = require('../configs/general.config');

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

async function get(username) {
  console.log(config);
  const result = await axios
    .get(config.myAnimeListUrl, {
      headers: {
        'X-MAL-CLIENT-ID': '9dfc847e8513a45e3590df53abdfef46',
      },
    })
    .then((res) => res.data.data);

  return result;
}

module.exports = {
  getMultiple,
  remove,
  create,
  update,
  get,
};
