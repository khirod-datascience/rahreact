const { Ambulance } = require('../../models');
const axios = require('axios');

// @route  patch: /api/ambulance/update/:ambulance_id
module.exports = async (req, res) => {
  try {
    let { id } = req.params;
    console.log({ id });
    console.log(req.body);

    const ambulance_details =
      req.body?.ambulance_details &&
      [].concat(JSON.parse(req.body?.ambulance_details));
    console.log(ambulance_details);

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

    console.log('location ', location);

    const data = {
      ...req.body,
      ambulance_details,
      location: !!location && location,
    };
    const updatedAmbulance = await Ambulance.findByIdAndUpdate(
      { _id: id },
      data,
      {
        new: true,
        useFindAndModify: false,
        runValidators: true,
      }
    );

    if (!updatedAmbulance) {
      res
        .status(404)
        .json({ updated: false, error: 'the ambulance does not exist' });
    } else {
      res.status(200).json({ updated: true, ambulance: updatedAmbulance });
    }
    // res.status(200).json({ updated: true, ambulance: 'updatedAmbulance' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Unable to update ambulance info' });
  }
};
