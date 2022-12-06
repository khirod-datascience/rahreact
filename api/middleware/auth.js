const { User } = require('../models');
const { decodeToken } = require('../utils/authToken');

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies['access-token'];
    // const token = req.headers['access-token'];
    if (token && !!token) {
      const payload = decodeToken(token);
      if (payload && !!payload) {
        const user = await User.findById(payload);
        if (user) {
          req.user = user;
          req.payload = payload;
          next();
        } else {
          return res
            .status(404)
            .json({ isLoggedIn: false, error: 'no user found' });
        }
      } else {
        return res
          .status(403)
          .json({ isLoggedIn: false, error: 'token expired' });
      }
    } else {
      return res
        .status(401)
        .json({ isLoggedIn: false, error: 'Invalid session' });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ isLoggedIn: false, error: 'Invalid session' });
  }
};
