const { Hospital } = require('../../models');

// @router GET: /api/hospital/dept/:department
module.exports = async (req, res) => {
  try {
    let location = req.headers['location'] || '';
    location = location && JSON.parse(location);

    const { department } = req.params;
    const getHospitalsByDept = await Hospital.find({
      department: { $elemMatch: { name: department.toLowerCase() } },
    });
    if (getHospitalsByDept) {
      for (let item of getHospitalsByDept) {
        const distance =
          !!item?.location?.coordinates &&
          !!location.length &&
          getPreciseDistance(
            { latitude: location?.[0], longitude: location?.[1] },
            {
              latitude: item?.location?.coordinates?.[1],
              longitude: item?.location?.coordinates?.[0],
            }
          );
        if (!!distance) item._doc['distance'] = distance / 1000;
      }
      // allHospitals.sort((a, b) => {
      //   return a.distance - b.distance;
      // });
      // const l = 5 * (page - 1);
      // allHospitals = allHospitals.slice(l, l + 10);
      res.status(200).json({ hospitals: getHospitalsByDept });
    } else {
      res.status(404).json({ error: 'no department exists' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
