const { GraphQLList, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } = require('graphql');
const School = require('../../models/School');
const Staff = require('../../models/Staff');
const SchoolType = require('./SchoolType');
const { CustomType, SchoolcountType } = require('./CustomType');
const StaffType = require('./StaffType')

const SchoolQueryRootType = new GraphQLObjectType({
    name: 'SchoolPWASchema',
    description: "Student Application Schema Query Root",
    fields: () => ({
        schools: {
            type: new GraphQLList(SchoolType),
            args: {
                page: {
                    name: 'page',
                    type: GraphQLInt
                },
                q: {
                    name: 'q',
                    type: GraphQLString
                },
            },
            description: "List of all schools",
            resolve: async function (root, params) {
                const page = params.page;
                const limit = 5;
                const skip = page * limit;
                const q = params.q;
                const param = { limit, skip, q };
                const schools = await School.findSchool(param);
                return schools;
            }
        },
        schoolCount: {
            type: new GraphQLNonNull(SchoolcountType),
            description: "Count school based on schoolType",
            resolve: async function () {
                const schoolPublic = await School.countDocuments({ schoolType: 'Public' });
                const schoolPrivate = await School.countDocuments({ schoolType: 'Private' });
                const schoolMagnet = await School.countDocuments({ schoolType: 'Magnet' });
                const totalCount = { schoolPublic, schoolPrivate, schoolMagnet }
                return totalCount
            }
        },
        singleSchool: {
            type: new GraphQLNonNull(SchoolType),
            args: {
                _id: {
                    name: '_id',
                    type: GraphQLString
                },
            },
            description: "Get school by Id",
            resolve: async function (root, params) {
                return await School.findById(params._id);
            }
        },

        staffs: {
            type: new GraphQLList(StaffType),
            description: "List of all staffs",
            resolve: async function () {
                var staffs = await Staff.find({})
                return staffs;
            }
        },
        StaffBySchoolId: {
            type: new GraphQLList(StaffType),
            args: {
                schoolId: {
                    name: 'schoolId',
                    type: GraphQLString
                },
                page: {
                    name: 'page',
                    type: GraphQLInt
                },
                q: {
                    name: 'q',
                    type: GraphQLString
                },
            },
            description: "Get staff by school Id",
            resolve: async function (root, params) {
                const page = params.page;
                const limit = 5;
                const skip = page * limit;
                const q = params.q;
                const schoolId = params.schoolId;
                const param = { limit, skip, q, schoolId };
                const staff = await Staff.findStaff(param);
                return staff;
            }
        },

    })
});

module.exports = SchoolQueryRootType