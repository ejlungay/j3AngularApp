	
	angular.module('app').controller('participantController', function($scope, $modal, trainingFactory, delegateFactory){
		
		$scope.trainingList = [];
		$scope.loadTrainingList = function() {
			trainingFactory.getTrainings().then(function(response) {
				if (response.data.length > 0) {
					$scope.trainingList = response.data;
					$scope.trainingList.push({"training_id":"0", "course_name":"Show All Participants"});
				}
				else $scope.trainingList = [];

			});
		}
		$scope.loadTrainingList();

		$scope.delegateList = [];
		$scope.loadTrainingDelegates = function() {
			
			if ($scope.training_id == 0 || $scope.training_id == null) {
				delegateFactory.showAllDelegates().then(function(response) {
					if (response.data.returnValue == null || response.data.returnValue == undefined) {
						if (response.data.length > 0) {
							$scope.delegateList = response.data;
						}
						else {
							$scope.delegateList = [];
						}
						
					}
					else {
						$scope.delegateList = [];
					}
				});
			}
			else {
				delegateFactory.getTrainingDelegatesUsingTrainingId($scope.training_id).then(function(response) {
					if (response.data.returnValue == null || response.data.returnValue == undefined) {
						if (response.data.length > 0) {
							$scope.delegateList = response.data;
						}
						else {
							$scope.delegateList = [];
						}
					}
					else {
						$scope.delegateList = [];
					}
				});
			}
		}
		$scope.loadTrainingDelegates();

		$scope.add = function() {
			var modalInstance = $modal.open({
			templateUrl: 'assets/app/views/participants/addParticipantModalView.html',
			controller: 'addParticipantModalController',
			size: '',
			resolve: {
			  trainingId: function () {
				return 0;
			  }
			}
			});
		}
		
		$scope.showParticipantProfile = function(delegateId) {
			var modalInstance = $modal.open({
				templateUrl: 'assets/app/views/participants/delegateProfileModalView.html',
				controller: 'delegateProfileModalController',
				size: 'lg',
				resolve: {
				  delegateId: function () {
					return delegateId;
				  }
				}
			});
		}

		$scope.printForm = function(delegateId) {
			var modalInstance = $modal.open({
				templateUrl: 'assets/app/views/participants/printParticipantFormView.html',
				controller: 'printParticipantFormController',
				size: 'lg',
				resolve: {
				  delegateId: function () {
					return delegateId;
				  },
				  trainingId: function () {
					return $scope.training_id;
				  }
				}
			});
		}
	
	});