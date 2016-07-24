var title, linkStr, imgUrl, desc;

var rootPath = "http://vivo.bochengchina.cn/newvivo/member/seturl?url=http://shop.bochengchina.cn"
var imgRootPath = "http://shop.bochengchina.cn";
var activityNum = 1;
/*
 * 配置分享信息
 */
function loadData() {
	var id = null;
	if(window.location.search.indexOf('id')!=-1) {
		id = (window.location.search).split('=')[1];
	}
	
	switch(id) {
		case '1':
			{
				title = '瘦身王活动'; // 分享标题
				desc = '瘦身王活动报名入口'; // 分享描述
				linkStr = 'http://vivo.bochengchina.cn/newvivo/member/seturl?url=http://shop.bochengchina.cn/activity-ThinKing/activity-ThinKing.html'; // 分享链接
				imgUrl = 'http://shop.bochengchina.cn/activity-ThinKing/Sb.jpg'; // 分享图标
				break;
			}

		default:
			break;
	}

	if(id == null) {
		title = document.title;
		if(document.title.indexOf('报名') == -1) {
			desc = document.title + "报名入口";
		} else {
			desc = document.title;
		}
		linkStr = rootPath + window.location.pathname;
		imgUrl = window.location.origin + window.location.pathname.match(/^\/\S*\//g) + "share.jpg";
	}
	
	shareConfig(title, desc, linkStr, imgUrl);
}
// 分享配置
function shareConfig(title, desc, linkStr, imgUrl) {
	frameScript.ajax({
		url: interface_wxGetTicket,
		method: "POST",
		data: {
			url: window.location.href
		},
		success: function(response) {
			if(response.code == 1) {
				wx.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: appId, // 必填，公众号的唯一标识
					timestamp: response.data.timestamp, // 必填，生成签名的时间戳
					nonceStr: response.data.nonceStr, // 必填，生成签名的随机串
					signature: response.data.signature, // 必填，签名，见附录1
					jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'menuItem:share:appMessage', 'menuItem:share:timeline', 'menuItem:share:qq'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});
				wx.ready(function() {
					//分享到朋友圈
					wx.onMenuShareTimeline({
						title: title, // 分享标题
						link: linkStr, // 分享链接
						imgUrl: imgUrl, // 分享图标
						success: function() {
							// 用户确认分享后执行的回调函数
						},
						cancel: function() {
							// 用户取消分享后执行的回调函数
						}
					});
					//分享给朋友
					wx.onMenuShareAppMessage({
						title: title, // 分享标题
						desc: desc, // 分享描述
						link: linkStr, // 分享链接
						imgUrl: imgUrl, // 分享图标
						type: 'link', // 分享类型,music、video或link，不填默认为link
						dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
						success: function() {
							// 用户确认分享后执行的回调函数
						},
						cancel: function() {
							// 用户取消分享后执行的回调函数
						}
					});
				});
			} else {
				alert(response.message);
			}
		}
	});
}