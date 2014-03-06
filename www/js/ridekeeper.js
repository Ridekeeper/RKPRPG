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

  this.highlightedPage = "vehicles-stolen";

  this.currentPage = "vehicle-stolen";

}

var Ridekeeper = new ridekeeper();

