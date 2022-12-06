const axios = require('axios');
const { getPreciseDistance } = require('geolib');
const { Hospital } = require('../models');

function getUniqueListBy(arr, key) {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
}

// @route  POST: /api/search
module.exports = async (req, res) => {
  try {
    let location = req.headers['location'] || '';
    location = location && JSON.parse(location);
    let departments;

    let { address, object } = req.body;
    let formattedAddress;
    if (address) {
      address = address && address.toLowerCase();
      const resLoc = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GCP_MAP_API_KEY}`
      );
      const loc = resLoc.data?.results?.[0]?.geometry?.location;
      location = [loc?.lat, loc?.lng];
      formattedAddress = resLoc.data?.results[0]?.formatted_address;
    }

    let respData = [];
    if (object) {
      const hospitalsByName = await Hospital.find({
        $or: [
          { hospital_name: { $regex: object, $options: 'i' } },
          { hospital_type: { $regex: object.split(' ')?.[0], $options: 'i' } },
        ],
      });
      respData = [...hospitalsByName];
      const hospitalsByAddr = await Hospital.find({
        $or: [
          {
            address: {
              $regex: formattedAddress.split(',')[0].trim(),
              $options: 'i',
            },
          },
          {
            address: {
              $regex: formattedAddress.split(',')[1].trim().split(' ')[0],
              $options: 'i',
            },
          },
        ],
      });
      respData = [respData, ...hospitalsByAddr];
    }
    if (respData && !!respData.length) {
      if (address) {
        const newRespData = respData.filter(
          (hosp) =>
            hosp?.address &&
            hosp?.address.toLowerCase().includes(address.split(',')[0])
        );
        if (newRespData && !!newRespData.length) respData = newRespData;
      }
      for (let item of respData) {
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
      res.status(200).json({ list: respData });
    } else {
      const resp = await callML(object);
      if (resp?.data) {
        // --set depts
        departments = resp.data || [];
        let allSearchedHospitals = [];
        for (let dept of departments) {
          const getDepartments = await Hospital.find({
            department: { $regex: dept.trim(), $options: 'i' },
          });
          if (!!getDepartments.length) {
            allSearchedHospitals.push(...getDepartments);
          }
        }
        if (!!allSearchedHospitals.length) {
          if (address) {
            const newAllSearchedHospitals = allSearchedHospitals.filter(
              (hosp) =>
                hosp?.address.toLowerCase().includes(address.split(',')[0])
            );
            if (newAllSearchedHospitals && !!newAllSearchedHospitals.length)
              respData = newAllSearchedHospitals;
          }
          for (let item of allSearchedHospitals) {
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
          // filter out repeated hospitals
          allSearchedHospitals = getUniqueListBy(
            allSearchedHospitals,
            'hospital_name'
          );
          res.status(200).json({ list: allSearchedHospitals });
        } else {
          res.status(404).json({ error: 'no hospital found' });
        }
      } else {
        res.status(404).json({ error: "can't seem to find your search" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
};

async function callML(disease) {
  try {
    const resp = await axios.get(
      `http://rah-model.coeaibbsr.in/predict/${disease}`
    );
    return resp;
  } catch (error) {
    // console.log(error);
  }
}
