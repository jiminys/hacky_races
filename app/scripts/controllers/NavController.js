'use strict';

/* @ngInject */
function NavController($scope, $mdSidenav) {
  $scope.toggleMenu = function(){
    $mdSidenav('mainNav').toggle();
  };
}

angular.module('hackyRacesApp')
  .controller('NavController', NavController);