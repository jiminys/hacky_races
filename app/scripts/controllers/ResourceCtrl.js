'use strict';

function ResourceCtrl($scope, ResourceFactory) {
    $scope.resource = ResourceFactory.getResource();
}

angular.module('hackyRacesApp')
  .controller('ResourceCtrl', ResourceCtrl);
