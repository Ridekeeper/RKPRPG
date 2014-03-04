function registration() {

  this.initialize = function() {
    // Set the highlighted page because we have no sidebar
    Ridekeeper.highlightedPage = 'registration';
    // Register sign in callback
    //$('#registration-button').click(function(){Ridekeeper.registration.register()});
    // Register registration callback
    $('#register-button').click(function(){Ridekeeper.registration.goToLogin()});
  }

  this.register = function() {
    
  }

  this.goToLogin = function() {
    window.location.hash = 'login';
  }

}