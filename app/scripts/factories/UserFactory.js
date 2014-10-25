'use strict';

/* @ngInject */
function VehicleFactory($firebase) {
    var vehiclesRef = new Firebase('https://hacky-races.firebaseio.com/vehicles');
    var vehicles = $firebase(vehiclesRef).$asArray();

    var api = {
        getVehicle: function (id) {
            return vehicles.$get(id);
        },
        addVehicle: function (vehicle) {
            vehicles.$add(vehicle);
        },
        saveVehicle: function (vehicle) {
            vehicles.$save(vehicle.id);
        },
        removeVehicle: function (vehicle) {
            vehicles.$remove(vehicle.id);
        }
    };
    return api;
}

angular.module('hackyRacesApp')
    .factory('VehicleFactory', VehicleFactory);