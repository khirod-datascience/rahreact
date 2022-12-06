const { Router } = require('express');
const { adminController } = require('../controllers');
const adminAuth = require('../middleware/admin_auth')
const router = Router();

// @route  GET: /api/<id>/hospitals?page=page_no
router.get('/:id/hospitals', adminAuth, adminController.adminHospital)

module.exports = router