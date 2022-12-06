const { Router } = require('express');
const router = Router();

const { searchController } = require('../controllers');

// @route  GET: /api/search/
router.post('/', searchController.search);

module.exports = router;
