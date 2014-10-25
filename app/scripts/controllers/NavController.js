'use strict';

/* @ngInject */
function NavController($scope, $mdSidenav, simpleLogin) {
  $scope.toggleMenu = function () {
    $mdSidenav('mainNav').toggle();
  };
  $scope.isLoggedIn = function () {
    simpleLogin.logout();
  };
  $scope.logout = function () {
    simpleLogin.logout();
  };
}

angular.module('hackyRacesApp')
  .controller('NavController', NavController);