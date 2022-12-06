const { Router } = require('express');
const router = Router();

const { imageController } = require('../controllers');

// @route GET:  /api/img
router.get('/', imageController.getGridFSImages);

// @Route GET: /api/img/:filename
router.get('/:filename', imageController.streamImage);

module.exports = router;
