
const { GraphQLString, GraphQLObjectType, GraphQLNonNull, GraphQLBoolean, GraphQLInt } = require('graphql');
const CustomType = new GraphQLObjectType({
    name: 'CustomType',
    description: "This represent an school",
    fields: () => ({
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString },
        authyId: { type: GraphQLString },
    }),

});

const SchoolcountType = new GraphQLObjectType({
    name: 'SchoolcountType',
    description: "This represent an school",
    fields: () => ({
        schoolPublic: { type: GraphQLString },
        schoolPrivate: { type: GraphQLString },
        schoolMagnet: { type: GraphQLString },
    }),

});


module.exports = { CustomType, SchoolcountType };