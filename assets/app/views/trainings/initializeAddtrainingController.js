
	angular.module('app').controller('iniTrainingViewsController', function($scope, $modal) {
		$scope.addTraining = function() {
			var modalInstance = $modal.open({
			templateUrl: 'assets/app/views/trainings/addTrainingModalView.html',
			controller: 'addTrainingModalController',
			size: '',
			resolve: {
			  id: function () {
				return $scope.id;
			  }
			}
			});
		}
		
		$scope.useExisting = function() {
			var modalInstance = $modal.open({
			templateUrl: 'assets/app/views/trainings/addTrainingScheduleView.html',
			controller: 'addTrainingScheduleController',
			size: '',
			resolve: {
			  id: function () {
				return $scope.id;
			  }
			}
			});
		}
	});