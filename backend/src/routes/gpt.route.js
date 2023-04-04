const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const keys = require('../configs/keys');

const router = express.Router();

const configuration = new Configuration({
  apiKey: keys.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

router.get('/', async (req, res) => {
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content:
          'what are some fun projects i can build with the gpt-3.5 api? I want ideas that involve anime.`',
      },
    ],
  });
  console.log(completion.data.choices[0].message);
  res.status(200).send(completion.data.choices[0].message);
});

module.exports = router;
