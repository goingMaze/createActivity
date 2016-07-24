// 引入fs文件处理模块
var fs = require("fs");

function changeFileName(src, prefix) {
	//	src = src + '/';

	fs.readdir(src, function(err, files) {
		// files是名称数组，因此
		// 可以使用forEach遍历哈, 此处为ES5 JS一点知识
		// 如果不清楚，也可以使用for循环哈
		if (err) {
			return console.error(err);
		}
		
		files.forEach(function(filename) {
			// 下面就是文件名称重命名
			// API文档中找到重命名的API，如下
			// fs.rename(oldPath, newPath, callback)       
			// 下面，我们就可以依葫芦画瓢，确定新旧文件名称：
			if (filename.indexOf('activity') && filename.indexOf(prefix) && filename.indexOf(prefix[0].toLowerCase() + 'b') && filename.indexOf(prefix[0].toLowerCase() + 's')) {
				filename = filename.substring(0, 1).toUpperCase() + filename.substring(1);
				var oldPath = src + '/' + filename,
					newPath = src + '/' + prefix + filename;
				// 重命名走起
				fs.rename(oldPath, newPath, function(err) {
					if (!err) {
						console.log(filename + '替换成功! ');
					}
				})
			}
		});
	});
}

changeFileName(process.argv[2], process.argv[3]);