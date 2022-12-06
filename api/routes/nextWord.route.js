const { Router } = require('express');
const router = Router();

const { hospitalController } = require('../controllers');

// @route  GET: /api/next/:word
router.get('/:word', hospitalController.nextWord);

module.exports = router;
