


/* @ngInject */
function ResourceFactory($firebase, $q, FBURL) {

    var fb = new Firebase(FBURL);

//    var ref = new Firebase('https://hacky-races.firebaseio.com/resources/');
//    var fire = $firebase(ref);
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
        getBitly: function () {
             loadingBitly = $q.defer();
            fb.child('resources').child('0341884e-887f-410d-b65f-7e6e16968694').child('bitly').once('value', function (ss) {
                loadingBitly.resolve(ss.val());
            });
            return loadingBitly.promise;
        }
    };
    return api;

};

angular.module('hackyRacesApp')
    .factory('ResourceFactory', ResourceFactory);
