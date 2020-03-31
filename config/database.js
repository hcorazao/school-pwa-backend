const {
    DB_HOST,
    DB_NAME,
    DB_PORT,
    DB_USER,
    DB_PASS } = require('./config');
module.exports = {
    mongoConnectionString: DB_HOST
}