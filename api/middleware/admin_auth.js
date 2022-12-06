const { User } = require('../models');
const { decodeToken } = require('../utils/authToken');

module.exports = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await User.findById(id);
        if (user) {
            if (user.isRahAdmin || user.isHospitalAdmin) {
                req.user = user;
                next()
            } else {
                return res
                    .status(403)
                    .json({ isLoggedIn: false, error: 'validation error' });
            }
        }
    } catch (error) {
        console.log(error)
        return res
            .status(401)
            .json({ isLoggedIn: false, error: 'Invalid session' });
    }
};
