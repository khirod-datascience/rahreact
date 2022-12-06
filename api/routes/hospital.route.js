const { Router } = require('express');
const { hospitalController } = require('../controllers');
const router = Router();
const auth = require('../middleware/auth');

// @route  GET: /api/hospital/departments
router.get('/departments', hospitalController.getDepartments);

// @router GET: /api/hospital/dept/:department
router.get('/dept/:department', hospitalController.getHospitalsByDept);

// @route  GET: /api/hospital/all
router.get('/all', hospitalController.getHospitals);

// @route  GET: /api/hospital/details/:id
router.get('/details/:id', hospitalController.getDetails);

// @route  POST: /api/hospital/create
router.post('/create', auth, hospitalController.createHospital);

// @route  POST: /api/hospital/admin/create
router.post('/admin/create', hospitalController.createHospital);

// @route  PATCH: /api/hospital/add_department/:hosp_id
router.patch('/add_department/:hosp_id', hospitalController.addDepartment);

// @route  PATCH: /api/hospital/delete_department/:hosp_id/:dept_name
router.patch(
  '/delete_department/:hosp_id/:dept_name',
  hospitalController.deleteDepartment
);

// @route  PATCH: /api/hospital/update/:hospital_id
router.patch('/update/:id', hospitalController.updateHospital);

// @route  GET: /api/hospital/address?lat=lat&long=long
router.get('/address', hospitalController.address);

// @router  DELETE: /api/hospital/delete/:hospital_id
router.delete('/delete/:id', hospitalController.deleteHospital);

module.exports = router;
