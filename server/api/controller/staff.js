const Staff = require('../models/staff');
/**
 * Get staff
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
        const staff = await Staff.find().skip(+skip).limit(+limit);
        return res.status(200).send({
            success: true,
            data: staff
        })
    } catch (e) {
        return res.status(500).send(e);
    }
}

/**
 * Add student
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

module.exports = { list, create }