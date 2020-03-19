const { addSchool, sendSms, verifySms } = require('./SchoolMutation');
const { addStaff } = require('./StaffMutation');
module.exports = {
    addSchool,
    addStaff,
    sendSms,
    verifySms
}