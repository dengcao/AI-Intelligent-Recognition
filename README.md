# AI智能识物

AI智能识物，是一款实用的小程序。可以拍照智能识物，可识别地标、车型、花卉、植物、动物、果蔬、货币、红酒、食材等等，AI智能技术识别准确度高。

### 更新说明：

此源码为1.2.0版本。

主要更新内容：新增security.imgSecCheck函数对用户上传的图片进行合法性安全检测。

支持本程序，请到Gitee和GitHub给我们点Star！

Gitee：https://gitee.com/dengzhenhua/AI-Intelligent-Recognition

GitHub：https://github.com/dengcao/AI-Intelligent-Recognition

### 安装方法

1、PHP端：

打开PHP后端目录/PHP/，找到config.php，修改为您的API信息，并将PHP代码上传到您的网站空间或者服务器。获得一个URL：http://xxxxx/AccessToken_get.php

2、小程序端：

①打开微信小程序目录/wechat_mini_program/，找到app.js，并找到代码：

url: "https://caozha.com/xxxxx/AccessToken_get.php",

将上面代码的URL替换为您网站的URL。

②在cloud_function目录，有一个云函数caozha_ai_shiwu。在微信开发者工具里，在文件夹caozha_ai_shiwu上点击右键，将此云函数上传并部署到您的小程序云端。

如果您没有开通微信小程序的云端开发，点击“云开发”开通。关于云函数：https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/functions.html

-----------------------

特别说明：采用PHP+小程序结合的方式，是因为百度API获取的Access Token有效期为1个月，时效足够长，用自己的服务器可以重复使用此Access Token，避免访问量大的时候频繁请求百度API而被拒绝。

### 版权所有

开发：邓草 www.5300.cn

鸣谢：品络 www.pinluo.com  &ensp;  汉语言文学网 www.hyywx.com  &ensp;  雄马 www.xiongma.cn

### 扫码体验
![输入图片说明](https://images.gitee.com/uploads/images/2020/0430/104457_0326c9b6_7397417.jpeg "小程序码")

### 界面预览

![输入图片说明](https://images.gitee.com/uploads/images/2020/0430/104726_cf775e8c_7397417.png "AI智能识物首页")
![输入图片说明](https://images.gitee.com/uploads/images/2020/0504/200311_1fa465ba_7397417.png "测试结果1")
![输入图片说明](https://images.gitee.com/uploads/images/2020/0504/200649_2f1b2f64_7397417.jpeg "测试结果2")
![输入图片说明](https://images.gitee.com/uploads/images/2020/0504/200702_72e4ba6f_7397417.jpeg "测试结果3")
