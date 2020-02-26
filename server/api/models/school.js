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

schoolSchema.statics = {

    // find query
    async findSchool() {
        const student = await this.findOne();
        if (!student) {
            return student;
        }
    }
}
module.exports = mongoose.model('School', schoolSchema);