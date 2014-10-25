'use strict';

angular.module('hackyRacesApp')
  .controller('VehicleCtrl', function ($scope, VehicleFactory, UserFactory) {
    UserFactory.$getCurrentUser().then(function (user) {
      $scope.user = user;
      if ($scope.user.vehicleId) {
        $scope.vehicle = VehicleFactory.getVehicle($scope.user.vehicleId);
      } else {
        var vehicle = {
          'name': 'foo',
          'level': 0
        };
        VehicleFactory.addVehicle(vehicle).then(function (vehicle) {
          $scope.user.vehicleId = vehicle.$id;
          $scope.vehicle = vehicle;
          // UserFactory.saveCurrentUser();
        });
      }
    });
  });