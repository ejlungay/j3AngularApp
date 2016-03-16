	
	angular.module('app').controller('userProfileController', function($scope, userFactory, toastr) {
		
		$scope.data = {};

		var temp = document.cookie.split(';');
		var username = '';
		var userid = '';
		if (temp != null) {
			for (var i = 0; i < temp.length; i++) {
				if (temp[i].indexOf("username") > -1) {
					username = temp[i].split('=');
					$scope.data.username = username[1];
				}
			}
		}

		$scope.details = [];
		$scope.load = function() {
			userFactory.getUserDetail($scope.data.username).then(function(response) {
				$scope.details = response.data;

				for(var i = 0;i < $scope.details.length; i++) {
					var obj = $scope.details[i];
					for(var key in obj){
						var attrName = key;
						var attrValue = obj[key];
						if (attrName == 'firstname') $scope.data.firstname = attrValue;
						if (attrName == 'lastname') $scope.data.lastname = attrValue; 
						if (attrName == 'middlename') $scope.data.middlename = attrValue;
						if (attrName == 'image') $scope.data.image = attrValue;
					}
				}
			});
		}
		$scope.load();

		$scope.showProfile = true;
		$scope.show = function(param) {
			if (param === 'profile') {
				$scope.showProfile = true;
			}
			else {
				$scope.showProfile = false;
			}
		}

		$scope.submit = function(file) {

			if ($scope.showProfile) {
				if (file != null) {
					if ($scope.data.firstname != null && $scope.data.lastname != null) {
						userFactory.updateFullProfileWithPicture($scope.data, file).then(function(response) {
							if (response.data.returnValue == 'SUCCESS') {
								toastr.success(response.data.returnMessage);
								$scope.picFile = null;
								$scope.load();
							}
							else {
								toastr.error(response.data.returnMessage);
							}
						});
					}
					else {
						toastr.error('There are empty fields.');
					}
				}
				else {
					if ($scope.data.firstname != null && $scope.data.lastname != null) {
						userFactory.updateFullProfileWithoutPicture($scope.data).then(function(response) {
							if (response.data.returnValue == 'SUCCESS') {
								toastr.success(response.data.returnMessage);
								$scope.load();
							}
							else {
								toastr.error(response.data.returnMessage);
							}
						});
					}
					else {
						toastr.error('There are empty fields.');
					}
				}
			}
			else {
				if ($scope.data.oldpassword != null && $scope.data.newpassword1 != null && $scope.data.newpassword2 != null) {
					userFactory.login($scope.data).then(function(response) {
						console.log('check pass: ', response.data);
						if (response.data.returnValue == 'SUCCESS') {
							if ($scope.data.newpassword1 === $scope.data.newpassword2) {
								userFactory.change_password($scope.data).then(function(response) {
									toastr.success(response.data.returnMessage);
								});
							}
							else {
								toastr.error('Password did not matched.');
							}
						}
						else {
							toastr.error('Old password is invalid.');
						}
					});
				}	
				else {
					toastr.error('There are empty fields.');
				}	
			}
		}
	}); 