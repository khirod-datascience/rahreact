const { User } = require('../../models');
const axios = require('axios');

module.exports = async (req, res) => {
  const { email } = req.params;
  try {
    const resUser = await User.findOne({ email });
    console.log({ resUser });
    if (!!resUser) {
      res.status(200).json({ allowEmail: false });
    } else {
      res.status(200).json({ allowEmail: true });
    }
  } catch (error) {
    rconsole.log(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
