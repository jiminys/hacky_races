'use strict';

/* @ngInject */
function UserFactory($firebaseSimpleLogin, FBURL, $q, $rootScope) {
    var fb = new Firebase(FBURL);
    var ref = $firebaseSimpleLogin(fb);
    var loadingUser = $q.defer();
    $rootScope.$on('$firebaseSimpleLogin:login', function (e, user) {
        fb.child('users').child(user.uid).once('value', function (ss) {
            if (ss.val() === null) {
                fb.child('users').child(user.uid).set(user);
            }
            loadingUser.resolve(user);
        });
    });
    $rootScope.$on('$firebaseSimpleLogin:logout', function (e, user) {
        loadingUser = $q.defer();
    });
    return {
        getCurrentUser: function () {
            var deferred = $q.defer();
            $q.all([ref.$getCurrentUser(), loadingUser]).then(function (results) {
                deferred.resolve(results[0]);
            });
            return deferred.promise;
        },
        getUser: function (id) {
            return fb.child('users').child(id);
        },
        saveUserData: function (key, value) {
            this.getCurrentUser().then(function (user) {
                fb.child('users').child(user.uid).child(key).set(value);
            });
        }
    };
}

angular.module('hackyRacesApp')
    .factory('UserFactory', UserFactory);