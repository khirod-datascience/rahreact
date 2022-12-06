const geocoder = require('../../utils/geocoder');
module.exports = async (req, res) => {
    const address = req.body.address
    const loc = await geocoder.geocode(address);
    const location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
    };
    console.log(location)
}