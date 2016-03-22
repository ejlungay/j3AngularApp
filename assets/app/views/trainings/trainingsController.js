
	var selectedCourseId = 0;
	  
	angular.module('app').controller('trainingsController',  function($scope, $http, $modal, toastr, userFactory, trainingFactory) {
		
		$scope.verifyUser = function() {
			$scope.user_detail = [];
			//get the current logged on user
			var temp = document.cookie.split(';');
			var username = '';
			var userid = '';
			if (temp != null) {
				for (var i = 0; i < temp.length; i++) {
					if (temp[i].indexOf("username") > -1) {
						username = temp[i].split('=');
					}
				}
			}
			//get user detail from db
			userFactory.getUserDetail(username[1]).then(function(response) {
				console.log('-----', response.data);
				$scope.user_detail = response.data;

				for(var i=0;i<response.data.length;i++){
				var obj = response.data[i];
				for(var key in obj){
					var attrName = key;
					var attrValue = obj[key];
					
					if (attrName === 'user_type') {
						if (attrValue === 'Standard User') window.location = 'home#/app/404';
					}
				}
			}
			});
		}
		$scope.verifyUser();

		$scope.trainingList = [];
		
		$scope.loadTrainings = function() {
			trainingFactory.getTrainings().then(function(response) {
				if (response.data.length > 0) {
					$scope.trainingList = response.data;
				}
				else {
					$scope.trainingList = [];
				}
			});
		}
		$scope.loadTrainings();
		
		$scope.openAddTrainingModal = function() {
			window.location = 'home#/app/training/add-training';
		}

		$scope.edit = function(trainingId) {
			var modalInstance = $modal.open({
				templateUrl: 'assets/app/views/trainings/editTrainingView.html',
				controller: 'editTrainingController',
				size: '',
				resolve: {
				  trainingId: function () {
					return trainingId;
				  }
				}
			});

			modalInstance.result.then(function(result) {
				$scope.loadTrainings();
			});
		}

		$scope.about = function(trainingId) {
			var modalInstance = $modal.open({
				templateUrl: 'assets/app/views/trainings/aboutTrainingView.html',
				controller: 'aboutTrainingController',
				size: '',
				resolve: {
				  trainingId: function () {
					return trainingId;
				  }
				}
			});
		}
	});

	  
	  
	  
	  
	  
	  