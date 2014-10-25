'use strict';

/* @ngInject */
function VehicleFactory() { //$firebase){
    var vehicles = {
        1: {
            'name': 'Micahs Mega Falafel',
            'status': '20'
        },
        2: {
            'name': 'Falafel King',
            'status': '30'
        }
    };
    // var vehiclesRef = new Firebase('https://hacky-races.firebaseio.com/vehicles');
    // var vehicles = $firebase(vehiclesRef);
    var api = {
        getVehicle: function(id) {
            return vehicles[id];
        },
        addVehicle: function(vehicle) {
            vehicles[vehicle.id] = vehicle;
        },
        saveVehicle: function(vehicle) {
            vehicles[vehicle.id] = vehicle;
        },
        removeVehicle: function(vehicle) {
            delete vehicles[vehicle.id];
        },
    };
    return api;
}

angular.module('hackyRacesApp')
    .controller('VehicleFactory', VehicleFactory);