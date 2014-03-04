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

  // That's all folks
  ;
