<?php
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

include 'config.php';
echo json_encode(getAccessToken($client_id,$client_secret));

function request_post($url = '', $param = '') {
        if (empty($url) || empty($param)) {
            return false;
        }
        
        $postUrl = $url;
        $curlPost = $param;
        $curl = curl_init();//初始化curl
        curl_setopt($curl, CURLOPT_URL,$postUrl);//抓取指定网页
        curl_setopt($curl, CURLOPT_HEADER, 0);//设置header
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);//要求结果为字符串且输出到屏幕上
        curl_setopt($curl, CURLOPT_POST, 1);//post提交方式
        curl_setopt($curl, CURLOPT_POSTFIELDS, $curlPost);
        $data = curl_exec($curl);//运行curl
        curl_close($curl);
        
        return $data;
    }


function get_php_file($filename) {
    return trim(substr(file_get_contents($filename), 15));
  }

function set_php_file($filename, $content) {
	  file_put_contents($filename,"<?php exit();?>" . $content);//写入配置文件
    /*$fp = fopen($filename, "w");
    fwrite($fp, "<?php exit();?>" . $content);
    fclose($fp);*/
  }


function getAccessToken($client_id,$client_secret) {
    // access_token 应该全局存储与更新，以下代码以写入到文件中做示例
    $data = json_decode(get_php_file("access_token.php"));
	
    if ($data->expire_time < time()) {
      $url = 'https://aip.baidubce.com/oauth/2.0/token';
    $post_data['grant_type']       = 'client_credentials';
    $post_data['client_id']      = $client_id;//你的 Api Key
    $post_data['client_secret'] = $client_secret;//你的 Secret Key
    $o = "";
    foreach ( $post_data as $k => $v ) 
    {
    	$o.= "$k=" . urlencode( $v ). "&" ;
    }
    $post_data = substr($o,0,-1);
    
    $res = request_post($url, $post_data);

$arr=json_decode($res,true);
    //var_dump($res);

//$accesstoken_arr=array("access_token"=>$arr["access_token"],"expires_in"=>$arr["expires_in"],"error"=>$arr["error"],"error_description"=>$arr["error_description"]);
//echo json_encode($dwz_arr);
		
     
      $access_token = $arr["access_token"];
	  $expires_in=time()+$arr["expires_in"];
      if ($access_token) {
        $data->expire_time = $expires_in;
        $data->access_token = $access_token;
        set_php_file("access_token.php", json_encode($data));
      }
    } else {
      $access_token = $data->access_token;
	  $expires_in=$data->expire_time;
    }
	
	$accesstoken_arr=array("access_token"=>$access_token,"expires_in"=>$expires_in);
    return $accesstoken_arr;
  }

	


