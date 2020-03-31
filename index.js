const express = require('express');
const graphQLHttp = require('express-graphql');
const { graphqlUploadExpress } = require('graphql-upload')
const schema = require('./src/schema');
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require('body-parser');
const database = require('./config/database');
const { PORT } = require('./config/config');
const getErrorCode = require('./src/utils/errors')
const path = require('path');

mongoose.Promise = global.Promise;
mongoose.connect(database.mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('db connection is okay');
    }
});
const app = express();
app.use('*', cors());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/', cors(), bodyParser.json(),
    graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
    graphQLHttp({
        schema: schema,
        rootValue: global,
        graphiql: true
    }));

app.listen(PORT, () => {
    console.log('server running at port', PORT)
});