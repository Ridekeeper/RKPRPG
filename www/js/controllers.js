
angular.module('ridekeeper.controllers', [])

  .controller('MenuCtrl', function($scope) {
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
  })

  // That's all folks
  ;
