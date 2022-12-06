const { Hospital, User } = require('../../models');
const axios = require('axios');
// const {
//   singleFileUpload,
//   multiFileUpload,
// } = require('../../utils/fileHandler');
const { uploadGridFS } = require('../../utils/fileHandler');

// const { uploadSingleFileS3, uploadMultipleFileS3 } = require('../../utils/s3');

// @route  POST: /api/hospital/create
module.exports = async (req, res) => {
  try {
    // console.log('---req body create-- ', req.body);
    // console.log('---req files create-- ', req.files);
    const hospital_name = req.body?.hospital_name;
    const hospitalExist = await Hospital.findOne({ hospital_name });
    if (hospitalExist) {
      res.status(400).json({ error: 'Hospital already exists' });
    } else {
      // get logo and image from req
      // const reqLogo = req.files?.logo;
      // let reqImage = req.files?.images;
      // upload logo and image, and get path
      // const logo = await uploadSingleFileS3(reqLogo);
      // if (reqImage) reqImage = [].concat(reqImage);
      // const images = await uploadMultipleFileS3(reqImage);
      // const logo = await singleFileUpload(reqLogo);
      // if (reqImage) reqImage = [].concat(reqImage);
      // const images = await multiFileUpload(reqImage);

      // if (logo?.error) return res.status(400).json({ error: logo?.error });
      // if (images?.error) return res.status(400).json({ error: images?.error });

      // upload images using gridFs
      const logo =
        req.files?.logo &&
        `${process.env.HOST_NAME}/api/img/` + req.files?.logo?.name;
      const images =
        req.files?.images &&
        req.files?.images.map(
          (img) => `${process.env.HOST_NAME}/api/img/` + img.name
        );
      await uploadGridFS(req, res);
      let department =
        !!req.body?.department && [].concat(JSON.parse(req.body?.department));
      let facilities =
        !!req.body?.facilities && JSON.parse(req.body?.facilities);

      let location;
      if (!!req.body?.address) {
        const resLoc = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${req.body?.address}&key=${process.env.GCP_MAP_API_KEY}`
        );
        const loc = resLoc.data?.results?.[0]?.geometry?.location;
        location = {
          type: 'Point',
          coordinates: [loc?.lng, loc?.lat],
        };
      }

      const newHospital = new Hospital({
        ...req.body,
        department,
        facilities,
        location,
        logo,
        images,
      });
      const registeredHospital = await newHospital.save();
      // if (!!req?.user) {
      //   await User.findOneAndUpdate(
      //     { email: req?.user?.email },
      //     {
      //       hospital_id: registeredHospital?._id,
      //     },
      //     { new: true, useFindAndModify: false, runValidators: true }
      //   );
      // }
      console.log({ newHospital });
      res.status(200).json({ created: true, hospital: registeredHospital });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Unable to update information' });
  }
};
