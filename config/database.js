const {
    DB_HOST,
    DB_NAME,
    DB_PORT,
    DB_USER,
    DB_PASS } = require('./config');
module.exports = {
    mongoConnectionString: `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
}