'use strict';

function ResourceCtrl($scope, ResourceFactory, $routeParams, $location) {
    $scope.resourceId = $routeParams.resourceId;
        ResourceFactory.getResource($scope.resourceId).then(function(resource){
            $scope.resource = resource;
        });
    $scope.submit = function(path){
        $location.url(path + $scope.resourceId);
    }
}

angular.module('hackyRacesApp')
  .controller('ResourceCtrl', ResourceCtrl);
