const { Ambulance } = require('../../models');

// @route  DELETE: /api/ambulance/delete/:id
module.exports = async (req, res) => {
  try {
    // find user by id
    let ambulanceExists = await Ambulance.findById(req.params.id);
    if (ambulanceExists) {
      console.log(ambulanceExists);
      // delete user
      await ambulanceExists.remove();
      res.status(200).json({ status: true, user: null });
    } else {
      res.status(404).json({ error: 'ambulance does not exist' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
