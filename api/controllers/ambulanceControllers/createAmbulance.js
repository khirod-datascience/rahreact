const axios = require('axios');
const { Ambulance } = require('../../models');

// @route  POST: /api/ambulance/create
module.exports = async (req, res) => {
  try {
    const isOrgName = await Ambulance.findOne({ org_name: req.body?.org_name });
    if (isOrgName) {
      res.status(400).json({ error: 'Organization name already exists' });
    } else {
      const locAddress =
        req.body?.address.trim() + ' ' + req.body?.pincode.toString().trim();
      console.log({ locAddress });
      const resLoc =
        locAddress &&
        (await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${locAddress}&key=${process.env.GCP_MAP_API_KEY}`
        ));
      const loc = resLoc && resLoc.data?.results?.[0]?.geometry?.location;
      const location = loc && {
        type: 'Point',
        coordinates: [loc?.lat, loc?.lng],
      };

      const newAmbulance = new Ambulance({
        ...req.body,
        location,
      });
      const createdAmbulance = await newAmbulance.save();
      res.status(200).json({ created: true, ambulance: createdAmbulance });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Unable to update information' });
  }
};
