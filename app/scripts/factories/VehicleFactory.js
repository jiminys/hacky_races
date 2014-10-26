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
                                "level": 0,
								"resources": {
									"piston": {
										"rating": 0,
										"pointsMultiplier": 40,
										"level": 1
									},
									"combustion": {
										"rating": 0,
										"pointsMultiplier": 50,
										"level": 1
									},
									"diesel": {
										"rating": 0,
										"pointsMultiplier": 80,
										"level": 2
									}
								}
                            },
                            'wheels': {
                                "level": 0,
								"resources": {
									"chains": {
										"rating": 0,
										"pointsMultiplier": 50,
										"level": 1
									},
									"axle": {
										"rating": 0,
										"pointsMultiplier": 100,
										"level": 2
									}
								}
                            },
                            'body': {
                                "level": 0,
								"resources": {
									"windTunnel": {
										"rating": 0,
										"pointsMultiplier": 30,
										"level": 1
									},
									"aerodynamics": {
										"rating": 0,
										"pointsMultiplier": 40,
										"level": 1
									},
									"sleekDesign": {
										"rating": 0,
										"pointsMultiplier": 130,
										"level": 2
									}
								}
                            },
                            'steering': {
                                "level": 0,
								"resources": {
									"steeringWheel": {
										"rating": 0,
										"pointsMultiplier": 60,
										"level": 1
									},
									"transmission": {
										"rating": 0,
										"pointsMultiplier": 70,
										"level": 2
									}
								}
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