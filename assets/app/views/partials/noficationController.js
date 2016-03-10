
	angular.module('app').controller('notificationController', function($scope, $http, dashboardFactory) {
		/*************  DATABASE QUERY ****************/
		$scope.trainings = [];
		dashboardFactory.upcomingTrainings().then(function(response) {
			$scope.trainings = response.data;
		});
	});
