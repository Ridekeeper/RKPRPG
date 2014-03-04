function profileInitialize() {
	var User = new user();
	User.getCurrentUser("WXO7vi6gjq", function userInfo (parseUser) {
		var username = parseUser.username;
		var email = parseUser.email;
		var phone = parseUser.phone;
		$("#username").append(username);
		$("#email").append(email);
		$("#phone").append(phone);
		$("#phone").append(document.cookie);

	})
}