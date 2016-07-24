var fs = require('fs');
var url = require('url');
var path = require('path');

var mime = {
	"html": "text/html",
	"htm": "text/html",
	"css": "text/css",
	"js": "text/javascript",
	"xml": "text/xml",

	"json": "application/json",
	"png": "image/png",
	"jpg": "image/jpeg",
	"jpeg": "image/jpeg",

	"woff": "application/x-font-woff"
}

function route(handle, pathname, response, request) {
	var filename = __dirname.slice(0, -13) + url.parse(request.url).pathname;

	var extname = path.extname(filename);
	
	console.log(filename);

	console.log("About to route a request for " + pathname);
	if(typeof handle[pathname] === 'function') {
		handle[pathname](response, request);
	} else if(extname) {
		//扩展名含点号如'.html',截掉
		extname = extname ? extname.slice(1) : 'unknown';

		//映射表中查找请求的资源的MIME类型并返回，没有映射均返回'text/plain'类型
		var resContentType = mime[extname] || 'text/plain';
		filename = filename.replace('activity-1template', '');

		fs.exists(filename, function(exists) {
			if(!exists) {
				//文件不存在返回404
				response.writeHead(404, {
					'Content-Type': 'text/plain'
				})
				response.write('404 Not Found');
				response.end();
			} else {
				//文件存在读取并返回
				fs.readFile(filename, function(err, data) {
					if(err) {
						response.writeHead(500, {
							'Content-Type': 'text/plain'
						});
						response.end(err);
					} else {
						response.writeHead(200, {
							'Content-Type': resContentType
						});
						response.write(data);
						response.end();
					}
				})
			}
		});
	} else {
		console.log("No request handler found for " + pathname);
		response.writeHead(404, {
			"Content-Type": "text/html"
		});
		response.write("404 Not found");
		response.end();
	}
}

exports.route = route;