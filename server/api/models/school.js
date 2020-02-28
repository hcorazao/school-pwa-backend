const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    schoolName: {
        type: String,
    },
    schoolType: {
        type: String,
        enum: ['Public', 'Private', 'Magnet']
    },
    schoolLocation: {
        type: String,
    },
    aboutSchoolFunds: {
        type: String,
    },
    staffPoints: {
        type: Boolean,
        default: false
    },
    fullName: {
        type: String,
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    photo: {
        type: String,
        default: null,
    },
    schoolDescription: {
        type: String,
    },
    schoolAchievement: {
        type: String,
    },
    authyId: String,
},
    {
        timestamps: true,
        useNestedStrict: true

    });

// Static methods
schoolSchema.statics = {

    /**
     * Get all school ( & by search)
     * @param {*} param 
     */
    async findSchool(param) {

        let query = {};
        if (param.q !== '') {
            query = { schoolName: { $regex: `.*${param.q}.*`, $options: 'i' } };
        }
        const student = await this.find(query)
            .limit(+param.limit)
            .skip(+param.skip)
        if (student) {
            return student;
        }
    }
}
module.exports = mongoose.model('School', schoolSchema);