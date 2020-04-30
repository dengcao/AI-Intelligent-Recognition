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
const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event) => {
  try {
    let result = '';
    if(event.content){
     result =  await cloud.openapi.security.msgSecCheck({
        content: event.content
      });
    }else if(event.base64){
      result = await cloud.openapi.security.imgSecCheck({
        media: {
          contentType: 'image/png',
          value: Buffer.from(event.base64, 'base64')
        }
      })
    }
    return {
      result
    }
  } catch (error) {
    return {
      error
    }
  }
}