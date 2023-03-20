const express = require('express');

const app = express();

const myAnimeListRouter = require('./src/routes/myAnimeList.route');

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.use('/programming-languages', myAnimeListRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
