'use strict';

/* @ngInject */
function QuizEasyCtrl($scope, $routeParams, ResourceFactory, $location) {
  $scope.resourceId = $routeParams.resourceId;
  ResourceFactory.getResource($routeParams.resourceId).then(function (resource) {
    $scope.resource = resource;
    $scope.quizzes = [
		resource.questions.easy
	,
	{
      'question': 'foo question',
      'answers': [
        'Answer 1', 'Answer 2', 'Answer 3'
      ],
      'answer': ''
    }, {
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
	var allAnswersCorrect = true;
    $scope.quizzes.forEach(function (quiz) {
		var thisAnswerCorrect = (quiz.correctAnswer === 1) || (quiz.answer === "Answer 1");
		allAnswersCorrect = allAnswersCorrect && thisAnswerCorrect;
	});
	if (allAnswersCorrect) {
		console.log("win!");
		$location.url('resource-win/' + $scope.resourceId);
	} else {
		console.log("loes");
		$location.url('resource-fail/' + $scope.resourceId);
	}
  };
}

angular.module('hackyRacesApp')
  .controller('QuizEasyCtrl', QuizEasyCtrl);