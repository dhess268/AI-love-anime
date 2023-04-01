const express = require('express');
const passportJWT = require('passport-jwt');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const router = express.Router();
const myAnimeListController = require('../controllers/myAnimeList.controller');

/* GET programming languages. */
// router.get('/', myAnimeListController.get);

router.get('/', myAnimeListController.get);

/* POST programming language */
router.post('/', myAnimeListController.create);

/* PUT programming language */
router.put('/:id', myAnimeListController.update);

/* DELETE programming language */
router.delete('/:id', myAnimeListController.remove);

module.exports = router;
