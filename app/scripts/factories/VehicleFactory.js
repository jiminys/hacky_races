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
                        'name': '',
                        'stage': 0,
                        'parts': {
                            'engine': {
                                'id': 'C41C1A27-5550-4003-8E58-A7ABFF8EB045',
                                'name': 'Engine',
                                'level': 0,
                                'resources': {
                                    'piston': {
                                        'name': 'Piston',
                                        'id': '8d93917d-1ace-44c3-b234-ec2d57143d8f',
                                        'rating': 0,
                                        'pointsMultiplier': 40,
                                        'level': 1
                                    },
                                    'combustion': {
                                        'name': 'Combustion',
                                        'id': 'abf47952-6e01-4cb5-af60-d131161a4023',
                                        'rating': 0,
                                        'pointsMultiplier': 50,
                                        'level': 1
                                    },
                                    'diesel': {
                                        'name': 'Diesel',
                                        'id': 'f0856bdc-ed5f-4d43-ae46-3f61ff80d656',
                                        'rating': 0,
                                        'pointsMultiplier': 80,
                                        'level': 2
                                    }
                                }
                            },
                            'wheels': {
                                'id': '58424C57-AE96-4C48-9528-5B94D2C2936E',
                                'name': 'Wheels',
                                'level': 0,
                                'resources': {
                                    'chains': {
                                        'name': 'Chains',
                                        'id': 'f1488ea5-21fd-43df-b8fe-3360dbc6e75d',
                                        'rating': 0,
                                        'pointsMultiplier': 50,
                                        'level': 1
                                    },
                                    'axle': {
                                        'name': 'Axel',
                                        'id': '1883b1c6-b310-4186-a321-dd331a9645d0',
                                        'rating': 0,
                                        'pointsMultiplier': 100,
                                        'level': 2
                                    }
                                }
                            },
                            'body': {
                                'id': 'CA890AED-654D-4D5B-A694-83C18C2D1ADC',
                                'name': 'Body',
                                'level': 0,
                                'resources': {
                                    'windTunnel': {
                                        'name': 'WindTunnel',
                                        'id': '41fb940e-16a5-451f-8d1a-5d8d300867b1',
                                        'rating': 0,
                                        'pointsMultiplier': 30,
                                        'level': 1
                                    },
                                    'aerodynamics': {
                                        'name': 'Aerodynamics',
                                        'id': '7f585f6c-c66b-4c67-9f6f-a2e162a9e040',
                                        'rating': 0,
                                        'pointsMultiplier': 40,
                                        'level': 1
                                    },
                                    'sleekDesign': {
                                        'name': 'Sleek Design',
                                        'id': '15456b8d-a3b9-4734-bf71-24e5ee8e6acd',
                                        'rating': 0,
                                        'pointsMultiplier': 130,
                                        'level': 2
                                    }
                                }
                            },
                            'steering': {
                                'id': 'E5DAE60C-4826-4834-9404-E2C008A4D0D6',
                                'name': 'Steering',
                                'level': 0,
                                'resources': {
                                    'steeringWheel': {
                                        'name': 'Steering Wheel',
                                        'id': '0b1e15ea-4388-4f1a-a144-bad38e29bc63',
                                        'rating': 0,
                                        'pointsMultiplier': 60,
                                        'level': 1
                                    },
                                    'transmission': {
                                        'name': 'Transmission',
                                        'id': '1e838224-24a4-462c-91a4-b89361d163e1',
                                        'rating': 0,
                                        'pointsMultiplier': 70,
                                        'level': 2
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