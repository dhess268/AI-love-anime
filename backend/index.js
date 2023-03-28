const express = require('express');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./src/configs/db');
const User = require('./src/models/User');

const app = express();

app.use(express.json());
app.use(
  session({
    secret: 'helloworld',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
require('./src/middlewares/auth.middleware');

connectDB();

// const newUser = new User({
//   email: 'emailTest32132',
//   avatar: 'urlTest',
//   hash: '231312',
//   salt: '3124124124',
// });
// newUser.save();

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
