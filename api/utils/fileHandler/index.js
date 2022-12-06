const singleFileUpload = require('./singleFileUpload');
const multiFileUpload = require('./multiFileUpload');
const base64SingleUpload = require('./base64SingleUpload');
const clearTemp = require('./clearTemp');
const uploadGridFS = require('./GridFS/uploadGridFs');

module.exports = {
  uploadGridFS,
  singleFileUpload,
  clearTemp,
  multiFileUpload,
  base64SingleUpload,
};
