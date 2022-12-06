// @route  GET: /api/user/isLoggedIn

module.exports = async (req, res) => {
  try {
    res.status(200).json({ isLoggedIn: true, user: req.user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
