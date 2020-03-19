
const { GraphQLString, GraphQLObjectType, GraphQLNonNull, GraphQLBoolean, GraphQLInt } = require('graphql');
const SchoolType = new GraphQLObjectType({
    name: 'SchoolType',
    description: "This represent an school",
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLString) },
        schoolName: { type: new GraphQLNonNull(GraphQLString) },
        schoolType: { type: GraphQLString },
        schoolLocation: { type: GraphQLString },
        aboutSchoolFunds: { type: GraphQLString },
        staffPoints: { type: GraphQLBoolean },
        fullName: { type: GraphQLString },
        mobileNumber: { type: GraphQLString },
        photo: { type: GraphQLString },
        schoolDescription: { type: GraphQLString },
        schoolAchievement: { type: GraphQLString },
        authyId: { type: GraphQLString },
    }),

});


module.exports = SchoolType;