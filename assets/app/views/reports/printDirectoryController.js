	
	angular.module('app').controller('printDirectoryController', function($scope, $state, $stateParams, delegateFactory, ReportingService) {
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

		$scope.print = function() {
			alert();
		  	var divToPrint = document.getElementById('printDiv');
            ReportingService.printData(divToPrint);
        }
	});