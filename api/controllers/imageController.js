const { getFileStream } = require('../utils/s3')

module.exports = (req, res) => {
    const key = req.params.key
    console.log(key);

    const readStream = getFileStream(key)
    readStream.pipe(res)
}