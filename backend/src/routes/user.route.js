const express = require('express');

const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.get);

router.get('/anime', userController.getAnime);
module.exports = router;
