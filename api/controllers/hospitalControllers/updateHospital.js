const { Hospital } = require('../../models');
const axios = require('axios');
const {
  uploadGridFS,
  singleFileUpload,
  multiFileUpload,
} = require('../../utils/fileHandler');
// const { uploadSingleFileS3, uploadMultipleFileS3 } = require('../../utils/s3');

// @route  PATCH: /api/hospital/update/:hospital_id
module.exports = async (req, res) => {
  try {
    // get id, logo and images from req
    let { id } = req.params;
    // console.log({ id });
    // console.log('---req body update-- ', req.body.logo);
    // console.log('---req files update-- ', req.files);
    // let reqLogo = req?.files?.logo;
    // let reqImage = req?.files?.images;
    // console.log({ id });

    // // upload logo and images, and get path
    // // const logo = await uploadSingleFileS3(reqLogo);
    // // if (reqImage) reqImage = [].concat(reqImage);
    // // const images = await uploadMultipleFileS3(reqImage);

    // const logo = await singleFileUpload(reqLogo);
    // if (reqImage) reqImage = [].concat(reqImage);
    // const images = await multiFileUpload(reqImage);

    // if (logo?.error) return res.status(400).json({ error: logo?.error });
    // if (images?.error) return res.status(400).json({ error: images?.error });
    const logo =
      req.files?.logo &&
      `${process.env.HOST_NAME}/api/img/` + req.files?.logo?.name;
    const images =
      req.files?.images &&
      req.files?.images.map(
        (img) => `${process.env.HOST_NAME}/api/img/` + img.name
      );
    await uploadGridFS(req, res);
    // let department =
    //   !!req.body?.department && [].concat(JSON.parse(req.body?.department[1]));
    // let facilities =
    //   req.body?.facilities &&
    //   !!req.body?.facilities.length &&
    //   JSON.parse(req.body?.facilities?.[1]);

    const address = req.body?.address;
    let location;
    if (!!address) {
      const resLoc = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${req.body?.address}&key=${process.env.GCP_MAP_API_KEY}`
      );
      const loc = resLoc.data?.results?.[0]?.geometry?.location;
      location = {
        type: 'Point',
        coordinates: [loc?.lng, loc?.lat],
      };
    }

    console.log('location ', location);

    const data = {
      ...req.body,
      contact_number: Number(req.body?.contact_number),
      department,
      facilities,
      location,
      logo,
      images,
    };
    const updatedHospital = await Hospital.findByIdAndUpdate(
      { _id: id },
      data,
      {
        new: true,
        useFindAndModify: false,
        runValidators: true,
      }
    );
    console.log('updated hospital ');

    if (!updatedHospital) {
      res
        .status(404)
        .json({ updated: false, error: 'the hospital does not exist' });
    } else {
      res.status(200).json({ updated: true, hospital: updatedHospital });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Unable to update hospital info' });
  }
};
