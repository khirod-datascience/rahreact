const path = require('path');
const fs = require('fs');

module.exports = async () => {
  try {
    // target dir path
    const directory = path.resolve(__dirname, '../../', 'tmp');

    fs.readdir(directory, (err, files) => {
      if (err) throw new Error(err);
      // iterate each file and remove
      files.forEach((file) => {
        if (file) {
          fs.unlink(path.join(directory, file), (err) => {
            if (err) throw new Error(err);
          });
        }
      });
    });
    return;
  } catch (error) {
    return { error };
  }
};
