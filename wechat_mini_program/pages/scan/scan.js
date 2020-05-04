/*
☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
☆                                                                                                 ☆
☆  系 统：AI智能识物                                                                               ☆
☆  日 期：2019-07                                                                                 ☆
☆  开 发：草札(www.caozha.com)                                                                    ☆
☆  鸣 谢：穷店(www.qiongdian.com) 品络(www.pinluo.com)                                             ☆
☆  声 明: 使用本程序源码必须保留此版权声明等相关信息！                                                ☆
☆  Copyright ©2020 www.caozha.com All Rights Reserved.                                            ☆
☆                                                                                                 ☆
☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
*/
Page({
  data: {},
    PlantDetect: function(n) {
      
      var baiduyun = wx.getStorageSync("baiduyun_AccessToken");

      var o = n.currentTarget.id;

      let that = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "compressed" ],
            sourceType: [ o ],
          success: function (res) {
              var img_file = res.tempFilePaths[0];
            wx.setStorageSync("res_imgurl", img_file);
            console.log("上传时："+res.tempFilePaths[0]) //最终图片路径

            //-----返回选定照片的本地文件路径列表，获取照片信息-----------
            wx.showLoading({
              title: "正在识别，请稍候"
            }),wx.getImageInfo({
            src: img_file,
            success: res_1 => {
                //---------利用canvas压缩图片--------------
                var ratio = 2;
                var canvasWidth = res_1.width //图片原始长宽
                var canvasHeight = res_1.height
                while (canvasWidth > 500 || canvasHeight > 500) { // 保证宽高在400以内
                    canvasWidth = Math.trunc(res_1.width / ratio)
                    canvasHeight = Math.trunc(res_1.height / ratio)
                    ratio++;
                }

                //----------绘制图形并取出图片路径--------------
                var ctx = wx.createCanvasContext('canvas')
                ctx.drawImage(res_1.path, 0, 0, canvasWidth, canvasHeight)
                ctx.draw(false, setTimeout(function() {
                    wx.canvasToTempFilePath({
                        canvasId: 'canvas',
                        destWidth: canvasWidth,
                        destHeight: canvasHeight,
                        success: res_2 => {
                            console.log("压缩后："+res_2.tempFilePath) //最终图片路径
                            console.log("宽："+canvasWidth+" 高："+canvasHeight) //最终图片路径
                          /*  
                            wx.getImageInfo({
                              src: res_2.tempFilePath,
                              success: res_3 => {
                              }})
*/


              wx.getFileSystemManager().readFile({
                filePath: res_2.tempFilePath, //选择图片返回的相对路径
                encoding: 'base64', //编码格式
                success: res_last => { //成功的回调
                  
                  console.log('data:image/png;base64,' + res_last.data);
                  //Base64编码字符串，以图片文件形式请求时必填。(支持图片格式：jpg，bmp，png，jpeg)，图片大小不超过4M。最短边至少15px，最长边最大4096px。注意：图片需要base64编码、去掉编码头后再进行urlencode。

                  wx.cloud.callFunction({
                    name: "caozha_ai_shiwu",
                    data: {
                        base64: res_last.data,
                    }
                }).then((res2) => {
                    console.log('imgSecCheck =', res2)
                    try{

                      if (res2.result.result.errCode == 0) {

                        // 图片合法
                      wx.request({
                        //开发文档https://cloud.baidu.com/doc/IMAGERECOGNITION/ImageClassify-API.html#.E8.AF.B7.E6.B1.82.E8.AF.B4.E6.98.8E
                        url: "https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general?access_token=" + baiduyun.access_token,
                        data: { image: res_last.data, baike_num:20 },
                        dataType: 'text',//不对返回的内容进行 JSON.parse
                        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                        header: {
                          //"Content-Type":"application/json"
                          'content-type': 'application/x-www-form-urlencoded'
                        }, // 设置请求的 header
    
                        success: function (res) {                      
    
                          var res_data = res.data;
    
                          //var res_data = res.data.toString();//强制转换为字符串
                          //res_data.replace('http:', 'https:');
                          //res_data = JSON.parse(res_data);
    
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


                      }else{


                        // 图片非法
                      wx.showModal({
                        title: "错误提示",
                        content: "选择的图片有非法内容，请重新选个图片再试。",
                        showCancel: false,
                        success: function (res) {
                          if (res.confirm) {
                          } else if (res.cancel) {
                          }
                        }
                      })
                      
                      }

                    }catch(err){

                      // 图片非法
                      wx.showModal({
                        title: "错误提示",
                        content: "选择的图片有非法内容，请重新选个图片再试。",
                        showCancel: false,
                        success: function (res) {
                          if (res.confirm) {
                          } else if (res.cancel) {
                          }
                        }
                      })

                    }

                })



                }
              })

              //以下为同步方法
              //let base64 = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], 'base64') 
              //console.log(base64)

 



                        },
                        fail: res => {
                            console.log(res.errMsg)
                        }
                    })
                }, 100))
            }, //留一定的时间绘制canvas
            fail: res => {
                console.log(res.errMsg)
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
