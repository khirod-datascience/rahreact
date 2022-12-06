const demo_set = require('../demo_next_word');
const { Hospital } = require('../models');

// @route: GET /api/next/:word
module.exports = async (req, res) => {
  try {
    let { word } = req.params;
    word = word.toLowerCase();

    let match_array = new Array();
    for (singleWord of demo_set) {
      if (
        !!singleWord &&
        singleWord.toLowerCase().includes(word.toLowerCase().trim())
      )
        match_array.push(singleWord);
    }

    const resHospital = await Hospital.find({
      hospital_name: { $regex: word, $options: 'i' },
    });
    !!resHospital &&
      resHospital.map((hospital) => match_array.push(hospital?.hospital_name));

    match_array.sort((a, b) =>
      a.toLowerCase().indexOf(word.toLowerCase()) <
      b.toLowerCase().indexOf(word.toLowerCase())
        ? -1
        : 1
    );

    if (match_array.length == 0) {
      res.status(404).send('No match');
    } else {
      res.status(200).send(match_array);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'something went wrong' });
  }
};
