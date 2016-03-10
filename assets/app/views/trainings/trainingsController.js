
	var selectedCourseId = 0;
	  
	angular.module('app').controller('trainingsController',  function($scope, $http, $modal, toastr, trainingFactory) {
		$scope.trainingList = [];
		trainingFactory.getTrainings().then(function(response) {
			console.log(response.data);
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
	});

	  
	  
	  
	  
	  
	  