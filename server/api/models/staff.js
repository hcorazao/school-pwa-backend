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

module.exports = mongoose.model('Staff', staffSchema);