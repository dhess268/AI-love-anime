const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const connectDB = require('./src/configs/db');
const User = require('./src/models/User');

const myAnimeListRouter = require('./src/routes/myAnimeList.route');
const authRouter = require('./src/routes/auth.route');
const userRouter = require('./src/routes/user.route');
const gptRouter = require('./src/routes/gpt.route');

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

app.use(cors());

const requireSignin = passport.authenticate('jwt', { session: false });

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.use('/myAnimeList', requireSignin, myAnimeListRouter);

app.use('/auth', authRouter);

app.use('/api/user', requireSignin, userRouter);

app.use('/api/gpt', requireSignin, gptRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
