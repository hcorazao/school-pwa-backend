const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schoolSchema = new Schema({
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
    authyId: Number,
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
        const schools = await this.find(query)
            .limit(+param.limit)
            .skip(+param.skip)
        if (schools) {
            return schools;
        }
    }
}
const School = mongoose.model('School', schoolSchema);

module.exports = School;