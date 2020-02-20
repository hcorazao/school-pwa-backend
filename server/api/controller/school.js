const School = require('../models/school');
const { AUTHY_KEY } = require('../../config/config');
const authy = require('authy')(AUTHY_KEY);
/**
 * Get students
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} reflection object
 */
list = async (req, res, next) => {
    try {
        const school = await School.find();
        return res.status(200).send({
            success: true,
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
            console.log(response);
            return res.status(404).send({
                success: true,
                message: 'OTP Sent to the cell phone.',
                data: authyId
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
        console.log('New verify request...');
        var id = req.param('id');
        var token = req.param('token');

        authy.verify(id, token, function (verifyErr, verifyRes) {
            console.log('In Verification...');
            if (verifyErr) {
                console.log(verifyErr);
                res.send('OTP verification failed.');
            } else if (verifyRes) {
                console.log(verifyRes);
                res.send('OTP Verified.');
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
        const school = new School(req.body);
        const newSchool = await school.save();
        return res.status(200).send({
            success: true,
            message: 'School created!',
            data: newSchool
        })
    } catch (e) {
        return res.status(500).send(e);
    }
}
module.exports = { list, sendsms, verifysms, create }