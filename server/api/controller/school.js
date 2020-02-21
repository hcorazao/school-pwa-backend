const School = require('../models/school');
const { AUTHY_KEY } = require('../../config/config');
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
        if (!school) {
            return res.status(404).send({
                success: false,
                message: 'Not found!',
                data: null
            });
        }
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
        var schoolPublic = [];
        var schoolPrivate = [];
        var schoolMagnet = [];
        var obj = {};
        const school = await School.find();
        if (school.length > 0) {
            for (let item in school) {
                var type = school[item].schoolType;
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
            return res.status(200).send({
                success: true,
                schoolPublic: schoolPublic.length,
                schoolPrivate: schoolPrivate.length,
                schoolMagnet: schoolMagnet.length,
                data: school
            })
        }
        return res.status(404).send({
            success: false,
            message: 'Not found!',
            data: null
        });
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
        var id = req.param('id');
        var token = req.param('token');

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
        if (req.body.hasOwnProperty('authyId') && req.body.authyId != '') {
            const school = new School(req.body);
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
module.exports = { list, getById, sendsms, verifysms, create }