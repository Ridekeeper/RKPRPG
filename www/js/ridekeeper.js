angular.module('ridekeeper', []);

function ridekeeper() {

  this.deviceready = false;

  this.user = new user();

  this.parse = new parse();

  this.login = new login();

  this.registration = new registration();

  this.profile = new profile();
 
  this.highlightedPage = "vehicles-stolen";
}

var Ridekeeper = new ridekeeper();

