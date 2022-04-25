// ユーザープールの設定
const poolData = {
    UserPoolId : 'ap-northeast-1_zsO2kiQWE',
    ClientId : '9323puao85m77uetr2kiututs'
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
 
/**
 * 画面読み込み時の処理
 */
$(document).ready(function() {
 
	// Amazon Cognito 認証情報プロバイダーの初期化
	AWSCognito.config.region = 'ap-northeast-1'; // リージョン
	AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
	    IdentityPoolId: 'ap-northeast-1:5fb958f6-d504-4def-9ef0-a741e5d4bfd1'
	});
		    
	// 「Sign In」ボタン押下時
	$("#signinButton").click(function(event) {
		signIn();
	});
});
 
/**
 * サインイン処理
 */
var signIn = function() {
    // メールアドレス・パスワードの格納
    var email = $('#email').val();
    var password = $('#password').val();
    
    // いずれかが空白ならば終了
    if (!email | !password) { 
    	alert("メールアドレスまたはパスワードを入力してください");
    	return false; 
    }
    
    // 認証データの作成
    var authenticationData = {
        Username: email,
        Password: password
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    
    var userData = {
        Username: email,
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    
    // 認証処理
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            var idToken = result.getIdToken().getJwtToken();          // IDトークン
            var accessToken = result.getAccessToken().getJwtToken();  // アクセストークン
            var refreshToken = result.getRefreshToken().getToken();   // 更新トークン
            
            //console.log("idToken : " + idToken);
            //console.log("accessToken : " + accessToken);
            //console.log("refreshToken : " + refreshToken);
            
            // サインイン成功の場合、お絵描き画面へ遷移
            location.href= "toppage.html";
            
        },
 
        onFailure: function(err) {
            // サインイン失敗の場合、エラーメッセージを表示
            alert("ログインに失敗しました");
        }
    });
};