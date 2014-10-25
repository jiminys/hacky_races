'use strict';

/* @ngInject */
function UserFactory($firebase) {
    var curentUser = null;
    var ref = new Firebase("https://hacky-races.firebaseio.com");
    ref.onAuth(function (authData) {
        if (authData) {
            var userData = ref.child('users').child(authData.uid);
            if (!userData.child('uid')) {
                userData.set(authData);
            }
            // save the user's profile into Firebase so we can
            // list users, use them in security rules, and show profiles
            ref.child('users').child(authData.uid).set(authData);
        }
        curentUser = authData;
    });
    return {
        getCurrentUser: function () {
            return curentUser;
        }
    }
}

angular.module('hackyRacesApp')
    .factory('UserFactory', UserFactory);