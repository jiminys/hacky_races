'use strict';

angular.module('hackyRacesApp')
  .controller('VehicleCtrl', function ($scope, VehicleFactory, UserFactory) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

      $scope.user = UserFactory.getCurrentUser();
        if (user.getVehicleId() === null) {
            return;
        } else {
            $scope.vehicle =  VehicleFactory.getVehicle(user.getVehicleId());
        }

  });
