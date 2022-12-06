const jwt = require('jsonwebtoken');

module.exports.generateToken = (value) => {
  try {
    console.log({ value: value.toString() });
    return jwt.sign({ id: value.toString() }, process.env.SECRET_TOKEN, {
      expiresIn: '4d',
      issuer: process.env.HOST_NAME,
    });
  } catch (error) {
    return null;
  }
};

module.exports.decodeToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    if (decoded) {
      return decoded.id;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
