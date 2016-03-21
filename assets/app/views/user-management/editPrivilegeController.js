	
	angular.module('app').controller('editPrivilegeController', function($scope, toastr, $modalInstance, userId, userFactory) {
		$scope.id = userId;

		$scope.editData = {};
		$scope.editData.userid = userId;
		//$scope.editData.new_status = '';

		$scope.userDetail = [];
		$scope.btnDisplay = '';
		$scope.checkBox = '';

		$scope.loadUserDetail = function() {
			userFactory.getUserDetailUsingUserId(userId).then(function(response) {
				$scope.userDetail = response.data;

				if ($scope.userDetail.status == 'ACTIVE')  {
					$scope.btnDisplay = 'Deactivate this account';
					$scope.checkBox = '';
				}

				else  {
					$scope.btnDisplay = 'Activate this account';
					$scope.checkBox = 'checked';
				}
			});
		}
		$scope.loadUserDetail();

		$scope.update = function() {
			if ($scope.userDetail.status == 'ACTIVE')  $scope.editData.new_status = 'INACTIVE';

			else  $scope.editData.new_status = 'ACTIVE';
		}

		$scope.ok = function () {
			//check for both
			if ($scope.editData.new_status != undefined && $scope.editData.new_type != undefined) {
				//alert('all');
				userFactory.updateUserType($scope.editData).then(function(response) {
					userFactory.updateUserStatus($scope.editData).then(function(response) {
						if (response.data.returnValue == 'SUCCESS') {
							toastr.success('Successfully changed.');
							$modalInstance.close();
						}
						else {
							toastr.error('Unable to change user data please try again.');
						}
					});
				});
			}
			//change user type
			else {
				if ($scope.editData.new_status != undefined) {
					//alert('status');
					userFactory.updateUserStatus($scope.editData).then(function(response) {
						if (response.data.returnValue == 'SUCCESS') {
							toastr.success('Successfully changed.');
							$modalInstance.close();
						}
						else {
							toastr.error('Unable to change user status please try again.');
						}
					});
				}

				if ($scope.editData.new_type != undefined) {
					//alert('type');
					userFactory.updateUserType($scope.editData).then(function(response) {
						if (response.data.returnValue == 'SUCCESS') {
							toastr.success('Successfully changed.');
							$modalInstance.close();
						}
						else {
							toastr.error('Unable to change user type please try again.');
						}
					});
				}
			}
		};

		$scope.cancel = function () {
		  $modalInstance.dismiss('cancel');
		};

		$scope.activate = function() {
			
		}
	}); 