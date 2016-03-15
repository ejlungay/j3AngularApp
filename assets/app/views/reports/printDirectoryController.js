	
	angular.module('app').controller('printDirectoryController', function($scope, $state, $stateParams, $modal, delegateFactory, trainingFactory, ReportingService) {
		//alert($stateParams.training_id);

		$scope.basicData = {};

		$scope.participants = [];
		delegateFactory.getTrainingDelegatesUsingTrainingId($stateParams.training_id).then(function(response) {
			//console.log(response.data);
			if (response.data.length > 0) {
				$scope.participants = response.data;
			}
			else {
				$scope.participants = [];
			}
		});

		$scope.training = [];
		trainingFactory.trainingDetail($stateParams.training_id).then(function(response) {
			$scope.training = response.data;
			for(var i = 0; i < $scope.training.length; i++){
				var obj = $scope.training[i];
				for(var key in obj){
					var attrName = key;
					var attrValue = obj[key];
					if (attrName == 'location') $scope.basicData.location = attrValue;
					if (attrName == 'from_date') $scope.basicData.from_date = attrValue;
					if (attrName == 'to_date') $scope.basicData.to_date = attrValue;
				}
			}
		});

		$scope.print = function() {
			var modalInstance = $modal.open({
					templateUrl: 'assets/app/views/reports/printDirectoryModalView.html',
					controller: 'printDirectoryModalController',
					size: 'lg',
					resolve: {
					 	 data: function() {
					 	 	return $scope.participants;
					  	},
					  	basicData: function() {
					  		return $scope.basicData;
					  	}
					}
			});
        }
	});