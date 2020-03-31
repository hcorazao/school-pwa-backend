const { GraphQLNonNull, GraphQLString, GraphQLBoolean } = require('graphql');
const { GraphQLUpload } = require('graphql-upload')
const SchoolType = require('../queries/SchoolType');
const { CustomType } = require('../queries/CustomType');
const School = require('../../models/School');
const { AUTHY_KEY } = require('../../../config/config');
const authy = require('authy')(AUTHY_KEY);
const { errorName } = require('../../constants')
const { createWriteStream } = require('fs');
/**
 * Add school mutation
 */
const addSchool = {
    type: SchoolType,
    args: {
        schoolName: {
            name: 'schoolName',
            type: new GraphQLNonNull(GraphQLString)
        },
        schoolType: {
            name: 'schoolType',
            type: new GraphQLNonNull(GraphQLString)
        },
        schoolLocation: {
            name: 'schoolLocation',
            type: new GraphQLNonNull(GraphQLString)
        },
        aboutSchoolFunds: {
            name: 'aboutSchoolFunds',
            type: new GraphQLNonNull(GraphQLString)
        },
        staffPoints: {
            name: 'staffPoints',
            type: new GraphQLNonNull(GraphQLBoolean)
        },
        fullName: {
            name: 'fullName',
            type: new GraphQLNonNull(GraphQLString)
        },
        mobileNumber: {
            name: 'mobileNumber',
            type: new GraphQLNonNull(GraphQLString)
        },
        photo: {
            name: 'photo',
            type: GraphQLUpload
        },
        schoolDescription: {
            name: 'schoolDescription',
            type: new GraphQLNonNull(GraphQLString)
        },
        schoolAchievement: {
            name: 'schoolAchievement',
            type: new GraphQLNonNull(GraphQLString)
        },
        authyId: {
            name: 'authyId',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: async function (root, params) {
        console.log(params)
        const photo = await params.photo;
        if (photo.filename != '') {
            const imgData = await imageUpload(photo);
        }
        const uModel = new School(params);
        uModel.photo = photo.filename;
        const newAuthor = await uModel.save();
        if (!newAuthor) {
            throw new Error('Error')
        }
        return newAuthor
    }
}
/**
 * Image upload function
 * @param {*} photo 
 */
async function imageUpload(photo) {
    const { filename, mimetype, createReadStream } = await photo;
    return new Promise(async (resolve, reject) => {
        await createReadStream()
            .pipe(createWriteStream(__dirname + `/../../../images/${filename}`))
            .on("finish", () => resolve(true))
            .on("error", () => reject(false))
    });

}

/**
 * Verification code 
 */
const sendSms = {
    type: CustomType,
    args: {
        email: {
            name: 'email',
            type: new GraphQLNonNull(GraphQLString)
        },
        mobileNumber: {
            name: 'mobileNumber',
            type: new GraphQLNonNull(GraphQLString)
        },
        countryCode: {
            name: 'countryCode',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: async function (root, params) {
        try {
            const sendSms = new Promise((resolve, reject) => {
                authy.register_user(params.email, params.mobileNumber, params.countryCode,
                    (err, response) => {
                        if (err) {
                            errors = {
                                code: 404,
                                message: 'There was some error registering the user'
                            }
                            return reject(errors);
                        }
                        resolve(response.user.id);
                    });

            })
            const authyId = await sendSms;
            console.log(authyId);
            const data = await sendToken(authyId);
            return data;

        } catch (err) {
            throw err.message
        }
    }

}
/**
 * function to send verification otp
 * @param {*} authyId 
 */
async function sendToken(authyId) {
    return new Promise((resolve, reject) => {
        authy.request_sms(authyId, true, function (err, response) {
            if (err) {
                errors = {
                    code: 404,
                    message: 'There was some error sending OTP to cell phone'
                }
                reject(errors);
            } else {
                resolve({
                    success: true,
                    message: 'OTP Sent to the cell phone.',
                    authyId: authyId
                });
            }
        });
    });
}

/**
 * Otp verified
 */
verifySms = {
    type: CustomType,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString)
        },
        otp: {
            name: 'otp',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: async function (root, params) {
        try {
            const otpVerify = new Promise((resolve, reject) => {
                authy.verify(params.id, params.otp,
                    (err, response) => {
                        if (err) {
                            const errors = {
                                success: false,
                                message: 'OTP verification failed.'
                            };
                            return reject(errors);
                        }
                        const data = {
                            success: true,
                            message: 'OTP Verified.'
                        };
                        resolve(data);

                    })
            })
            const result = await otpVerify;
            return result;
        } catch (err) {
            throw err.message
        }
    }


}
module.exports = { addSchool, sendSms, verifySms }