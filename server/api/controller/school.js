const School = require('../models/school');
const { AUTHY_KEY, uuid } = require('../../config/config');
const authy = require('authy')(AUTHY_KEY);

/**
 * Gel school by id
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} reflection object
 */
getById = async (req, res, next) => {
    try {
        const school = await School.findById(req.params.id);
        return res.status(200).send({
            success: true,
            data: school
        });
    } catch (e) {
        return res.status(500).send(e);
    }
}
/**
 * Get students
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} reflection object
 */
list = async (req, res, next) => {
    try {
        const schoolPublic = [];
        const schoolPrivate = [];
        const schoolMagnet = [];
        const obj = {};

        const { page, q } = req.query;
        const limit = 5;
        const skip = page * limit;
        let query = {};
        if (q !== '') {
            query = { schoolName: q };
        }
        const school = await School.find(query).skip(+skip).limit(+limit);

        const schoolData = await School.findSchool();
        if (school.length > 0) {
            for (let item in schoolData) {
                var type = schoolData[item].schoolType;
                if (type == 'Public') {
                    obj['schoolType'] = type;
                    schoolPublic.push(obj);
                }
                if (type == 'Private') {
                    obj['schoolType'] = type;
                    schoolPrivate.push(obj);
                }
                if (type == 'Magnet') {
                    obj['schoolType'] = type;
                    schoolMagnet.push(obj);
                }
            }

        }
        return res.status(200).send({
            success: true,
            dataCount: {
                schoolPublic: schoolPublic.length,
                schoolPrivate: schoolPrivate.length,
                schoolMagnet: schoolMagnet.length,
            },
            data: school
        })

    } catch (e) {
        return res.status(500).send(e);
    }
}
/** Send sms (otp request)
 * @param {object} res
 * @param {object} req
 * @param {object} next
 * @returns {object} reflection object
 */
sendsms = async (req, res, next) => {
    const { email, mobileNumber, countryCode } = req.body;
    try {
        const mobile = await School.findOne({ mobileNumber: mobileNumber })
        if (mobile) {
            return res.status(200).send({
                success: false,
                message: 'Phone Number allready registered. please use another number'
            });
        }
        authy.register_user(email, mobileNumber, countryCode, function (err, response) {
            if (err || !response.user) {
                return res.status(404).send({
                    success: false,
                    message: 'There was some error registering the user.'
                });
            }
            let authyId = response.user.id;
            sendToken(authyId, res);
        });

    } catch (e) {
        return res.status(500).send(e);
    }
}
/**
 * With a valid Authy ID, send the 2FA token for this user
 * @param {*} authyId 
 */
function sendToken(authyId, res) {
    authy.request_sms(authyId, true, function (err, response) {
        if (err) {
            return res.status(404).send({
                success: false,
                message: 'There was some error sending OTP to cell phone.'
            });
        } else {
            return res.status(200).send({
                success: true,
                message: 'OTP Sent to the cell phone.',
                authyId: authyId
            });
        }
    });
}
/**
 * verify otp
 * @param {object} res
 * @param {object} req
 * @param {object} next
 * @returns {object} reflection object
 */
verifysms = async (req, res, next) => {
    try {

        const id = req.query.id;
        const token = req.query.token;

        authy.verify(id, token, function (err, response) {

            if (err) {
                return res.status(404).send({
                    success: false,
                    message: 'OTP verification failed.'
                });
            } else if (response) {
                return res.status(200).send({
                    success: true,
                    message: 'OTP Verified.'
                });
            }
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
        if (req.body.authyId != '') {
            const school = new School(req.body);
            school.photo = (req.file != undefined) ? req.file.path : '';
            const newSchool = await school.save();
            return res.status(200).send({
                success: true,
                message: 'School added successfully!',
                data: newSchool
            })
        }
        return res.status(401).send({
            success: false,
            message: 'Something went wrong!',

        })

    } catch (e) {
        return res.status(500).send(e);
    }
}

module.exports = { sendsms, verifysms, create, list, getById }