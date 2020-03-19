const dotenv = require('dotenv');
dotenv.config();
const config = {
    APP_URL: process.env.APP_URL || 'http://localhost:3000',
    PORT: process.env.PORT || '3000',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_NAME: process.env.DB_NAME || 'schooldb',
    DB_PORT: process.env.DB_PORT || '27017',
    DB_USER: process.env.DB_USER || '',
    DB_PASS: process.env.DB_PASS || '',

    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || 'AC193ef22b5fed89f7e43d727162efcde0',
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || '78fac0b1896f7ee4762980e1ebc00274',
    AUTHY_KEY: process.env.AUTHY_KEY || 'dRMulWmaSDLvcC3mKp1SeHy3eeT4TH9G',
};

module.exports = config;