const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const keys = require('../configs/keys');

const router = express.Router();

const configuration = new Configuration({
  apiKey: keys.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

router.post('/', async (req, res) => {
  // const animeHundredArray = anime.slice(0, 99);
  // const seenAnimeString = anime.reduce(
  //   (str, curr) => `${str + curr.title},`,
  //   ''
  // );

  const { genre, list } = req.body;

  const reccAnimeString = list.reduce(
    (str, curr) => `${str + curr.title}, `,
    ''
  );

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    messages: [
      {
        role: 'system',
        content:
          'You are an anime expert that provides anime recommendations based on questions the user has answers to and a list of previously seen anime.',
      },
      {
        role: 'user',
        content: `Based on the following list of anime and genre from myanimelist, please recommend 3 new anime not on that list to watch. If you do not recognize an anime in the list, please  ignore it when recommending anime. I want you to recommend anime using the romanji title. DO NOT recommend anime the user has seen already. The user wants an anime in the following genre: ${genre}. The user has already seen the anime in this list and all the anime in the list are using romanji titles: ${reccAnimeString}. Please send JSON only and make sure to explain your reasoning behind the recommendations. The JSON format to follow is: { recommendations: [{title: romanji anime title, explaination: why they would like the anime based on their list of anime, id: myanimelist ID }]}`,
      },
    ],
  });
  console.log(completion.data.choices[0]);
  res.status(200).send(completion.data.choices[0].message.content);
});

module.exports = router;
