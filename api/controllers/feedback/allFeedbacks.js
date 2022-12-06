const { Feedback } = require('../../models');

// GET : @route /api/feedback/all
module.exports = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({});
    res.status(200).json({ feedbacks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'something went wrong!' });
  }
};
