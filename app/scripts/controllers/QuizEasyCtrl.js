'use strict';

/* @ngInject */
function QuizEasyCtrl($scope, $routeParams, ResourceFactory, $location) {
  $scope.resourceId = $routeParams.resourceId;
  ResourceFactory.getResource($routeParams.resourceId).then(function (resource) {
    $scope.resource = resource;
    $scope.quizzes = [
		resource.questions.easy
	];
  });
  $scope.pendingAnswers = function () {
    var pending = true;
	if(
	$scope.quizzes) {
    $scope.quizzes.forEach(function (quiz) {
      pending = pending && quiz.selectedAnswer.length;
    });}
    return !pending;
  };
  $scope.submit = function () {
	var allAnswersCorrect = true;
    $scope.quizzes.forEach(function (quiz) {
		var thisAnswerCorrect = (quiz.answers.Answer1 == quiz.selectedAnswer);
		allAnswersCorrect = allAnswersCorrect && thisAnswerCorrect;
	});
	if (allAnswersCorrect) {
		$location.url('resource-win/' + $scope.resourceId);
	} else {
		$location.url('resource-fail/' + $scope.resourceId);
	}
  };
}

angular.module('hackyRacesApp')
  .controller('QuizEasyCtrl', QuizEasyCtrl);