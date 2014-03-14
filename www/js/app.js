
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
        controller: 'SettingsCtrl'
      })
       .when('/vehicle-map', {
        templateUrl: 'partials/vehicle-map.html',
        controller: 'MapCtrl'
      })
       .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      })
       .when('/registration', {
        templateUrl: 'partials/registration.html',
        controller: 'RegistrationCtrl'
      })
       .when('/new-vehicle', {
        templateUrl: 'partials/new-vehicle.html',
        controller: 'NewVehicleCtrl'
      })
       .when('/track', {
        templateUrl: 'partials/track.html',
        controller: 'TrackCtrl'
      })
      .otherwise({redirectTo: '/login'});
  }]);

  // Do the initial PhoneGap init
  
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
      document.addEventListener('deviceready', app.onDeviceReady, false);
      window.setTimeout( app.onDeviceReady, 5000 );
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
      angular.bootstrap(document, ['myApp']);

       // register for push notifications
       if (typeof parsePlugin != 'undefined' )
      {
        var clientKey = "obFmxyzaxx6JWMVMtXpaggDFu2TcARRMqyFQdYpP";
        var appId     = "TfBH3NJxzbOaxpksu5YymD4lP9bPlytcfZMG8i5a";  

        parsePlugin.initialize(appId, clientKey, function() {
          console.log('OK: Initialized parse plugin');
        }, function(e) {
          console.log('ERROR: Failed to initialize parse plugin');
        });

        parsePlugin.subscribe('phonegap', function() {
          console.log('OK: Subscribed to push notificiations');
        }, function(e) {
          console.log('ERROR: Failed to subscribe to push notifications');
        });
      } else {
        console.log('ERROR: Could not register for push notifications');
      }
    }
};
