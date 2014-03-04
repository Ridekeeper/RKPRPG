angular.module('ridekeeper', []);

function ridekeeper() {

  this.user = new user();

  this.parse = new parse();

  this.login = new login();
 
  this.highlightedPage = "vehicles-stolen";
}

var Ridekeeper = new ridekeeper();

