const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const mutation = require('./graphql/mutations/index')
const SchoolQueryRootType = require('./graphql/queries/index')

const SchoolAppSchema = new GraphQLSchema({
    query: SchoolQueryRootType,
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: mutation
    })
});

module.exports = SchoolAppSchema;