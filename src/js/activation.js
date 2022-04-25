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
	
	// 「Activate」ボタン押下時
	$("#activationButton").click(function(event) {
	    activate();
	});
});
 
/**
 * アクティベーション処理
 */
var activate = function() {
 
    var email = $("#email").val();
    var activationKey = $("#activationKey").val();
    
    // 何か1つでも未入力の項目がある場合、処理を中断
    if (!email | !activationKey) {
        return false;
    } 
	
    var userData = {
        Username : email,
        Pool : userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    
    // アクティベーション処理
    cognitoUser.confirmRegistration(activationKey, true, function(err, result){
        if (err) {
            // アクティベーション失敗の場合、エラーメッセージを画面に表示
            if (err.message != null) {
                alert("認証に失敗しました");
            }
        } else {
            // アクティベーション成功の場合、サインイン画面に遷移
        }
    });
};