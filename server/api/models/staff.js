const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({

    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School'
    },
    staffName: {
        type: String,
    },
    charlyPoints: {
        type: Boolean,
        default: false
    },

    mobileNumber: {
        type: Number,
        required: true
    },
},
    {
        timestamps: true,
        useNestedStrict: true

    });

// Static method
staffSchema.statics = {
    /**
     * Get staff (& by search)
     * @param {*} param 
     */
    async findStaff(param) {
        let query = {};
        if (param.q !== '') {
            query = { $and: [{ staffName: { $regex: `.*${param.q}.*`, $options: 'i' } }, { schoolId: param.schoolId }] };
        } else {
            query = { schoolId: param.schoolId }
        }
        const staff = await this.find(query)
            .limit(+param.limit)
            .skip(+param.skip)
        if (staff) {
            return staff;
        }
    }
}

module.exports = mongoose.model('Staff', staffSchema);