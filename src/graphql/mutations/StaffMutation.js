var { GraphQLNonNull, GraphQLString, GraphQLBoolean } = require('graphql');
var StaffType = require('../queries/StaffType');
var Staff = require('../../models/Staff')

const addStaff = {
    type: StaffType,
    args: {
        schoolId: {
            name: 'schoolId',
            type: new GraphQLNonNull(GraphQLString)
        },
        staffName: {
            name: 'staffName',
            type: new GraphQLNonNull(GraphQLString)
        },
        charlyPoints: {
            name: 'staffPoints',
            type: new GraphQLNonNull(GraphQLBoolean)
        },
        mobileNumber: {
            name: 'mobileNumber',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: async function (root, params) {
        const uModel = new Staff(params);
        const newStaff = await uModel.save();
        if (!newStaff) {
            throw new Error('Error')
        }
        return newStaff
    }
}

module.exports = { addStaff }