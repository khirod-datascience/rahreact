const { Hospital } = require('../../models');
const { getPreciseDistance } = require('geolib');

// @route  GET: /api/hospital/all?page=page_no
module.exports = async (req, res) => {
  try {
    let location = req.headers['location'] || '';
    location = location && JSON.parse(location);
    // const { page } = req.query;
    // const limit = 10;
    // const skip = (page - 1) * limit;
    // const getHospitals = await Hospital.find().limit(2).skip(2 * (page - 1));
    let getHospitals = await Hospital.find();
    for (let item of getHospitals) {
      const distance =
        !!item?.location?.coordinates &&
        !!location.length &&
        getPreciseDistance(
          { latitude: location?.[0], longitude: location?.[1] },
          {
            latitude: item?.location?.coordinates?.[1],
            longitude: item?.location?.coordinates?.[0],
          }
        );
      if (!!distance) item._doc['distance'] = distance / 1000;
      // console.log({ item });
    }
    if (getHospitals) {
      res.status(200).json({ hospital: getHospitals });
    } else {
      res.status(404).json({ error: 'no hospital found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
