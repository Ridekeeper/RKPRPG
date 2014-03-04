
angular.module('myApp', ['ngRoute', 'ridekeeper', 'snap', 'ridekeeper.controllers']).
  config(['$routeProvider', function($routeProvider) {
    'use strict';
    $routeProvider
      .when('/vehicles-stolen', {
        templateUrl: 'partials/vehicles-stolen.html',
        controller: 'StolenCtrl'
      })
      .when('/profile', {
        templateUrl: 'partials/profile.html',
        controller: 'ProfileCtrl'
      })
      .when('/vehicles', {
        templateUrl: 'partials/vehicles.html',
        controller: 'VehiclesCtrl'
      }) 
      .when('/settings', {
        templateUrl: 'partials/settings.html',
        controller: 'MenuCtrl'
      })
       .when('/vehicle-map', {
        templateUrl: 'partials/vehicle-map.html',
        controller: 'MapCtrl'
      })
       .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({redirectTo: '/vehicles-stolen'});
  }]);
