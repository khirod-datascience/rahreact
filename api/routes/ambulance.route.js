const { Router } = require('express');
const router = Router();
const { ambulanceController } = require('../controllers');

// @route  GET: /api/ambulance/all
router.get('/all', ambulanceController.getAllAmbulance);

// @route  POST: /api/ambulance/create
router.post('/create', ambulanceController.createAmbulance);

// @route  PATCH: /api/ambulance/update/:id
router.patch('/update/:id', ambulanceController.updateAmbulance);

// @route  DELETE: /api/ambulance/delete/:id
router.delete('/delete/:id', ambulanceController.deleteAmbulance);

module.exports = router;
