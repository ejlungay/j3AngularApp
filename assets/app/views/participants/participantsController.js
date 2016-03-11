	
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
			if ($scope.training_id == null) return;
			
			if ($scope.training_id == 0) {
				delegateFactory.showAllDelegates().then(function(response) {
					if (response.data.returnValue == null || response.data.returnValue == undefined) {
						$scope.delegateList = response.data;
					}
					else {
						$scope.delegateList = [];
					}
				});
			}
			else {
				delegateFactory.getTrainingDelegatesUsingTrainingId($scope.training_id).then(function(response) {
					if (response.data.returnValue == null || response.data.returnValue == undefined) {
						$scope.delegateList = response.data;
					}
					else {
						$scope.delegateList = [];
					}
				});
			}
		}

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
		
		$scope.showParticipantProfile = function(id) {
			var modalInstance = $modal.open({
			templateUrl: 'assets/app/views/participants/delegateProfileModalView.html',
			controller: 'delegateProfileModalController',
			size: '',
			resolve: {
			  id: function () {
				return id;
			  }
			}
			});
		}
	
	});