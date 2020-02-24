const Joi = require('joi');
module.exports = {
    // POST api/v1/users
    createStudent: {
        body: {
            schoolName: Joi.string().max(128).required(),
            mobileNumber: Joi.number().min(10).max(14),
        }
    },
};
