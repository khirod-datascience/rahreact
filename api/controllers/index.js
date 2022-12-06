const isLoggedIn = require('./userControllers/isLoggedIn.controller');
const signup = require('./userControllers/signup.controller');
const login = require('./userControllers/login.controller');
const logout = require('./userControllers/logout.controller');
const isEmail = require('./userControllers/checkEmail.controller');
const getHospitals = require('./hospitalControllers/getAllHospitals');
const getDetails = require('./hospitalControllers/getHospitalDetails');
const createHospital = require('./hospitalControllers/createHospital');
const updateHospital = require('./hospitalControllers/updateHospital');
const deleteHospital = require('./hospitalControllers/deleteHospital');
const getDepartments = require('./hospitalControllers/getDepartments');
const addDepartment = require('./hospitalControllers//addDepartment');
const deleteDepartment = require('./hospitalControllers//deleteDepartment');
const getHospitalsByDept = require('./hospitalControllers/getHospitalsByDept');
const getImages = require('./imageController');
const search = require('./searchController');
const adminHospital = require('./adminController/admin.hospital');
const address = require('./hospitalControllers/address');
const nextWord = require('./nextWord');
const createAmbulance = require('./ambulanceControllers/createAmbulance');
const getAllAmbulance = require('./ambulanceControllers/getAllAmbulances');
const updateAmbulance = require('./ambulanceControllers/updateAmbulance');
const deleteAmbulance = require('./ambulanceControllers/deleteAmbulance');
const {
  streamImage,
  getGridFSImages,
} = require('./streamImageGridFS.controller');
const newFeedback = require('./feedback/createFeedback');
const allFeedback = require('./feedback/allFeedbacks');

module.exports = {
  userController: { isLoggedIn, isEmail, signup, login, logout },
  hospitalController: {
    getHospitals,
    getDetails,
    createHospital,
    updateHospital,
    deleteHospital,
    addDepartment,
    getDepartments,
    deleteDepartment,
    getHospitalsByDept,
    address,
    nextWord,
  },
  imageController: { getImages, streamImage, getGridFSImages },
  searchController: { search },
  adminController: { adminHospital },
  ambulanceController: {
    createAmbulance,
    getAllAmbulance,
    updateAmbulance,
    deleteAmbulance,
  },
  feedback: { newFeedback, allFeedback },
};
