const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  hospital_id: {
    type: String,
  },
  firstName: {
    type: String,
    required: true,
    maxlength: [55, 'Limit exceeded'],
  },
  middleName: {
    type: String,
    maxlength: [55, 'Limit exceeded'],
  },
  lastName: {
    type: String,
    required: true,
    maxlength: [55, 'Limit exceeded'],
  },
  mobile: {
    type: String,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: [true, 'THis email is already in use'],
    required: [true, 'Email address is required'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: [3, 'Minimum password length is 3 character'], // FIXME: password length
  },
  isHospitalAdmin: {
    type: Boolean,
    default: false,
  },
  isRahAdmin: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
  },
  dob: {
    type: Number,
  },
  gender: {
    type: String,
  },
  placeOfResidence: {
    type: String,
  },
  aadharCardNumber: {
    type: Number,
  },
  verified: {
    type: String,
  },
  user_type: {
    type: String,
  },
});

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('user', UserSchema);
