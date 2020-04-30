Page({
  data: {},
    PlantDetect: function(n) {
      
      var baiduyun = wx.getStorageSync("baiduyun_AccessToken");

      var o = n.currentTarget.id;

      let that = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ o ],
          success: function (res) {
              var img_file = res.tempFilePaths[0];

            wx.setStorageSync("res_imgurl", img_file);

              wx.getFileSystemManager().readFile({
                filePath: img_file,
                encoding: 'base64', 
                success: res => {
                  
                  console.log('data:image/png;base64,' + res.data);                  

                  wx.showLoading({
                    title: "正在识别，请稍候"
                  }), wx.request({
                    //开发文档https://cloud.baidu.com/doc/IMAGERECOGNITION/ImageClassify-API.html#.E8.AF.B7.E6.B1.82.E8.AF.B4.E6.98.8E
                    url: "https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general?access_token=" + baiduyun.access_token,
                    data: { image: res.data, baike_num:20 },
                    dataType: 'text',
                    method: 'POST',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },

                    success: function (res) {                      

                      var res_data = res.data;

                      console.log("JSON:"+res_data);
                      //console.info(res_data);
                      wx.setStorageSync("res_data", res_data);
                      wx.navigateTo({
                        url: "../info/info"
                      });
                    },
                    fail: function (res) {
                      // fail
                      wx.showModal({
                        title: "提示",
                        content: "获取出错，请重试",
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
                      wx.hideLoading();
                    }
                  });


                }
              })

                
            }
        });
    },
  banquan: function () {
    wx.navigateToMiniProgram({
      appId: 'wx9588ff2d3063ee31',
      path: '',
      envVersion: 'release',
      success(res) {
        // 打开成功
      }
    })
  },
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});