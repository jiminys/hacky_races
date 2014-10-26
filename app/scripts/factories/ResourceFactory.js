


/* @ngInject */
function ResourceFactory($firebase, $q, FBURL) {

    var fb = new Firebase(FBURL);

    var resourcesRef = new Firebase('https://hacky-races.firebaseio.com/resources');
    var resources = $firebase(resourcesRef).$asArray();
//    var resources = fire.$asArray();
    var loadingBitly;

    var api = {
        getResource: function (id) {
            var loadingUser = $q.defer();
            fb.child('resources').child(id).once('value', function (ss) {
                loadingUser.resolve(ss.val());
            });
            return loadingUser.promise;
        },
        getBitly: function (bitly) {
             loadingBitly = $q.defer();


            resources.$loaded().then(function (array) {
                array.forEach(function (r) {
                    if (r.bitly === bitly) {
                        loadingBitly.resolve(r.uuid);
                    }
                });
            });
            return loadingBitly.promise;
        }
    };
    return api;

};

angular.module('hackyRacesApp')
    .factory('ResourceFactory', ResourceFactory);
