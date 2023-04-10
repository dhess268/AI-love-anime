// const db = require('./db.service');
const axios = require('axios');

const config = require('../configs/general.config');
const Anime = require('../models/Anime');
const User = require('../models/User');

// updates the user's anime list with a new MAL list
async function update(username, user) {
  const queryParams = `/${username}/animelist?status=completed&fields=list_status&limit=100&sort=list_score`;
  let nextPage = config.myAnimeListUrl + queryParams;

  const resultArray = []; // array of anime

  do {
    const result = await axios
      .get(nextPage, {
        headers: {
          'X-MAL-CLIENT-ID': process.env.MAL_CLIENT_ID,
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
  ).then((data) => data);

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
  update,
  remove,
};
