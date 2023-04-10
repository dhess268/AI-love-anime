const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const keys = require('../configs/keys');

const router = express.Router();

const configuration = new Configuration({
  apiKey: keys.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

router.get('/', async (req, res) => {
  const { anime } = req.user;
  const animeHundredArray = anime.slice(0, 99);
  const seenAnimeString = anime.reduce(
    (str, curr) => `${str + curr.title},`,
    ''
  );
  const reccAnimeString = animeHundredArray.reduce(
    (str, curr) => `${str + curr.title}, `,
    ''
  );
  console.log(reccAnimeString);
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
        content: `Based on the following list of anime, please recommend 3 new anime not on that list to watch. If you do not recognize an anime in the list, please  ignore it when recommending anime. I want you to recommend anime using the romanji title. DO NOT recommend anime the user has seen already .The user has already seen the anime in this list and all the anime in the list are using romanji titles: ${reccAnimeString}. Please send your response in the following format: { recommendations: [{title: romanji anime title, explaination: why they would like the anime, id: myanimelist ID }]}`,
      },
    ],
  });
  console.log(completion.data.choices[0].message);
  res.status(200).send(completion.data.choices[0].message);
});

module.exports = router;
