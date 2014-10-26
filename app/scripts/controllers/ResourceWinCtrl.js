'use strict';


/* @ngInject */
function ResourceWinCtrl($scope, ResourceFactory, $routeParams, $location, VehicleFactory, UserFactory) {
    $scope.resourceId = $routeParams.resourceId;
    ResourceFactory.getResource($scope.resourceId).then(function(resource){
        $scope.resource = resource;
    });
	UserFactory.getCurrentUser().then(function (user) {
      VehicleFactory.getVehicleForUser(user).then(function (v) {
			for (var pi in v.parts) {
				var p = v.parts[pi];
				for (var ri in p.resources) {
					var r = p.resources[ri];
					if (r.id == $scope.resourceId) {
						r.rating = 1;
					}
				}
			}
			VehicleFactory.saveVehicle(v);
		});
	});
	
    $scope.submit = function(){
        $location.url("/");
    }
}

angular.module('hackyRacesApp')
  .controller('ResourceWinCtrl', ResourceWinCtrl);