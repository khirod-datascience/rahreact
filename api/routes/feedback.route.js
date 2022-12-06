const { Router } = require('express');
const router = Router();
const { feedback } = require('../controllers');

// @route  POST: /api/feedback/new
router.post('/new', feedback.newFeedback);

// @route  GET: /api/feedback/all
router.get('/all', feedback.allFeedback);

module.exports = router;
