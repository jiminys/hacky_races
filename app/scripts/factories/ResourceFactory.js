


/* @ngInject */
function ResourceFactory($firebase) {

    var ref = new Firebase('https://hacky-races.firebaseio.com/resources/');
    var fire = $firebase(ref);
    var resources = fire.$asArray();

    var api = {
        getResource: function (id) {
            return resources.$getRecord('00837626-1765-4569-b458-f5ac821c3d47');
        }
    };
    return api;
};

angular.module('hackyRacesApp')
    .factory('ResourceFactory', ResourceFactory);
