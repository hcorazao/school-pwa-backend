const mongoose = require('mongoose');
const app = require('./server/config/express');
const { url } = require('./server/config/db');

//set port
const port = 3000;
console.log("connecting--", url);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }); // Mongoose connection created

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});

module.exports = app;