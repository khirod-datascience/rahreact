const { Router } = require('express');
const router = Router();

const { imageController } = require('../controllers');
// @Route GET: /api/images/:key
router.get('/:key', imageController.getImages);

module.exports = router;
