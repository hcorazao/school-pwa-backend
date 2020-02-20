const dotenv = require('dotenv');
dotenv.config();
const config = {
    APP: process.env.APP || 'development',
    PORT: process.env.PORT || '3000',
    DB_HOST: process.env.DB_HOST || 'mongodb://localhost:27017/mvp',
    DB_NAME: process.env.DB_NAME || 'mvp',
    DB_PORT: process.env.DB_PORT || '27017',

    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || 'AC193ef22b5fed89f7e43d727162efcde0',
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || '78fac0b1896f7ee4762980e1ebc00274',
    AUTHY_KEY: process.env.AUTHY_KEY || 'dRMulWmaSDLvcC3mKp1SeHy3eeT4TH9G',
};

module.exports = config;