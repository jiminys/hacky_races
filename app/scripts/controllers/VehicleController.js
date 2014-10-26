'use strict';

angular.module('hackyRacesApp')
  .controller('VehicleCtrl', function ($scope, VehicleFactory, UserFactory, ResourceFactory) {
    UserFactory.getCurrentUser().then(function (user) {
      VehicleFactory.getVehicleForUser(user).then(function (v) {
        VehicleFactory.calculateUserPoints(v);
        $scope.vehicle = v;
        for (var pi in v.parts) {
          var p = v.parts[pi];
          p.active = false;
          for (var ri in p.resources) {
            var r = p.resources[ri];
            (function (res) {
              ResourceFactory.getResource(res.id).then(function (resource) {
                res.value = resource;
              });
            }(r));
          }
        }
      });
      $scope.getVehicleName = function () {
        return 'name';
      };
      $scope.getStage = function () {
        return 0;
      };
      $scope.getImage = function (name) {
        return 'img/parts/' + name + '-1-silhouette.png';
      };
      $scope.toggle = function (part) {
        part.active = !part.active;
      };
    });
  });