//app.js
App({
  onLaunch: function () {

    //获取当前时间戳  
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    console.log("当前时间戳为：" + timestamp);

    var baiduyun = wx.getStorageSync("baiduyun_AccessToken");
    console.log(baiduyun.access_token + " " + baiduyun.expires_in);

    if (baiduyun.access_token == "" || baiduyun.access_token == null || baiduyun.expires_in == "" || baiduyun.expires_in == null || baiduyun.expires_in < timestamp){
    wx.request({
      url: "https://caozha.com/api/xcx/baiduyun/AccessToken_get.php",
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        //"Content-Type":"application/json"
        //'content-type': 'application/x-www-form-urlencoded'
      }, // 设置请求的 header

      success: function (res) {
        console.info(res.data);
        wx.setStorageSync("baiduyun_AccessToken", res.data);
      },
      fail: function (res) {
        // fail
        wx.showModal({
          title: "提示",
          content: "获取AccessToken出错，程序可能无法正常运行。",
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
            } else if (res.cancel) {
            }
          }
        })
      },
      complete: function (res) {
        // complete
      }
    });
    }
      },
  globalData: {
    userInfo: null
  }
})