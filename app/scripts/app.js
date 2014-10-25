'use strict';

var app = angular.module('hackyRacesApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'firebase',
  'angularfire.firebase',
  'angularfire.login',
  'simpleLoginTools',
  'ngMaterial'
]);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      authRequired: true,
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

app.factory('AuthService', function ($rootScope, $firebaseSimpleLogin) {
  var currentUser = null;
  var loginService = $firebaseSimpleLogin(new Firebase('https://hacky-races.firebaseio.com'));

  var getCurrentUser = function () {
    return currentUser || loginService.$getCurrentUser();
  };

  var login = function (email, password) {
    loginService.$login('password', {
      email: email,
      password: password
    });
  };

  var logout = function () {
    loginService.$logout();
  };

  var register = function (email, password) {
    loginService.$createUser(email, password);
  };

  $rootScope.$on('$firebaseSimpleLogin:login', function (e, user) {
    currentUser = user;
    $rootScope.$broadcast('onLogin');
  });

  $rootScope.$on('$firebaseSimpleLogin:logout', function (e) {
    currentUser = null;
    $rootScope.$broadcast('onLogout');
  });

  $rootScope.$on('$firebaseSimpleLogin:error', function (e, err) {
    currentUser = null;
    $rootScope.$broadcast('onLogout');
  });

  return {
    getCurrentUser: getCurrentUser,
    login: login,
    logout: logout,
    register: register
  }
});