const { Schema, model } = require('mongoose');

const AmbulanceSchema = new Schema({
  org_name: {
    type: String,
    required: true,
  },
  org_type: {
    type: String,
    required: true,
  },
  contact_number: {
    type: String,
    match: [
      /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/,
      'fill a valid contact number',
    ],
    required: true,
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'fill a valid email address',
    ],
    required: true,
  },
  total_ambulance: Number,
  address: {
    type: String,
  },
  pincode: {
    type: Number,
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
  ambulance_details: [
    {
      type: String,
      // driver: String,
      // phone: {
      //   type: String,
      //   // match: [
      //   //   /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/,
      //   //   'fill a valid contact number',
      //   // ],
      //   required: true,
      // },
      // location: {
      //   type: String,
      // },
      // price: {
      //   type: String,
      // },
    },
  ],
});

module.exports = model('Ambulance', AmbulanceSchema);
