'use strict';

function ResourceFailCtrl($scope, ResourceFactory, $routeParams, $location) {
    $scope.resourceId = $routeParams.resourceId;
    ResourceFactory.getResource($scope.resourceId).then(function(resource){
        $scope.resource = resource;
    });
    $scope.submit = function(){
        $location.url("/");
    }
}

angular.module('hackyRacesApp')
  .controller('ResourceFailCtrl', ResourceFailCtrl);
