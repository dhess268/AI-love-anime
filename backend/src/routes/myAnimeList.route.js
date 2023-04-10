const express = require('express');

const router = express.Router();
const myAnimeListController = require('../controllers/myAnimeList.controller');

/* GET anime list. */
router.get('/', myAnimeListController.get);

/* PUT aniem list */
router.put('/', myAnimeListController.update);

/* DELETE anime list */
router.delete('/:id', myAnimeListController.remove);

module.exports = router;
