var fs = require('fs');
var querystring = require('querystring');
var url = require('url');
var path = require('path');
var createActivityFunc = require('./createActivity.js');

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

function start(response, request) {
	var filename = __dirname + url.parse(request.url).pathname;
	filename = "./activity-template/activityConfiguration.html";
	var extname = path.extname(filename);
	//扩展名含点号如'.html',截掉
	extname = extname ? extname.slice(1) : 'unknown';
	//映射表中查找请求的资源的MIME类型并返回，没有映射均返回'text/plain'类型
	var resContentType = mime[extname] || 'text/plain';

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
}

function createActivity(response, request) {
	var post = ''; //定义了一个post变量，用于暂存请求体的信息

	request.on('data', function(chunk) { //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
		post += chunk;
	});

	request.on('end', function() { //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
		post = querystring.parse(post);
		response.writeHead(200, {
			'Content-Type': 'text/plain;charset=utf-8'
		});

		var responseInfo = {
			code: 200,
			data: {},
			msg: 'ok'
		}

		function callback(result) {
			responseInfo.msg = result;

			responseInfo = JSON.stringify(responseInfo);
			// 响应文件内容
			response.end(responseInfo);
		}

		createActivityFunc(post.name, post.title, post.desc, callback);
	});
}

exports.start = start;
exports.createActivity = createActivity;