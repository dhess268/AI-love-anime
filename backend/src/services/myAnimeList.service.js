// const db = require('./db.service');
const axios = require('axios');

const helper = require('../utils/helper.util').default;
const config = require('../configs/general.config');
const Anime = require('../models/Anime');
const User = require('../models/User');

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

// updates the user's anime list with a new MAL list
async function update(username, user) {
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

    if (!result) {
      return false;
    }

    await User.findOneAndUpdate(
      { _id: user._id },
      { $unset: { anime: 1 } },
      { new: true }
    );

    result.data.forEach((entry) => {
      const newAnime = new Anime();
      newAnime.malId = entry.node.id;
      newAnime.title = entry.node.title;
      newAnime.score = entry.list_status.score;
      // Not saving it at the moment but can if something comes up?
      // newAnime
      //   .save()
      //   .then()
      //   .catch((err) => console.log(err));
      user.anime.push(newAnime);
    });

    // from mal api this is always a string or undefined
    nextPage = result.paging.next;
  } while (nextPage);

  await user
    .save()
    .then()
    .catch((error) => console.log(error));

  return true;
}

async function remove(userId) {
  await User.findOneAndUpdate(
    { _id: userId },
    { $unset: { anime: 1 } },
    { new: true }
  );
  return true;
}

module.exports = {
  create,
  update,
  remove,
};
