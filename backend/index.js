const express = require('express');
const cors = require('cors');

const app = express();

const myAnimeListRouter = require('./src/routes/myAnimeList.route');

app.use(cors());

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.use('/myAnimeList', myAnimeListRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
