	
	angular.module('app').controller('eventInfoModalController', function($scope, $modalInstance, id) {
		$scope.id = id;
		$scope.ok = function () {
		  $modalInstance.close();
		};

		$scope.cancel = function () {
		  $modalInstance.dismiss('cancel');
		};
	}); 