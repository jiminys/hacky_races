'use strict';

/* @ngInject */
function UserFactory($firebaseSimpleLogin, FBURL, $q, $rootScope) {
    var fb = new Firebase(FBURL);
    var ref = $firebaseSimpleLogin(fb);
    var loadingUser = $q.defer();
    $rootScope.$on('$firebaseSimpleLogin:login', function (e, user) {
        fb.child('users').child(user.uid).once('value', function (ss) {
            if (ss.val() === null) {
                console.log('writing user');
                fb.child('users').child(user.uid).set(user);
            } else {
                console.log('user exists');
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

// // let's create a re-usable factory that generates the $firebaseSimpleLogin instance
// app.factory("simpleLogin", ["$firebaseSimpleLogin",
//     function ($firebaseSimpleLogin) {
//         var ref = new Firebase("https://<your-firebase>.firebaseio.com/");
//         return $firebaseSimpleLogin(ref);
//     }
// ]);

// // and use it in our controller
// app.controller("SampleCtrl", ["$scope", "simpleLogin",
//     function ($scope, simpleLogin) {
//         $scope.auth = simpleLogin;
//     }
// ])