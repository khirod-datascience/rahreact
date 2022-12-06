const { Schema, model } = require('mongoose');

const HospitalSchema = new Schema({
  hospital_name: {
    type: String,
    // required: true,
  },
  about: {
    type: String,
    // required: true,
  },
  logo: {
    type: String,
    // required: true,
  },
  images: [
    {
      type: String,
      // required: true,
    },
  ],
  hospital_type: {
    type: String,
    // required: true,
  },
  contact_number: {
    type: Number,
    // match: [
    //   /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/,
    //   'fill a valid contact number',
    // ],
    // required: true,
  },
  hospital_email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'fill a valid email address',
    ],
    // required: true,
  },
  address: {
    type: String,
    // required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
  },
  total_seats: {
    type: Number,
    // required: true,
  },
  total_icus: {
    type: Number,
    // required: true,
  },
  facilities: [
    {
      icon: String,
      heading: String,
      content: String,
    },
  ],
  rating: {
    type: Number,
    // required: true,
  },
  rated_by: {
    type: Number,
    // required: true,
  },
  department: [String],
  reviews: [
    {
      name: String,
      rating: Number,
      comment: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('Hospital', HospitalSchema);
