const express = require('express');
const connectDB = require('./src/configs/db');
require('./src/middlewares/auth.middleware');

const app = express();

app.use(express.json());

connectDB();

const myAnimeListRouter = require('./src/routes/myAnimeList.route');
const authRouter = require('./src/routes/auth.route');

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.use('/myAnimeList', myAnimeListRouter);

app.use('/auth', authRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
