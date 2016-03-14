	
	angular.module('app').controller('printDirectoryController', function($scope, $state, $stateParams, delegateFactory) {
		//alert($stateParams.training_id);

		$scope.participants = [];
		delegateFactory.getTrainingDelegatesUsingTrainingId($stateParams.training_id).then(function(response) {
			console.log(response.data);
			if (response.data.length > 0) {
				$scope.participants = response.data;
			}
			else {
				$scope.participants = [];
			}
		});
	});