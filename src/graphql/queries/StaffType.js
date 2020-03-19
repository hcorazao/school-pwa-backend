const { GraphQLString, GraphQLObjectType, GraphQLNonNull,GraphQLBoolean } = require('graphql');
const StaffType = new GraphQLObjectType({
    name: 'StaffType',
    description: "This represent an staff",
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLString) },
        schoolId: { type: new GraphQLNonNull(GraphQLString) },
        staffName: { type: new GraphQLNonNull(GraphQLString) },
        charlyPoints: { type: GraphQLBoolean },
        mobileNumber: { type: GraphQLString }
    })
});

module.exports = StaffType;