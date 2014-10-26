'use strict';

/* @ngInject */
function QuizEasyCtrl($scope, $routeParams, ResourceFactory, $location) {
  $scope.resourceId = $routeParams.resourceId;
  ResourceFactory.getResource($routeParams.resourceId).then(function (resource) {
    $scope.resource = resource;
    $scope.quizzes = [{
      'number': '1',
      'question': 'foo question',
      'answers': [
        'Answer 1', 'Answer 2', 'Answer 3'
      ],
      'answer': ''
    }, {
      'number': '2',
      'question': 'foo question',
      'answers': [
        'Answer 1', 'Answer 2', 'Answer 3'
      ],
      'answer': ''
    }];
  });
  $scope.pendingAnswers = function () {
    var pending = true;
    $scope.quizzes.forEach(function (quiz) {
      pending = pending && quiz.answer.length;
    });
    return !pending;
  };
  $scope.submit = function () {
    console.log('foo');
    $location.url('resource-win/' + $scope.resourceId);
  };
}

angular.module('hackyRacesApp')
  .controller('QuizEasyCtrl', QuizEasyCtrl);