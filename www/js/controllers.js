/* Generic controller constructor for the all the pages */
function menuControl($scope) {
  'use strict';
  $scope.snapOpts = {
    disable: 'right',
    hyperextensible: false
  };

  $scope.disable = function(side) {
    $scope.snapOpts.disable = side;
  };

  $scope.enable = function() {
    $scope.snapOpts.disable = 'none';
  };
  
  // Stop the map on the vehicle page from updating
  if (intervalId != null){
    clearInterval(intervalId);
    intervalId = null;
  }
  oldPos = null;

}

function checkLoggedIn(){
    // redirect to login page if not authenticated
    var currentUser = Parse.User.current();
    if (!currentUser) {
      // go to login page
      window.location.hash = 'login';
    }
}

angular.module('ridekeeper.controllers', [])

  .controller('MenuCtrl', function($scope) {
     checkLoggedIn();
     menuControl($scope);
  })
  .controller('MapCtrl', function($scope) {
     checkLoggedIn();    
     menuControl($scope);
     Ridekeeper.currentPage = "vehicle-map";
     vehicleInfoInitialize();
  })
  .controller('ProfileCtrl', function($scope) {
     checkLoggedIn();    
     menuControl($scope);
     Ridekeeper.profile.initialize();
  })
  .controller('StolenCtrl', function($scope) {
     checkLoggedIn();    
     menuControl($scope);
     stolenInitialize();
  })
  .controller('VehiclesCtrl', function($scope) {
     checkLoggedIn();    
     menuControl($scope);
     vehiclesInitialize();
  })
  .controller('LoginCtrl', function($scope) {
     menuControl($scope);
     Ridekeeper.login.initialize();
     snapper.disable();
  })
  .controller('SettingsCtrl', function($scope) {
     checkLoggedIn();    
     menuControl($scope);
     Ridekeeper.settings.initialize();
  })
  .controller('RegistrationCtrl', function($scope) {
     menuControl($scope);
     Ridekeeper.registration.initialize();
     snapper.disable();
  })
  .controller('NewVehicleCtrl', function($scope) {
     checkLoggedIn();    
     menuControl($scope);
     Ridekeeper.currentPage = "new-vehicle";
     newVehicle.initialize();
  })

  // That's all folks
  ;
