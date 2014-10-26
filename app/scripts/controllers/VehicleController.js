'use strict';

angular.module('hackyRacesApp')
  .controller('VehicleCtrl', function ($scope, VehicleFactory, UserFactory) {
    UserFactory.getCurrentUser().then(function (user) {
      VehicleFactory.getVehicleForUser(user).then(function (v) {
        $scope.vehicle = v;
      });
    });
    $scope.getVehicleName = function () {
      return 'name';
    };
    $scope.getStage = function () {
      return 0;
    };
    $scope.getImage = function () {
      return 'url';
    };
  });