const Staff = require('../models/staff');


/**
 * Add staff
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} reflection object
 */
create = async (req, res, next) => {
    try {
        const staff = new Staff(req.body);
        const newStaff = await staff.save();
        return res.status(200).send({
            success: true,
            message: 'Staff added successfully!',
            data: newStaff
        })
    } catch (e) {
        return res.status(500).send(e);
    }
}

/**
 * Get all staff
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} reflection object
 */
list = async (req, res, next) => {
    try {
        const page = req.query.page;
        const limit = 5;
        const skip = page * limit;
        const staff = await Staff.find()
            .skip(+skip)
            .limit(+limit);
        return res.status(200).send({
            success: true,
            data: staff
        })

    } catch (e) {
        return res.status(500).send(e);
    }
}
/**
 * Get staff by school id
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} reflection object
 */
getBySchoolId = async (req, res, next) => {
    try {
        const { page, schoolId, q } = req.query;
        const limit = 5;
        const skip = page * limit;

        const param = { limit, skip, q, schoolId };
        const staff = await Staff.findStaff(param);
        return res.status(200).send({
            success: true,
            data: staff
        })
    } catch (e) {
        return res.status(500).send(e);
    }
}


module.exports = { create, list, getBySchoolId }