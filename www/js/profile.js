function profileInitialize() {
	var User = new user();
	User.getCurrentUser("pTdEjZaFFF", function userInfo (parseUser) {
		var username = parseUser.username;
		var email = parseUser.email;
		var phone = parseUser.phone;
		$("#username").append(username);
		$("#email").append(email);
		$("#phone").append(phone);

	})
}