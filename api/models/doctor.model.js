const mongoose = require('mongoose');

const { Schema } = mongoose;

const DoctorSchema = new Schema({
  profilePic: String,
  name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  about_points: [String],
  schedules: [
    {
      Day: {
        type: String,
        required: true,
      },
      time: {
        type: String,
        reuired: true,
      },
      //   Department: {
      //     type: String,
      //     required: true,
      //   },
    },
  ],
});

const Doctor = mongoose.model('Doctor', DoctorSchema);

module.exports = Doctor;

// const { ObjectId } = require('mongodb');
// const list = ['5edca3a1952997473c5beadd']; // The array with all the ids
// const ids = list.map(id => new ObjectId(id))

// db.your_collection_name.find({ _id: { $in: ids } }); // Mongo query.
