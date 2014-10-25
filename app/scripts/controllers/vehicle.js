'use strict';

angular.module('hackyRacesApp')
  .controller('VehicleCtrl', function ($scope, VehicleFactory) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
      $scope.vehicle =  VehicleFactory.get('id');
  });
