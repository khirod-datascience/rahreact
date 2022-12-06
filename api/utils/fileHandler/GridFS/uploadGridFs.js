const util = require('util');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

var storage = new GridFsStorage({
  url: process.env.DATABASE_URI, // database URL
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ['image/png', 'image/jpeg'];
    console.log({ file });
    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-rah-${file.originalname.replace(
        new RegExp(' ', 'g'),
        '_'
      )}`;
      return filename;
    }

    return {
      bucketName: process.env.IMG_BUCKET,
      filename: `${Date.now()}-rah-${file.originalname.replace(
        new RegExp(' ', 'g'),
        '_'
      )}`,
    };
  },
});

// var uploadFiles = multer({ storage: storage }).array('images', 4);
var uploadFiles = multer({ storage: storage }).fields([
  { name: 'profilePic', maxCount: 1 },
  { name: 'logo', maxCount: 1 },
  { name: 'images', maxCount: 4 },
]);
var upload = util.promisify(uploadFiles);

module.exports = upload;
