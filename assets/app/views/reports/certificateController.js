	
	angular.module('app').controller('certificateController', function($scope, $modal, $window, trainingFactory, delegateFactory){
		
		$scope.printAllEnabled = false;
		$scope.editMode = false;
		$scope.tid = 0;

		$scope.training_name = '';
		$scope.training_date = '';
		$scope.training_location = '';
		
		$scope.trainingList = [];
		trainingFactory.getTrainings().then(function(response) {
			$scope.trainingList = response.data;
		});
		
		$scope.delegateList = [];
		$scope.loadTrainingDelegates = function() {
			$scope.tid = $scope.training_id;
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

				$scope.editMode = true;

			});
		}
		
		$scope.checkCertificateDetail = function() {
			
		}

		$scope.printCertificate = function(del_id) {
			//$window.open('#/app/certificates/delegate-certificates/---' + del_id + ':' + $scope.training_id, '_blank');
			if (del_id === 'all') {
				var modalInstance = $modal.open({
					templateUrl: 'assets/app/views/reports/certificateModalView.html',
					controller: 'certificateModalController',
					size: 'lg',
					resolve: {
						  delegateId: function () {
							return del_id;
						  },
						  trainingId: function () {
							return $scope.training_id;
						  },
						  whatToPrint: function () {
							return 'all';
						 }
					}
				});
			}
			else {
				var modalInstance = $modal.open({
					templateUrl: 'assets/app/views/reports/certificateModalView.html',
					controller: 'certificateModalController',
					size: 'lg',
					resolve: {
						  delegateId: function () {
							return del_id;
						  },
						  trainingId: function () {
							return $scope.training_id;
						  },
						  whatToPrint: function () {
							return 'byDelegates';
						 }
					}
				});
			}
		}

		$scope.editTrainingDetail = function() {
			var modalInstance = $modal.open({
			templateUrl: 'assets/app/views/reports/editCertificateDetailModalView.html',
			controller: 'editCertificateDetailModalController',
			size: 'xs',
			resolve: {
				  trainingId: function () {
					return $scope.training_id;
				  }
				}
			});

			modalInstance.result.then(function(result) {
    			$scope.temp = document.cookie.split(';');
				$scope.username = '';
				if ($scope.temp != null) {
					for (var i = 0; i < $scope.temp.length; i++) {
						if ($scope.temp[i].indexOf("") > -1) {
							$scope.username = $scope.temp[i].split('=');
						}
					}
				}
			});
		}

		$scope.printAll = function() {
			 $window.open('#/app/certificates/delegate-certificates/' + $scope.training_id, '_blank');
		}
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	