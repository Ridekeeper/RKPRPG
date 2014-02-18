
angular.module('myApp', ['ngRoute', 'ridekeeper', 'snap', 'ridekeeper.controllers']).
  config(['$routeProvider', function($routeProvider) {
    'use strict';
    $routeProvider
      .when('/nav', {
        templateUrl: 'partials/nav.html',
        controller: 'MenuCtrl'
      })
      .when('/vehicles-stolen', {
        templateUrl: 'partials/vehicles-stolen.html',
        controller: 'MenuCtrl'
      })
      .when('/profile', {
        templateUrl: 'partials/profile.html',
        controller: 'MenuCtrl'
      })
      .when('/vehicles', {
        templateUrl: 'partials/vehicles.html',
        controller: 'MenuCtrl'
      }) 
      .when('/settings', {
        templateUrl: 'partials/settings.html',
        controller: 'MenuCtrl'
      })
       .when('/vehicle-map', {
        templateUrl: 'partials/vehicle-map.html',
        controller: 'MenuCtrl'
      })
      .otherwise({redirectTo: '/nav'});
  }]);
