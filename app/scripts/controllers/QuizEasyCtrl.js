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
      'answers': {
        'Answer1':'Answer 1', 'Answer2':'Answer 2', 'Answer3':'Answer 3'
      },
      'selectedAnswer': '',
	  'correctAnswer': 1
    }, {
      'question': 'foo question',
      'answers': {
        'Answer1':'Answer 1', 'Answer2':'Answer 2', 'Answer3':'Answer 3'
      },
      'selectedAnswer': '',
	  'correctAnswer': 1
    }];
  });
  $scope.pendingAnswers = function () {
    var pending = true;
    $scope.quizzes.forEach(function (quiz) {
      pending = pending && quiz.selectedAnswer.length;
    });
    return !pending;
  };
  $scope.submit = function () {
	var allAnswersCorrect = true;
    $scope.quizzes.forEach(function (quiz) {
		console.log("Start");
		console.log(quiz.answers.Answer1);
		console.log(quiz.selectedAnswer);
		console.log((quiz.answers.Answer1 == quiz.selectedAnswer));
		var thisAnswerCorrect = (quiz.answers.Answer1 == quiz.selectedAnswer);
		allAnswersCorrect = allAnswersCorrect && thisAnswerCorrect;
		console.log("thisAnswerCorrect: " + thisAnswerCorrect);
		console.log("allAnswersCorrect: " + allAnswersCorrect);
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