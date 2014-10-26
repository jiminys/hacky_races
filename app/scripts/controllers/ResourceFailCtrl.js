'use strict';

function ResourceFailCtrl($scope) {
    ResourceFactory.getResource('00837626-1765-4569-b458-f5ac821c3d47').then(function(resource){
        $scope.resource = resource;
    });
}

angular.module('hackyRacesApp')
  .controller('ResourceFailCtrl', ResourceFailCtrl);
