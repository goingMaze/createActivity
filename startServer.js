var server = require('./serverConfig/server');
var router = require('./serverConfig/router');
var requestHandlers = require('./serverConfig/requestHandler');

var handle = {};
handle['/'] = requestHandlers.start;
handle["/createActivity"] = requestHandlers.createActivity;

server.start(router.route, handle);