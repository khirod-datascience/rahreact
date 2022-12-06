const { Feedback } = require('../../models');

module.exports = async (req, res) => {
  try {
    const feedback = new Feedback({ ...req.body });
    const newFeedback = await feedback.save();
    res.status(200).json({ status: true, feedback: newFeedback });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
