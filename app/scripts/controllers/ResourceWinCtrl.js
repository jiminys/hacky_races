'use strict';


/* @ngInject */
function ResourceWinCtrl($scope) {
  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];
}

angular.module('hackyRacesApp')
  .controller('ResourceWinCtrl', ResourceWinCtrl);