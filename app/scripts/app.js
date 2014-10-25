'use strict';

angular.module('hackyRacesApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'firebase',
  'angularfire.firebase',
  'angularfire.login',
  'simpleLoginTools',
  'ngMaterial'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/vehicle', {
          templateUrl: 'views/vehicle.html',
          controller: 'VehicleCtrl'
      })
      .when('/login', {
        authRequired: false,
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
