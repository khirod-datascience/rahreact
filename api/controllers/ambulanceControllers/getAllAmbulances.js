const { Ambulance } = require('../../models');
const { getPreciseDistance } = require('geolib');

// @route  POST: /api/ambulance/all
module.exports = async (req, res) => {
  try {
    let location = req.headers['location'] || '';
    location = location && JSON.parse(location);
    console.log({ location });

    const allAmbulances = await Ambulance.find();
    for (let item of allAmbulances) {
      const distance =
        !!item?.location?.coordinates &&
        !!location.length &&
        getPreciseDistance(
          { latitude: location?.[0], longitude: location?.[1] },
          {
            latitude: item?.location?.coordinates?.[0],
            longitude: item?.location?.coordinates?.[1],
          }
        );
      if (!!distance) item._doc['distance'] = distance / 1000;
      // console.log({ item });
    }
    console.log({ allAmbulances });
    if (allAmbulances) {
      res.status(200).json({ ambulances: allAmbulances });
    } else {
      res.status(404).json({ error: 'no hospital found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Unable to update information' });
  }
};
