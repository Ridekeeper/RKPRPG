/*
 * QuickBlox Web XMPP Chat sample
 * version 1.1.1
 *
 * Author: Andrey Povelichenko (andrey.povelichenko@quickblox.com)
 *
 */
var QBPARAMS = {
    app_id      : 5815,
    auth_key    : '8htqAuedCPgyW2z',
    auth_secret : '6whwzbRPrYSSbmg'
}
var storage, login, password, full_name, email, params, qbUser, avatarLink, connection, userJID, html, occupants;
/*
function(err, result){
		if (err) {
			//failure
			alert('userCreate(): ' + err.detail);
			console.log('userCreate(): ' + err.detail);
			signUpFailed();
		} else {
			//successful
		}
	}
*/
function sessionCreate(callback) {
	QB.init(QBPARAMS.app_id, QBPARAMS.auth_key, QBPARAMS.auth_secret);
	QB.createSession(callback);
}
/*
function(err, result){
		if (err) {
			//failure
			alert('userCreate(): ' + err.detail);
			console.log('userCreate(): ' + err.detail);
			signUpFailed();
		} else {
			//successful
		}
	}
*/
function userCreate(login,password,callback) {
	params = {login: login, password: password};
	QB.users.create(params, callback);
}

function userLogin(login,password,callback){
	params = {login: login, password: password};
	QB.login(params, callback);
}
