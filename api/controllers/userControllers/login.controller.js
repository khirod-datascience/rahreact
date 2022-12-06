const bcrypt = require('bcrypt');
const { User } = require('../../models');
const { generateToken } = require('../../utils/authToken');

// @route  POST: /api/user/login
module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRes = await User.findOne({ email }).select('+password');
    if (userRes) {
      const isMatched = await bcrypt.compare(password, userRes.password);
      if (isMatched) {
        // Generate token
        const token = generateToken(userRes._id);
        // TODO: set cookie
        res.cookie('access-token', token, {
          maxAge: 1000 * 60 * 60 * 24 * 4,
          httpOnly: process.env.NODE_ENV === 'production',
          secure: process.env.NODE_ENV === 'production',
        });
        function omitPass(userRes) {
          const newObj = userRes.toObject();
          delete newObj.password;
          return newObj;
        }
        res.status(200).json({ isLoggedIn: true, user: omitPass(userRes) });
      } else {
        res.status(400).json({ error: 'incorrect password' });
      }
    } else {
      res.status(400).json({ error: 'user does not exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
