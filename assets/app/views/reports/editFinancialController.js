	
	angular.module('app').controller('editFinancialController', function($scope, $modalInstance, trainingId) {

		$scope.ok = function () {
		  $modalInstance.close();
		};

		$scope.cancel = function () {
		  $modalInstance.dismiss('cancel');
		};
	}); 