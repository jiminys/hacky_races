'use strict';

function ResourceFailCtrl($scope) {
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];
}

angular.module('hackyRacesApp')
  .controller('ResourceFailCtrl', ResourceFailCtrl);
