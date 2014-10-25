

app.factory('ContestantsService', ['$firebase', function ($firebase) {
    var ref = new Firebase('https://ng-leaderboard.firebaseio.com/contestants/');
    var contestants = $firebase(ref);

    contestants.$on('loaded', function(){
        // console.log('contestants', contestants);
    })

    var getContestants = function() {
        return contestants;
    }

    var addContestant = function (contestant) {
        contestants.$add(contestant);
    };

    var updateContestant = function (id) {
        contestants.$save(id);
    };

    var removeContestant = function (id) {
        contestants.$remove(id);
    };

    return {
        getContestants: getContestants,
        addContestant: addContestant,
        updateContestant: updateContestant,
        removeContestant: removeContestant
    }
}]);

function ResourceService($firebase){
  var resourcesRef = new Firebase('https://hacky-races.firebaseio.com/resources');
  var resources = $firebase(resourcesRef);
  var api = {
    getResource: function(id){

    },
    addResource: function(resource){},
    saveResource: function(resource){},
    removeResource: function(resource){},
  };
  return api;
}