
	var selectedCourseId = 0;
	  
	angular.module('app').controller('trainingsController',  function($scope, $http, $modal, toastr, trainingFactory) {
		$scope.trainingList = [];
		trainingFactory.getTrainings().then(function(response) {
			if (response.data.length > 0) {
				$scope.trainingList = response.data;
			}
			else {
				$scope.trainingList = [];
			}
		});
		
		$scope.openAddTrainingModal = function() {
			window.location = 'home#/app/training/add-training';
		}

		$scope.edit = function(trainingId) {
			var modalInstance = $modal.open({
			templateUrl: 'assets/app/views/trainings/editTrainingView.html',
			controller: 'editTrainingController',
			size: '',
			resolve: {
			  trainingId: function () {
				return trainingId;
			  }
			}
			});
		}

		$scope.about = function(trainingId) {
			var modalInstance = $modal.open({
			templateUrl: 'assets/app/views/trainings/aboutTrainingView.html',
			controller: 'aboutTrainingController',
			size: '',
			resolve: {
			  trainingId: function () {
				return trainingId;
			  }
			}
			});
		}
	});

	  
	  
	  
	  
	  
	  