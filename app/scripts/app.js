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
    .when('/quiz-easy', {
      authRequired: false,
      templateUrl: 'views/quiz-easy.html',
      controller: 'QuizEasyCtrl'
    })
    .when('/quiz-medium', {
      authRequired: false,
      templateUrl: 'views/quiz-medium.html',
      controller: 'QuizMediumCtrl'
    })
    .when('/quiz-hard', {
      authRequired: false,
      templateUrl: 'views/quiz-hard.html',
      controller: 'QuizHardCtrl'
    })
    .when('/quiz-hard-lobby', {
      authRequired: false,
      templateUrl: 'views/quiz-hard-lobby.html',
      controller: 'QuizHardLobbyCtrl'
    })
    .when('/resource', {
      authRequired: false,
      templateUrl: 'views/resource.html',
      controller: 'ResourceCtrl'
    })
    .when('/resource-fail', {
      authRequired: false,
      templateUrl: 'views/resource-fail.html',
      controller: 'ResourceFailCtrl'
    })
    .when('/resource-pvpfail', {
      authRequired: false,
      templateUrl: 'views/resource-pvpfail.html',
      controller: 'ResourcePvpFailCtrl'
    })
    .when('/resource-win', {
      authRequired: false,
      templateUrl: 'views/resource-win.html',
      controller: 'ResourceWinCtrl'
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