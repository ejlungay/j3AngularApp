	
	angular.module('app').controller('attendanceController', function($scope, $modal, trainingFactory, delegateFactory){
		
		$scope.training_name = '';
		$scope.training_date = '';
		$scope.training_location = '';
		$scope.isSearchEnabled = false;
		
		$scope.trainingList = [];
		trainingFactory.getTrainings().then(function(response) {
			$scope.trainingList = response.data;
		});
		
		$scope.delegateList = [];
		$scope.loadTrainingDelegates = function() {
			$scope.isSearchEnabled = true;
			delegateFactory.getTrainingDelegatesUsingTrainingId($scope.training_id).then(function(response) {
				if (response.data.returnValue == null) {
					$scope.delegateList = response.data;
					
					var trainingID_values = [];
					var trainingTitles_values = [];
					var fromDate_values = [];
					var toDate_values = [];
					var location = [];
					for(var i = 0; i < $scope.trainingList.length; i++){
						var obj = $scope.trainingList[i];
						for(var key in obj){
							var attrName = key;
							var attrValue = obj[key];
							if (attrName == 'training_id') trainingID_values.push(attrValue);
							if (attrName == 'course_name') trainingTitles_values.push(attrValue); 
							if (attrName == 'from_date') fromDate_values.push(attrValue);
							if (attrName == 'to_date') toDate_values.push(attrValue);
							if (attrName == 'location') location.push(attrValue);
						}
					}
					for (var i = 0; i < trainingID_values.length; i++) {
						if (trainingID_values[i] === $scope.training_id) {
							$scope.training_name = trainingTitles_values[i];
							
							if (fromDate_values[i] == toDate_values[i]) $scope.training_date = fromDate_values[i];
							
							else $scope.training_date = fromDate_values[i] + ' - ' + toDate_values[i];
							
							$scope.training_location = location[i];
							break;
						}
					}
				}
				else {
					$scope.delegateList = [];
					$scope.training_name = '';
					$scope.training_date = '';
					$scope.training_location = '';
				}
			});
		}
		
		$scope.removeRow = function(index) {
			$scope.delegateList.splice(index, 1);	
		}
	});