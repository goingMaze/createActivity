(function() {
	var frameScript = {
		//异步请求
		ajax: function(config) {
			config = config || {};
			config.method = config.method || "GET";
			config.method = config.method.toUpperCase();
			config.url = config.url || "localhost";
			config.async = typeof config.async === "undefined" ? true : config.async;
			config.data = config.data || {};
			if (typeof config.data === "object") {
				var dataStr = "";
				for (var i in config.data) {
					dataStr += ("&" + i + "=" + config.data[i]);
				}
				dataStr = dataStr.substr(1, dataStr.length);
			}
			var xhr = new XMLHttpRequest();
			xhr.withCredentials = true;
			xhr.open(config.method, config.url, config.async);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 && xhr.status == 0) {
					alert("数据获取失败，请刷新重试!");
					if (typeof config.error === "function") {
						config.error(xhr);
					}
				}
				if (xhr.readyState == 4 && xhr.status == 200) {
					if (typeof config.success === "function") {
						config.success(JSON.parse(xhr.responseText));
					}
				}
			};
			xhr.send(dataStr);
		}
	}
	window.frameScript = frameScript;
	return window.frameScript;
})();