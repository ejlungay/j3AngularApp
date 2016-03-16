
	angular.module('app').controller('todaysTrainingController', function($scope, $location, trainingFactory, delegateFactory, toastr, $modal) {
		$scope.training_detail = [];
		$scope.switchColors = ['blue', 'indigo', 'pink', 'green', 'orange'];
		$scope.randomSwitchColor = $scope.switchColors[getRandomInt(0, 4)];
		var url = $location.url().toString().split('?');
		var training_id = url[1].split('=');
		
		trainingFactory.checkId(training_id[1]).then(function(response) {
			var exist = false;
			$scope.training_detail = response.data;
			for(var i = 0;i < $scope.training_detail.length;i++){
				var obj = $scope.training_detail[i];
				for(var key in obj){
					var attrName = key;
					var attrValue = obj[key];
					if (attrName == 'training_id') {
						exist = true;
						break;
					}
				}
				if (exist) break;
			}
			if (!exist) {
				window.location = 'home#/app/404';
			}
		});
		
		$scope.delegateList = [];
		$scope.loadTrainingDelegates = function() {
			delegateFactory.delegates_from_training(training_id[1]).then(function(response) {
				console.log('arrays', response.data.length);
				if (response.data.returnValue == null) {
					for (var i = 0; i < response.data.length; i++) {
						$scope.delegateList.push(response.data[i]);
					}
					console.log('final data', $scope.delegateList);
				}
				else {
					$scope.delegateList = [];
				}
			});
		}
		$scope.loadTrainingDelegates();
		
		function getRandomInt(min, max){
			var r = Math.floor(Math.random() * (max - min + 1)) + min;
			return r;
		}
		
		$scope.add = function() {
			var modalInstance = $modal.open({
			templateUrl: 'assets/app/views/participants/addParticipantModalView.html',
			controller: 'addParticipantModalController',
			size: '',
			resolve: {
			  	trainingId: function () {
					return training_id[1];
			 	 }
				}
			});
		}
		$scope.existing = function() {
			var modalInstance = $modal.open({
			templateUrl: 'assets/app/views/trainings/selectFromExistingView.html',
			controller: 'selectFromExistingController',
			size: 'lg',
			resolve: {
			  		trainingId: function () {
					return training_id[1];
			 	}
			}
			});
		}

		$scope.showProfile = function(delegateId) {
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
	});
	
	
	
	
	
	