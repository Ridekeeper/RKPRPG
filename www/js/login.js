function login() {

  this.initialize = function() {
    // Register sign in callback
    $('#login-button').click(function(){Ridekeeper.login.login()});
    // Register registration callback
    $('#register-button').click(function(){Ridekeeper.login.goToRegistration()});
  }

  this.login = function() {
    alert('test login');
  }

  this.goToRegistration = function() {
    window.location.hash = 'profile';
  }

}