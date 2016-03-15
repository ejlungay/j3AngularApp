	
	angular.module('app').controller('editFinancialController', function($scope, $modalInstance, toastr, trainingId, trainingFactory) {

		$scope.data = {};

		$scope.ok = function () {
			$scope.data.training_id = trainingId;
			trainingFactory.add_training_expense($scope.data).then(function(response) {
				if (response.data.returnValue == 'SUCCESS') {
					toastr.success(response.data.returnMessage);
					$modalInstance.close();
				}
				else {
					toastr.error(response.data.returnMessage);
				}
			});
		};

		$scope.cancel = function () {
		  $modalInstance.dismiss('cancel');
		};
	}); 