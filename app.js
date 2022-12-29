var cors = require('cors')
var express = require('express');

var app = express();


var bodyParser = require('body-parser');
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, defParamCharset: "utf8" }));
app.use("/",require("./getOrder"))



app.listen(7000, function () {
    console.log('Node app is running on port 7000');
});

module.exports = app;