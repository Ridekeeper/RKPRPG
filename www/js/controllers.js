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


  /* This should be changed to get the ids from index.html instead of hardcoding them here */
  const pageNames = ['vehicles-stolen', 'profile', 'vehicles', 'settings'];

  for (var i = 0; i < pageNames.length; i++) {
    var pageName = pageNames[i];

    if (Ridekeeper.highlightedPage == pageName) {
      $('#sidebar-' + pageName).addClass("active-button");
    } else {
      $('#sidebar-' + pageName).removeClass("active-button");
    }

    /* Create the function to be called when a menu button is pressed */
    var setCurPage = function(p) {
      return function() {
        Ridekeeper.highlightedPage = p;
      };
    }(pageName);

    $('#sidebar-' + pageName).click(setCurPage);
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
