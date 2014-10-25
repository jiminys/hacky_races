'use strict';

function QuizHardLobbyCtrl($scope) {
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];
}

angular.module('hackyRacesApp')
  .controller('QuizHardLobbyCtrl', QuizHardLobbyCtrl);
