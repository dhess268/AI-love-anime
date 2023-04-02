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

  const resultArray = []; // array of anime

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
      return { success: false };
    }

    resultArray.push(...result.data);

    // from mal api this is always a string or undefined
    nextPage = result.paging.next;
  } while (nextPage);

  // empties the user's array of anime before pushing in the new list
  const newUser = await User.findOneAndUpdate(
    { _id: user._id },
    { $unset: { anime: 1 } },
    { new: true }
  ).then((nue) => nue);

  resultArray.forEach((animeToAdd) => {
    const newAnime = new Anime();

    newAnime.malId = animeToAdd.node.id;
    newAnime.title = animeToAdd.node.title;
    newAnime.score = animeToAdd.list_status.score;

    newUser.anime.push(newAnime);
  });

  const newList = await newUser
    .save()
    .then((savedUser) => savedUser.anime)
    .catch((error) => console.log(error));

  return { success: true, anime: newList };
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
