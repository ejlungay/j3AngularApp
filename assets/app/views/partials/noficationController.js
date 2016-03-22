
	angular.module('app').controller('notificationController', function($scope, $http, dashboardFactory) {
		/*************  DATABASE QUERY ****************/
		$scope.trainings = [];
		dashboardFactory.upcomingTrainings().then(function(response) {
			$scope.trainings = response.data;
		});

		$scope.getTrainingFirstLetter = function(name) {
			if (name.length > 0) {
				return name.charAt(0);
			}
			return '*';
		}

		$scope.ifIsToday = function(date) {
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!
			var yyyy = today.getFullYear();
			
			if(dd<10) {
				dd='0'+dd
			} 
			if(mm<10) {
				mm='0'+mm
			} 
			today = yyyy + '-' + mm + '-' + dd; 
			if (today === date) {
				return true;
			}
			else {
				return false;
			}
		}

		$scope.showTodaysTraining = function(trainingId) {
			window.location = 'home#/app/training/todays-training?hellofromtheoutside=' + trainingId;
		}
	});
