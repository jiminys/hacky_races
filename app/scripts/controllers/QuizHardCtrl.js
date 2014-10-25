'use strict';

function QuizHardCtrl($scope) {
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];
}

angular.module('hackyRacesApp')
  .controller('QuizHardCtrl', QuizHardCtrl);
