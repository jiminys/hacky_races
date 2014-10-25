'use strict';

/* @ngInject */
function VehicleFactory($firebase, $q, UserFactory) {

    var vehiclesRef = new Firebase('https://hacky-races.firebaseio.com/vehicles');
    var vehicles = $firebase(vehiclesRef).$asArray();

    var api = {
        getVehicleForUser: function (user) {
            var deferred = $q.defer();
            UserFactory.getUser(user.uid).child('vehicleId').once('value', function (v) {
                if (v.val()) {
                    var vId = v.val();
                    var vehicle = vehicles.$getRecord(vId);
                    deferred.resolve(vehicle);
                } else {
                    var vehicle = {
                        'name': 'foo',
                        'stage': 0,
                        'parts': {
                            'engine': {
                                "level": 0
                            },
                            'wheels': {
                                "level": 0
                            },
                            'body': {
                                "level": 0
                            },
                            'steering': {
                                "level": 0
                            }
                        }
                    };
                    api.addVehicle(vehicle).then(function (vehicle) {
                        UserFactory.saveUserData('vehicleId', vehicle.$id);
                        deferred.resolve(vehicle);
                    });
                }
            });
            return deferred.promise;
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