function login() {

  this.initialize = function() {
    // Set the highlighted page because we have no sidebar
    Ridekeeper.highlightedPage = 'login';
    // Register sign in callback
    $('#login-button').click(function(){Ridekeeper.login.login()});
    // Register registration callback
    $('#register-button').click(function(){Ridekeeper.login.goToRegistration()});
  }

  this.login = function() {
    var username = $('#login-user').val();
    var password = $('#login-pass').val();
    Ridekeeper.user.login(username, password);
  }

  this.goToRegistration = function() {
    window.location.hash = 'registration';
  }

}