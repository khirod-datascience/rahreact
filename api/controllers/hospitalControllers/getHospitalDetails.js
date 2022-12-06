const { Hospital } = require('../../models');

// @route  GET: /api/hospital/details/:id
module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const getHospital = await Hospital.findById(id);
    if (getHospital) {
      res.status(200).json({ hospital: getHospital });
    } else {
      res.status(404).json({ error: 'no hospital found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
