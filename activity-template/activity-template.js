var vm = new Vue({
	el: 'html',
	data: {
		data: {
			className: "webkitBox",
			title: "",
			selectObj: [{
				name: "课程",
				value: ["珠心算", "绘画"]
			}, {
				name: "队伍人数",
				value: ["3", "4", "5"]
			}],

			fontColor: "#d00204",
			closeBtnBgColror: "#d00204"
		}
	}
});

window.onload = function() {
	/*
	 * 配置分享
	 */
	loadData();

	/*
	 * 选择列表事件
	 */
	for(var i = 0; i < document.querySelectorAll('select').length; i++) {
		document.querySelectorAll('select')[i].addEventListener('change', function(event) {
			this.parentNode.childNodes[1].innerHTML = this.options[this.options.selectedIndex].value + "<lable class='iconfont'>&#xe610;</lable>";
			console.log(this.parentNode.childNodes[1].innerHTML);
		});
	}

	/*
	 * 获取输入信息
	 */
	function getInfo() {
		var data = {
			name: document.getElementById('activityName').value,
			sex: document.getElementById('activitySex').selectedIndex + 1,
			phone: document.getElementById('activityTel').value,
			age: document.getElementById('activityAge').value,
			key: frameScript.getQueryString("key")
		}
		return data;
	}

	/*
	 * 数据格式检测
	 */
	function checkDataLegal(data, reg, msg) {
		if(reg.test(data)) {
			return true;
		}
		alert(msg);
		return false;
	}

	/*
	 * 提交数据
	 */
	function sendMsg() {
		var data = getInfo();
		var reg = /\S/;
		var regNum = /^\d+(\.\d+)?$/;
		var regTel = /^\d{11}$/g;
		if(checkDataLegal(data.name, reg, '名字不能为空') &&
			checkDataLegal(data.age, regNum, '年龄不能为空') &&
			checkDataLegal(data.phone, regTel, '请输入11位电话号码')) {
			frameScript.ajax({
				url: interface_templateAdd,
				method: "POST",
				data: data,
				success: function(response) {
					console.log(response);
					if(response.code == 1) {
						window.location.href = '/activityCommonSource/enrollSuccess.html?id=1';
					} else {
						alert(response.message);
					}
				}
			})
		}
	}

	document.getElementById("joinBtn").addEventListener('click', sendMsg);
	/*
	 * 开关弹窗
	 */
	function openDesc() {
		document.getElementById('popWinDesc').className = 'show';
	}

	document.getElementById("activityDesc").addEventListener('click', openDesc, false);

	function closeDesc() {
		document.getElementById('popWinDesc').className = '';
	}

	document.getElementById("closeBtn").addEventListener('click', closeDesc, false);

	var joinBtn = document.getElementById('joinBtn');

	/*
	 * 上传图片
	 */
	function sendImg() {
		document.getElementById("chooseImgInput").click();
	}

	document.getElementById('uploadImgBox').addEventListener('click', sendImg);

	document.getElementById("uploadImgBtn").style.width = (parseFloat(window.getComputedStyle(document.getElementById("uploadImg")).width) - 5) + 'px';

	document.getElementById("choosedImg").style.width = parseFloat(window.getComputedStyle(document.getElementById("uploadImg")).width) * 0.85 + 'px';

	document.getElementById("chooseImgInput").onchange = function(data) {
		lrz(this.files[0], {
			quality: 0.7,
			width: 1000,
			before: function() {
				console.log('压缩开始');
			},
			fail: function(err) {
				console.error(err);
			},
			always: function() {
				console.log('压缩结束');
			},
			done: function(result) {
				console.log("压缩完成");
				document.getElementById("popWin").className = "show";
				document.getElementById('choosedImg').src = result.base64;
				document.getElementById('choosedImg').className = "show";
				frameScript.ajax({
					type: "post",
					url: uploadURLBase64,
					async: true,
					//					xhrFields: {
					//						withCredentials: true
					//					},
					contentType: 'text/plain;charset=UTF-8',
					dataType: "json",
					data: result.base64,
					success: function(data) {
						document.getElementById("popWin").className = "";
						babyImg = data.data.host + data.data.image;
					},
					error: function(data) {
						layer.msg(data);
					}
				});
			}
		});
	};

	/*
	 * 复选框样式替换
	 */
	for(var i = 0; i < document.querySelectorAll("input[type=checkbox]").length; i++) {
		(function(i) {
			document.querySelectorAll("input[type=checkbox]")[i].addEventListener('click', function() {
				if(this.checked) {
					document.querySelectorAll(".checkbox")[i].className += " checkedbox";
				} else {
					document.querySelectorAll(".checkbox")[i].className = "checkbox";
				}
			});
		})(i);
	}
}