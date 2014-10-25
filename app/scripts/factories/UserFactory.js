'use strict';

/* @ngInject */
function UserFactory($firebaseSimpleLogin, FBURL) {
    var fb = new Firebase(FBURL);
    var ref = $firebaseSimpleLogin(fb);
    ref.$getCurrentUser().then(function (user) {
        fb.child('users').child(user.uid).set(user);
    });
    return {};
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