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
  
  if (intervalId != null){
    clearInterval(intervalId);
    intervalId = null;
  }

}

angular.module('ridekeeper.controllers', [])

  .controller('MenuCtrl', function($scope) {
     menuControl($scope);
  })
  .controller('MapCtrl', function($scope) {
     menuControl($scope);
     mapInitialize();
  })
  .controller('ProfileCtrl', function($scope) {
     menuControl($scope);
     Ridekeeper.profile.initialize();
  })
  .controller('StolenCtrl', function($scope) {
     menuControl($scope);
     stolenInitialize();
  })
  .controller('VehiclesCtrl', function($scope) {
     menuControl($scope);
     vehiclesInitialize();
  })
  .controller('LoginCtrl', function($scope) {
     menuControl($scope);
     Ridekeeper.login.initialize();
     snapper.disable();
  })
  .controller('RegistrationCtrl', function($scope) {
     menuControl($scope);
     Ridekeeper.registration.initialize();
     snapper.disable();
  })
  .controller('NewVehicleCtrl', function($scope) {
     menuControl($scope);
     newVehicle.initialize();
  })

  // That's all folks
  ;
