'use strict';

/* @ngInject */
function VehicleFactory($firebase, $q) {

    var vehiclesRef = new Firebase('https://hacky-races.firebaseio.com/vehicles');
    var vehicles = $firebase(vehiclesRef).$asArray();

    var api = {
        getVehicle: function (id) {
            return vehicles.$getRecord(id);
        },
        addVehicle: function (vehicle) {
            var deferred = $q.defer();
            vehicles.$add(vehicle).then(function (ref) {
                deferred.resolve(vehicles.$getRecord(ref.name()));
            });
            return deferred.promise;
        },
        removeVehicle: function (vehicle) {
            vehicles.$remove(vehicle.id);
        }
    };
    return api;
}

angular.module('hackyRacesApp')
    .factory('VehicleFactory', VehicleFactory);