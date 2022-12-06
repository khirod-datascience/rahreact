const { Hospital } = require('../../models');
const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId


module.exports = async (req, res) => {

    try {
        const { hosp_id } = req.params
        const { name, icon } = req.body
        var hospital = await Hospital.findOne({ _id: hosp_id, "department.name": name })
        if (!hospital) {
            const department = {
                "_id": new objectId(),
                "name": name,
                "icon": icon
            }
            hospital = await Hospital.findOneAndUpdate({ _id: hosp_id },
                { $push: { department: department }, }, { new: true },
            )
            res.status(200).json({ message: "successfully added department", hospital: hospital });
        } else {
            res.status(404).json({ error: 'department already exists' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}