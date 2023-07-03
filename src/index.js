"use strict";
exports.__esModule = true;
var node_http_1 = require("node:http");
var service = (0, node_http_1.createServer)(function (request, response) {
    console.log("request received");
});
var localhost = "localhost";
var port = 3000;
service.listen(port, localhost, function () {
    console.log("listening port 3000");
});
