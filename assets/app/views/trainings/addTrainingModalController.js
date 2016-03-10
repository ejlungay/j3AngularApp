	
	angular.module('app').controller('addTrainingModalController', function($scope, $modalInstance, userFactory, courseFactory, trainingFactory, categoryFactory, toastr) {
		$scope.categories = [];
		$scope.loadCategories = function() {
			categoryFactory.categoryList().then(function(response){
				if (response.data.length > 0) {
					$scope.categories = response.data;
				}
				else {
					$scope.categories = [];
				}
			});
		}
		
		$scope.loadCategories();
		
		$scope.btnOkClicked = function() {
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
				for(var i = 0; i < response.data.length; i++){
					var obj = response.data[i];
					for(var key in obj){
						var attrName = key;
						var attrValue = obj[key];
						if (attrName == 'uid') {
							userid = attrValue;
							break;
						}
					}
				}
				//check for inputs
				if ($scope.category_id != null && $scope.course_title != null && $scope.course_code != null) {
					courseFactory.addCourse($scope.course_title, $scope.course_code, userid, $scope.category_id).then(function(response) {
						console.log(response.data);
						if (response.data.returnValue == 'SUCCESS') {
							toastr.success(response.data.returnMessage);
							$modalInstance.close();	
						}
						else {
							toastr.error('Unable to add the course.');
							console.log(response.data);
						}
					});
				}
				else {
					toastr.error('Please input the required fields.');
				}
			});
		}
		
		$scope.btnCancelClicked = function () {
			$modalInstance.dismiss('cancel');
		};
		
	}); 