'use strict';

/* @ngInject */
function NavController($scope, $mdSidenav, simpleLogin, UserFactory) {
  $scope.toggleMenu = function () {
    $mdSidenav('mainNav').toggle();
  };
  $scope.isLoggedIn = function () {
    return $scope.displayName.length > 0;
  };
  $scope.logout = function () {
    simpleLogin.logout();
  };
  UserFactory.getCurrentUser().then(function (user) {
    if (user) {
      $scope.displayName = user.displayName;
    } else {
      $scope.displayName = '';
    }
  });
}

angular.module('hackyRacesApp')
  .controller('NavController', NavController);