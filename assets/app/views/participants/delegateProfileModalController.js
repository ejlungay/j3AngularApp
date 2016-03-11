
	angular.module('app').controller('delegateProfileModalController', function($scope, $modalInstance) {
		

		$scope.ok = function() {
			$modalInstance.close();
		}
	});