// 引入fs文件处理模块
var fs = require("fs");

/*
 * name: 活动名
 * title：分享标题
 * desc: 分享描述
 */
function createActivity(name, title, desc, callback) {
	fs.mkdir("./activity-" + name, function(err) {
		if(err) {
			callback("活动创建失败");
			return console.error(err);
		}
		createFile(name, "html");
		createFile(name, "js", title, desc);
		createFile(name, "png", title, desc);
		chanegCommonFile(name, title);
		console.log("./activity-" + name + " 活动创建成功");

		callback("活动创建成功");
		return true;
	});
}

function createFile(name, suffix, title, desc) {
	if(suffix == "html") {
		fs.readFile('./activity-template/activity-template.html', 'utf-8', function(err, data) {
			if(err) {
				return console.error(err);
			}
			data = data.replace("activity-template.js", "activity-" + name + ".js");
			writeFile(name, suffix, data);
		});
	}
	if(suffix == "js") {
		
		fs.readFile('./activity-template/activity-template.js', 'utf-8', function(err, data) {
			if(err) {
				return console.error(err);
			}

			data = data.replace("interface_templateAdd", "interface_" + name + "Add");

			writeFile(name, suffix, data);

			var fileData = data;
			changeEnrollSuccessFile(name, suffix, fileData, title, desc);
		});
	}

	if(suffix == ("png" || "jpg")) {
		fs.readdir('./activity-template/', function(err, files) {
			if(err) {
				return console.error(err);
			}
			
			for(var i = 0; i < files.length; i++) {
				var file = files[i];
				if(file.match(/\.png$|\.jpg$|\.jpeg$/)) {
					// 创建读取流
					readable = fs.createReadStream('./activity-template/' + file);
					// 创建写入流
					writable = fs.createWriteStream('./activity-' + name + '/' + file);
					// 通过管道来传输流
					readable.pipe(writable);
				}
			}
		});
	}
}

function writeFile(name, suffix, data) {
	fs.writeFile("./activity-" + name + "/activity-" + name + "." + suffix, data, function(err) {
		if(err) {
			return console.error(err);
		}
		console.log("./activity-" + name + "/activity-" + name + "." + suffix + "文件创建成功");
	});
}

function changeEnrollSuccessFile(name, suffix, fileData, title, desc) {
	fs.readFile('./activityCommonSource/enrollSuccess.js', 'utf-8', function(err, data) {
		if(err) {
			return console.error(err);
		}

		var activityNum = parseInt(data.match(/activityNum = (\d*)(?=;)/)[1]) + 1;
		data = data.replace(/activityNum = \d*;/, "activityNum = " + activityNum + ";");
		var activityShareInfo = "case '" + activityNum + "':\n\t\t\t{\n\t\t\t\ttitle = \'" + title + "'; // 分享标题\n\t\t\t\tdesc = \'" + desc + "\'; // 分享描述\n\t\t\t\tlinkStr = \'http://vivo.bochengchina.cn/newvivo/member/seturl?url=http://shop.bochengchina.cn/activity-" + name + "/activity-" + name + ".html\'; // 分享链接\n\t\t\t\timgUrl = \'http://shop.bochengchina.cn/activity-" + name + "/share.jpg\'; // 分享图标\n\t\t\t\tbreak;\n\t\t\t}\n\n\t\tdefault:\n\t\t\tbreak;"

		data = data.replace("default:\n\t\t\tbreak;", activityShareInfo);

		fs.writeFile('./activityCommonSource/enrollSuccess.js', data, function(err) {
			if(err) {
				return console.error(err);
			}
			fileData = fileData.replace(/html\?id=\d*/, "html?id=" + activityNum);
			fileData = fileData.replace("title: \"\",", "title: \"" + title + " \",");
			writeFile(name, suffix, fileData);
		});
	})
}

function chanegCommonFile(name, title) {
	var interfaceUrl = "\tinterface_" + name + "Add = bochengServer +\"/newvivo/" + name + "/add\"; // " + title + "\n\n";
	var fileName = "./activityCOmmonSource/common.js";
	fs.readFile(fileName, 'utf-8', function(err, data) {
		if(err) {
			return console.error(err);
		}

		data = data.replace(/\n(?=function activity)/, interfaceUrl);

		fs.writeFile(fileName, data, function(err) {
			if(err) {
				return console.error(err);
			}

			console.log("修改common.js成功");
		})
	});
}

//createActivity(process.argv[2], process.argv[3], process.argv[4]);
module.exports = createActivity;