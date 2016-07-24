var bochengServer = "http://vivo.bochengchina.cn";
var appId = "wxf1d33c9c5cf14c88";

//图片上传路径
var uploadURL = "http://photo.api.bochengchina.cn/photo/upload";

//图片上传路径
var uploadURLBase64 = "http://photo.api.bochengchina.cn/photo/uploadBase64";

var interface_wxUserInfo = bochengServer + "/newvivo/member/wxuserinfo", // 微信用户信息
	interface_wxGetTicket = bochengServer + "/newvivo/weixin/getticket"; // 微信配置信息

function activity(data) {
	var url = 'http://vivo.bochengchina.cn/newvivo/member/seturl?url=http://shop.bochengchina.cn/' + data;
	console.log(url);
	frameScript.ajax({
		url: url,
		method: "GET",
		success: function(response) {
			console.log(response);
			if (response.code == 1) {
				window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4a5f7879aea07d7d&redirect_uri=http%3A%2F%2Fvivo.bochengchina.cn%2Fnewvivo%2Fmember%2Ftoredirecturl&response_type=code&scope=snsapi_userinfo#wechat_redirect';
			} else {
				alert('获取失败');
			}
		}
	})
}
