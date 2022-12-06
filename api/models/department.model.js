const { Schema, model } = require('mongoose');

const DepartmenSchema = new Schema({
  departments: [
    {
      icon: String,
      name: String,
    },
  ],
  facilities: [{ type: String }],
});

module.exports = model('department', DepartmenSchema);
