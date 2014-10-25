'use strict';

function QuizEasyCtrl($scope) {
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];
}

angular.module('hackyRacesApp')
  .controller('QuizEasyCtrl', QuizEasyCtrl);

