const axios = require('axios');

// @route  GET: /api/hospital/address?lat=lat&long=long
module.exports = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    const addrRes = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDyfP6ISLisAkBON9Faek0xDaoVPd2Eiu0`
    );

    res.status(200).json({ address: addrRes?.data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'something went wrong!' });
  }
};
