var http = require('http');
var url = require('url');
var os = require('os');

// 创建服务器
function start(route, handle) {
	function onRequest(request, response) {
		// 解析请求，包括文件名
		var pathname = url.parse(request.url).pathname;

		// 输出请求的文件名
		console.log("Request for " + pathname + " received.");

		route(handle, pathname, response, request);
	}
	http.createServer(onRequest).listen(8011);

	console.log("Server running at http://" + getIPv4() + ":8011/");
}

function getIPv4() {
	var interfaces = os.networkInterfaces(); //获取网络接口列表
	var ipv4s = []; //同一接口可能有不止一个IP4v地址，所以用数组存

	Object.keys(interfaces).forEach(function(key) {
		interfaces[key].forEach(function(item) {

			//跳过IPv6 和 '127.0.0.1'
			if('IPv4' !== item.family || item.internal !== false) return;

			ipv4s.push(item.address); //可用的ipv4s加入数组
			console.log(key + '--' + item.address);
		})
	})
	return ipv4s[0]; //返回一个可用的即可
}

exports.start = start;