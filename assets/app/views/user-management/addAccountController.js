	
	angular.module('app').controller('addAccountController', function($scope, $modalInstance, toastr, userFactory) {

		$scope.data = {};

		$scope.ok = function(file) {

			if ($scope.data.username.length < 5) {
				toastr.error('Username is too short.');
				return;
			}

			if ($scope.data.username != null && $scope.data.password1 != null 
				&& $scope.data.password2 != null && $scope.data.firstname != null &&
				$scope.data.middlename != null && $scope.data.lastname != null && file != null &&
				$scope.data.user_type != null) {

				if ($scope.data.password1 == $scope.data.password2) {

					if ($scope.data.password1.length < 5) {
						toastr.error('Password is too short.');
						return;
					}
					userFactory.signup($scope.data, file).then(function(response) {
						if (response.data.returnValue == 'SUCCESS') {
							toastr.success(response.data.returnMessage);
							$modalInstance.close();
						}
						else {
							toastr.error('The username is already in used. Please choose another and try again.');
						}
					});
				}
				else {
					toastr.error('Password did not matched.');
				}
			}
			else {
				toastr.error('Please dont leave empty field(s).');
			}
		};

		$scope.cancel = function () {
		  $modalInstance.dismiss('cancel');
		};
	}); 