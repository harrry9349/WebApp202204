// ユーザープールの設定
// const poolData = {
//   UserPoolId : 'ap-northeast-1_zsO2kiQWE', //ユーザープールID
//   ClientId : '9323puao85m77uetr2kiututs' //ｌクライアントID
//  };
//  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
//  const cognitoUser = userPool.getCurrentUser();  // 現在のユーザー
 
//  let currentUserData = {};  // ユーザーの属性情報
 
//  const stanpname = [];
'use strict';
 // 変数宣言
 const cnvWidth = 1500;
 const cnvHeight = 500;
 let cnvColor = "255, 0, 0, 1";  // 線の色
 let cnvBold = 5;  // 線の太さ
 let cnvStanp = 0;  // スタンプ番号
 let clickFlg = 0;  // クリック中の判定 1:クリック開始 2:クリック中
 let modeDraw = 0;  // 0:描画モード 1:スタンプモード
 let bgColor = "rgb(255,255,255)";
// キャンバス定義
 let cnvs = document.getElementById('board');
 let ctx = cnvs.getContext('2d');

 window.onload = ()=>{
  // キャンバスに画像を置く(始点X,始点Y,長さ,高さ)
  // ①
  const circle_1 = new Image();
  circle_1.src="./img/circle_1.png"
  circle_1.onload = ()=>{
  ctx.drawImage(circle_1, 50, 50, 50, 50);  
  };
  // ②
  const circle_2 = new Image();
  circle_1.src="./img/circle_2.png"
  circle_2.onload = ()=>{
  ctx.drawImage(circle_2, 860, 50, 50, 50);  
  };
  // ③
  const circle_3 = new Image();
  circle_3.src="./img/circle_3.png"
  circle_3.onload = ()=>{
  ctx.drawImage(circle_3, 50, 375, 50, 50);  
  };
  // ④
  const circle_4 = new Image();
  circle_4.src="./img/circle_4.png"
  circle_4.onload = ()=>{
  ctx.drawImage(circle_4, 860, 375, 50, 50);  
  };
  // 縦中央線
  const line_center = new Image();
  line_center.src="./img/line_center.png"
  line_center.onload = ()=>{
  ctx.drawImage(line_center, 810, 0, 5, 650);  
  };
  // 横中央線
  const line_middle = new Image();
  line_middle.src="./img/line_middle.png"
  line_middle.onload = ()=>{
  ctx.drawImage(line_middle, 0, 325, 1650, 5);  
  };
 };
 
 
 
 
 // canvasの背景色を設定(指定がない場合にjpeg保存すると背景が黒になる)
 setBgColor();
 
 // canvas上でのイベント
 $("#canvas").mousedown(function(){
 // マウス押下開始
   clickFlg = 1; 
   console.log("clickFlg=" + clickFlg);
 }).mouseup(function(){
 // マウス押下終了
   clickFlg = 0; 
 }).mousemove(function(e){
 // マウス移動処理
   if(!clickFlg) return false;
   draw(e.offsetX, e.offsetY);
 });
 // 描画処理
 function draw(x, y) {
 
   if(modeDraw == 0){
   // スタンプモード
  let stanp = new Image();
  // スタンプ読み込み
  stanp.src=stanpname[cnvStanp];
  // スタンプ配置
  stanp.onload = ()=>{
  ctx.drawImage(stanp, x, y, 50, 50);  
  };
   }else{
   // 描画モード
  ctx.lineWidth = cnvBold;
  ctx.strokeStyle = 'rgba('+cnvColor+')';
  // 初回処理の判定
  if (clickFlg == "1") {
    clickFlg = "2";
    ctx.beginPath();
    //　線を角丸にする
    ctx.lineCap = "round";  
    ctx.moveTo(x, y);
   } else {
    ctx.lineTo(x, y);
   }
    ctx.stroke();
   }
 
 };
 
 // 色の変更
 $(".color a").click(function(){
    modeDraw = 0;
    cnvColor = $(this).data("color");
    return false;
 });
 
 // 線の太さ変更
 $(".bold a").click(function(){
   cnvBold = $(this).data("bold");
   return false;
 });
 
 // スタンプ変更
 $(".stanp a").click(function(){
   modeDraw = 1;
   cnvSatnp = $(this).data("stanp");
   return false;
 });
 
 // 描画クリア
 $("#clear").click(function(){
   ctx.clearRect(0,0,cnvWidth,cnvHeight);
   setBgColor();
 });
 
 // canvasを画像で保存
 $("#download").click(function(){
   canvas = document.getElementById('canvas');
   var base64 = canvas.toDataURL("image/jpeg");
   document.getElementById("download").href = base64;
 });
 
 function setBgColor(){
   // canvasの背景色を設定(指定がない場合にjpeg保存すると背景が黒になる)
   ctx.fillStyle = bgColor;
   ctx.fillRect(0,0,cnvWidth,cnvHeight);
 }
 
 const getUserAttribute = function(){
  
  // 現在のユーザー情報が取得できている場合
  if (cognitoUser != null) {
   cognitoUser.getSession(function(err, session) {
    if (err) {
     console.log(err);
     $(location).attr("href", "index.html");
    } else {
     // ユーザの属性を取得
     cognitoUser.getUserAttributes(function(err, result) {
      if (err) {
       $(location).attr("href", "index.html");
      }
      
      // 取得した属性情報を連想配列に格納
      for (i = 0; i < result.length; i++) {
       currentUserData[result[i].getName()] = result[i].getValue();
      }
 
     });
    }
   });
  } else {
   //1000秒経過したらログアウト
   $(location).attr("href", "index.html");
  }
};
