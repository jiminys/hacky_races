'use strict';

angular.module('hackyRacesApp')
  .controller('VehicleCtrl', function ($scope, VehicleFactory, UserFactory, ResourceFactory, $mdDialog, $location) {

    $scope.bitLyUrl = null;

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
      $scope.getPartImage = function (name) {
        return 'img/parts/' + name + '-2-unlocked.png';
      };
      $scope.getResourceImage = function (id) {
        return 'img/resources/' + id + '.jpg';
      };
      $scope.toggle = function (part) {
        part.active = !part.active;
      };
        $scope.openDialog = function($event) {
            $mdDialog.show({
                targetEvent: $event,
                controller: 'VehicleCtrl',
                template:
                    '<md-dialog> <div class="dialog-content"> <md-text-float label="Enter the bit.ly code here" ng-model="bitLyUrl"  > </md-text-float></div> <div><md-button class="md-button-raised md-button-colored" ng-click="closeDialog()">Submit Address</md-button></div> </md-dialog>'
            });
        };
        $scope.closeDialog = function() {
            for (var pi in $scope.vehicle.parts) {
                var p = $scope.vehicle.parts[pi];
                for (var ri in p.resources) {
                    var r = p.resources[ri];

                    ResourceFactory.getBitly().then(function(bitly){
                        console.log(bitly + ' '+ $scope.bitLyUrl);
                    });

                }
            }
        };
    });
  });