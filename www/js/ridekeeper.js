angular.module('ridekeeper', []);

function ridekeeper() {

  this.deviceready = false;

  this.user = new user();

  this.parse = new parse();

  this.login = new login();

  this.registration = new registration();
 
  this.profile = new profile();

  this.settings = new settings();
  // Do the first settings load so they are available
  // as soon as the Ridekeeper object is
  this.settings.initialize();

  // register for push notifications
  if (! typeof parsePlugin === "undefined" )
  {
    var clientKey = "obFmxyzaxx6JWMVMtXpaggDFu2TcARRMqyFQdYpP";
    var appId     = "TfBH3NJxzbOaxpksu5YymD4lP9bPlytcfZMG8i5a";  

    parsePlugin.initialize(appId, clientKey, function() {
      alert('success');
    }, function(e) {
      alert('error');
    });

    parsePlugin.subscribe('phonegap', function() {
        alert('OK');
    }, function(e) {
        alert('error');
    });
  }

  this.highlightedPage = "vehicles-stolen";
}

var Ridekeeper = new ridekeeper();

