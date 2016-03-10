	
	angular.module('app').controller('directoryController', function($scope, trainingFactory){
		$scope.januaryTrainings = [];
		$scope.februaryTrainings = [];
		$scope.marchTrainings = [];
		$scope.aprilTrainings = [];
		$scope.mayTrainings = [];
		$scope.juneTrainings = [];
		$scope.julyTrainings = [];
		$scope.augustTrainings = [];
		$scope.septemberTrainings = [];
		$scope.octoberTrainings = [];
		$scope.novemberTrainings = [];
		$scope.decemberTrainings = [];
		
		for (var i = 1; i <= 12; i++) {
			if (i == 1) {
				trainingFactory.getTrainingsByMonth(i).then(function(response) {
					if (response.data.returnValue == null) {
						$scope.januaryTrainings = response.data;
					}
					else {
						$scope.januaryTrainings = [];
					}
				});
			}
			else if (i == 2) {
				trainingFactory.getTrainingsByMonth(i).then(function(response) {
					if (response.data.returnValue == null) {
						$scope.februaryTrainings = response.data;
					}
					else {
						$scope.februaryTrainings = [];
					}
				});
			}
			else if (i == 3) {
				trainingFactory.getTrainingsByMonth(i).then(function(response) {
					if (response.data.returnValue == null) {
						$scope.marchTrainings = response.data;
					}
					else {
						$scope.marchTrainings = [];
					}
				});
			}
			else if (i == 4) {
				trainingFactory.getTrainingsByMonth(i).then(function(response) {
					if (response.data.returnValue == null) {
						$scope.aprilTrainings = response.data;
					}
					else {
						$scope.aprilTrainings = [];
					}
				});
			}
			else if (i == 5) {
				trainingFactory.getTrainingsByMonth(i).then(function(response) {
					if (response.data.returnValue == null) {
						$scope.mayTrainings = response.data;
					}
					else {
						$scope.mayTrainings = [];
					}
				});
			}
			else if (i == 6) {
				trainingFactory.getTrainingsByMonth(i).then(function(response) {
					if (response.data.returnValue == null) {
						$scope.juneTrainings = response.data;
					}
					else {
						$scope.juneTrainings = [];
					}
				});
			}
			else if (i == 7) {
				trainingFactory.getTrainingsByMonth(i).then(function(response) {
					if (response.data.returnValue == null) {
						$scope.julyTrainings = response.data;
					}
					else {
						$scope.julyTrainings = [];
					}
				});
			}
			else if (i == 8) {
				trainingFactory.getTrainingsByMonth(i).then(function(response) {
					if (response.data.returnValue == null) {
						$scope.augustTrainings = response.data;
					}
					else {
						$scope.augustTrainings = [];
					}
				});
			}
			else if (i == 9) {
				trainingFactory.getTrainingsByMonth(i).then(function(response) {
					if (response.data.returnValue == null) {
						$scope.septemberTrainings = response.data;
					}
					else {
						$scope.septemberTrainings = [];
					}
				});
			}
			else if (i == 10) {
				trainingFactory.getTrainingsByMonth(i).then(function(response) {
					if (response.data.returnValue == null) {
						$scope.octoberTrainings = response.data;
					}
					else {
						$scope.octoberTrainings = [];
					}
				});
			}
			else if (i == 11) {
				trainingFactory.getTrainingsByMonth(i).then(function(response) {
					if (response.data.returnValue == null) {
						$scope.novemberTrainings = response.data;
					}
					else {
						$scope.novemberTrainings = [];
					}
				});
			}
			else {
				trainingFactory.getTrainingsByMonth(i).then(function(response) {
					if (response.data.returnValue == null) {
						$scope.decemberTrainings = response.data;
					}
					else {
						$scope.decemberTrainings = [];
					}
				});
			}
		}
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	