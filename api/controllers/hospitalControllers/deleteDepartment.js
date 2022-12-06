const { Hospital } = require('../../models');


module.exports = async (req, res) => {
    try {
        let { hosp_id, dept_name } = req.params
        console.log({ hosp_id, dept_name })
        var hospital = await Hospital.findOne({ _id: hosp_id, "department.name": dept_name })
        if (hospital) {
            hospital = await Hospital.findOneAndUpdate({ _id: hosp_id },
                { $pull: { department: { name: dept_name } }, }, { new: true },
            )
            res.status(200).json({ message: "successfully deleted department", hospital: hospital });
        } else {
            res.status(404).json({ error: 'department does not exists' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}