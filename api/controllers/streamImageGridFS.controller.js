const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

let gfs, gridfsBucket;

const con = mongoose.createConnection(process.env.DATABASE_URI);
con.once('open', () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(con.db, {
    bucketName: process.env.IMG_BUCKET,
  });

  gfs = Grid(con.db, mongoose.mongo);
  gfs.collection(process.env.IMG_BUCKET);
});

module.exports.streamImage = (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    console.log({ file });
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists',
      });
    }

    // Check if image
    // if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
    // Read output to browser
    // const readstream = gfs.createReadStream({
    //   filename: file.filename,
    // });
    // readstream.pipe(res);
    //error handling, e.g. file does not exist
    // readstream.on('error', function (err) {
    //   console.log('An error occurred!', err);
    //   throw err;
    // });

    // readstream.pipe(response);
    // res.send(file);
    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.pipe(res);
    // } else {
    //   res.status(404).json({
    //     err: 'Not an image',
    //   });
    // }
  });
};

// ----- get images list ------
module.exports.getGridFSImages = async (req, res) => {
  try {
    gfs.files.find().toArray((err, files) => {
      // Check if files
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: 'No files exist',
        });
      }
      // Files exist
      return res.json(files);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'something went wrong' });
  }
};
