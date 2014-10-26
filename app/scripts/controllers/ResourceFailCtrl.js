'use strict';

function ResourceFailCtrl($scope, ResourceFactory, $routeParams) {
    $scope.resourceId = $routeParams.resourceId;
    ResourceFactory.getResource($scope.resourceId).then(function(resource){
        $scope.resource = resource;
    });
}

angular.module('hackyRacesApp')
  .controller('ResourceFailCtrl', ResourceFailCtrl);
