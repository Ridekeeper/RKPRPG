
angular.module('myApp', ['ngRoute', 'demo', 'snap', 'myApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
    'use strict';
    $routeProvider
      .when('/ex-options', {
        templateUrl: 'partials/ex-options.html',
        controller: 'ExOptionsCtrl'
      })
      .otherwise({redirectTo: '/ex-options'});
  }]);
