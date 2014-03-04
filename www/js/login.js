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
    
  }

  this.goToRegistration = function() {
    window.location.hash = 'registration';
  }

}