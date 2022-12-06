const { Hospital } = require('../../models');

module.exports = async (req, res) => {
  try {
    // find user by id
    let hospitalExists = await Hospital.findById(req.params.id);
    if (hospitalExists) {
      console.log(hospitalExists);
      // delete user
      await hospitalExists.remove();
      res.status(200).json({ status: true, user: null });
    } else {
      res.status(404).json({ error: 'hospital does not exist' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
