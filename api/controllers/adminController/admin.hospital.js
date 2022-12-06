const { Hospital } = require('../../models');
const distance = require('../../utils/geoDistance');

// @route  GET: /api/<id>/hospitals?page=page_no
module.exports = async (req, res) => {
    try {
        const { page } = require('url').parse(req.url, true).query;
        const limit = 5;
        const skip = (page - 1) * limit;
        // const getHospitals = await Hospital.find().skip(skip);
        const getHospitals = await Hospital.find()
        if (getHospitals) {
            res.status(200).json({ hospital: getHospitals });
        } else {
            res.status(403).json({ error: 'no hospital found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
