	
	angular.module('app').controller('financialController', function($scope, $state, $modal, $stateParams, delegateFactory, trainingFactory) {
		//alert($stateParams.training_id);

		$scope.trainingList = [];
		$scope.loadTrainingList = function() {
			trainingFactory.getTrainings().then(function(response) {
				if (response.data.length > 0) {
					$scope.trainingList = response.data;
				}
				else $scope.trainingList = [];

			});
		}
		$scope.loadTrainingList();

		$scope.delegateList = [];
		$scope.loadTrainingDelegates = function() {
			if ($scope.training_id == null) return;


			delegateFactory.getTrainingDelegatesUsingTrainingId($scope.training_id).then(function(response) {
				console.log(response.data);
				if (response.data.returnValue == null || response.data.returnValue == undefined) {
					$scope.delegateList = response.data;
				}
				else {
					$scope.delegateList = [];
				}
			});
		}

		$scope.edit = function() {
			var modalInstance = $modal.open({
				templateUrl: 'assets/app/views/reports/editFinancialView.html',
				controller: 'editFinancialController',
				size: 'sm',
				resolve: {
				  trainingId: function () {
					return $scope.training_id;
				  }
				}
			});
		}
	});