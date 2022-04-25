// ユーザープールの設定
const poolData = {
    UserPoolId : 'ap-northeast-1_zsO2kiQWE',//ユーザープールID
    ClientId : '9323puao85m77uetr2kiututs' //ｌクライアントID
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
// 属性情報
var attributeList = []; 
 

$(document).ready(function() {
		
	// Amazon Cognito 認証情報プロバイダーの初期化
	AWSCognito.config.region = 'ap-northeast-1';  // リージョン
	AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
	    IdentityPoolId: 'ap-northeast-1:5fb958f6-d504-4def-9ef0-a741e5d4bfd1' //プールＩＤ
	});
		    
	// 「Create Account」ボタン押下時
	$("#createAccount").click(function(event) {
	    signUp();
	});
});
 
/**
 * サインアップ処理。
 */
var signUp = function() {
			
	// ユーザ名（メールアドレス）・パスワードの格納
	var username = $("#email").val();
	var password = $("#password").val();
			
	// いずれかが空白ならば終了
    if (!username | !password) { 
    	return false; 
    }
		    
		// サインアップ処理
        userPool.signUp(username, password, attributeList,null, function(err, result){
	    if (err) {
			// エラーの場合警告を出して終了
	    	alert(err);
			return;
	    } else {
	      	
	    }
    });
}