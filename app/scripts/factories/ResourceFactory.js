


/* @ngInject */
function ResourceFactory($firebase, $q, FBURL) {

    var fb = new Firebase(FBURL);

//    var ref = new Firebase('https://hacky-races.firebaseio.com/resources/');
//    var fire = $firebase(ref);
//    var resources = fire.$asArray();
    var loadingUser = $q.defer();

    var api = {
        getResource: function (id) {
            var loadingUser = $q.defer();
            fb.child('resources').child(id).once('value', function (ss) {
                loadingUser.resolve(ss.val());
            });
            return loadingUser.promise;
        }
    };
    return api;

};

angular.module('hackyRacesApp')
    .factory('ResourceFactory', ResourceFactory);
