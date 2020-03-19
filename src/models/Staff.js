const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffSchema = new Schema({
    schoolId: {
        type: Schema.Types.ObjectId,
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

const Staff = mongoose.model('Staff', staffSchema);
module.exports = Staff;