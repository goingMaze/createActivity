## 活动报名页配置脚本使用说明

1. 在当前目录执行node startServer.js

2. 浏览器打开当前ip地址，端口号8011，输入活动名称、活动微信分享时的标题和描述，点击创建活动，之后服务器返回活动创建结果
活动名称用英文，因为会依据活动名称来生成html、js文件以及配置相关接口调用文件
3. 活动涉及到的文件：

	文件 | 功能 
	:------------ :| :------------- :
	activityCommonSource/common.js| 配置接口
	activityCommonSource/commonTest.js| 配置接口(测试)
	activityCommonSource/enrollSuccess.js| 配置微信分享
	activity-1template/*|报名页模板文件

