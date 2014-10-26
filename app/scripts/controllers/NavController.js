'use strict';

/* @ngInject */
function NavController($scope, $mdSidenav, simpleLogin, $firebaseSimpleLogin, $rootScope, UserFactory) {
  $scope.isLoggedIn = false;
  $scope.toggleMenu = function () {
    $mdSidenav('mainNav').toggle();
  };
  $rootScope.$on('$firebaseSimpleLogin:login', function (e, user) {
    $scope.displayName = user.displayName;
    UserFactory.getTotalPoints(user.uid).then(function (value) {
      $scope.score = value;
    });
    $scope.isLoggedIn = true;
  });
  $rootScope.$on('$firebaseSimpleLogin:logout', function (e, user) {
    $scope.isLoggedIn = false;
    $scope.displayName = '';
  });
  $scope.logout = function () {
    simpleLogin.logout();
  };

}

angular.module('hackyRacesApp')
  .controller('NavController', NavController);