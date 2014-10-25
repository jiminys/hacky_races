'use strict';

function QuizMediumCtrl($scope) {
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];
}

angular.module('hackyRacesApp')
  .controller('QuizMediumCtrl', QuizMediumCtrl);
