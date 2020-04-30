/*
☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
☆                                                                         ☆
☆  系 统：AI智能识物                                                        ☆
☆  日 期：2019-07                                                          ☆
☆  开 发：草札(www.caozha.com)                                              ☆
☆  鸣 谢：穷店(www.qiongdian.com) 品络(www.pinluo.com)                      ☆
☆  声 明: 使用本程序源码必须保留此版权声明等相关信息！                            ☆
☆  Copyright ©2020 www.caozha.com All Rights Reserved.                    ☆
☆                                                                         ☆
☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
*/
Page({
    data: {
      imgurl: "",
      itemData: []
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
    onLoad: function() {
        var res_imgurl = wx.getStorageSync("res_imgurl");
        var res_data = wx.getStorageSync("res_data");
         res_data.replace(RegExp("http", "g"), "https");
         res_data = JSON.parse(res_data);

      var itemData = res_data["result"];
        this.setData({
          imgurl: res_imgurl,
          itemData: itemData,
          result_num: res_data["result_num"]
        });
      for (var a = this.data.itemData, s = [], e = 0, o = a.length; e < o; e++) {
            var i = (100 * Number(a[e].score)).toFixed(2);
            s.push(i);
        }
        this.setData({
            score: s
        }), console.log(this.data.itemData);
        
    }
});