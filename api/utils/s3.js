const S3 = require('aws-sdk/clients/s3');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

async function uploadSingleFileS3(image) {
  if (image) {
    const uploadParams = {
      Bucket: bucketName,
      Body: image.data,
      Key: Date.now() + image.name,
    };

    const S3Resp = await s3.upload(uploadParams).promise();
    return `${process.env.HOST_NAME}/api/images/${S3Resp.Key}`;
  } else {
    return undefined;
  }
}

async function uploadMultipleFileS3(mFiles) {
  try {
    if (mFiles && Array.isArray(mFiles) && mFiles.length) {
      let filePaths = []; // for storing all paths after uploading
      // iterate each file and move
      for (let i = 0; i < mFiles.length; i++) {
        const acceptedTypes = ['image/jpeg', 'image/png'];
        if (!acceptedTypes.includes(mFiles[i].mimetype)) {
          return { error: 'file must be an image type' };
        }
        // if size is bigger than given throw error
        if (mFiles[i].truncated) {
          return { error: 'file size is too big' };
        }
        // upload eachfile to
        const resp = await uploadSingleFileS3(mFiles[i]);
        filePaths.push(resp);
      }
      // return uploaded file paths
      return filePaths;
    } else {
      return undefined;
    }
  } catch (error) {
    console.log(error);
    return { error };
  }
}

function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject(downloadParams).createReadStream();
}

async function deleteFile(fileKey) {
  const params = {
    Bucket: bucketName,
    Key: fileKey,
  };
  s3.deleteObject(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else return data;
  });
}

module.exports = {
  uploadSingleFileS3,
  uploadMultipleFileS3,
  getFileStream,
  deleteFile,
};
