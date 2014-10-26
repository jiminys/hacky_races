'use strict';

function TeamsCtrl($scope, $q, UserFactory) {
    $scope.createTeamName = null;
    $scope.retrieveTeamName = null;

    

    $scope.createTeam = function(){
        console.log($scope.createTeamName);
    }
    $scope.retrieveTeam = function(){
        console.log($scope.retrieveTeamName);
    }
}

angular.module('hackyRacesApp')
  .controller('TeamsCtrl', TeamsCtrl);
