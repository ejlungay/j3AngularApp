
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
			delegateFactory.getTrainingDelegatesUsingTrainingId(training_id[1]).then(function(response) {
				if (response.data.returnValue == null) {
					$scope.delegateList = response.data;
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
			size: ''/*,
			resolve: {
			  id: function () {
				return $scope.id;
			  }
			}*/
			});
		}
		$scope.existing = function() {
			alert('existing');
		}
	});
	
	
	
	
	
	