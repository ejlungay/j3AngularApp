	
	angular.module('app').controller('usersController', function($scope, userFactory, $modal) {
		
		$scope.users = [];
		$scope.data = {};

		$scope.loadUsers = function() {
			userFactory.users().then(function(response) {
				$scope.users = response.data;
			});
		}
		$scope.loadUsers();


		$scope.edit = function(userid) {
			var modalInstance = $modal.open({
				templateUrl: 'assets/app/views/user-management/editPrivilegeView.html',
				controller: 'editPrivilegeController',
				size: '',
				resolve: {
				  userId: function () {
					return userid;
				  }
				}
			});

			modalInstance.result.then(function(result) {
				$scope.loadUsers();
			});
		}

		$scope.add = function() {
			var modalInstance = $modal.open({
				templateUrl: 'assets/app/views/user-management/addAccountView.html',
				controller: 'addAccountController',
				size: ''/*,
				resolve: {
				  userId: function () {
					return $scope.id;
				  }
				}*/
			});

			modalInstance.result.then(function(result) {
				$scope.loadUsers();
			});
		}

		$scope.filter = function() {
			if ($scope.data.filter == 'All') {
				$scope.loadUsers();
			}
			else {
				userFactory.filterUsers($scope.data.filter).then(function(response) {
					if (response.data.length > 0) $scope.users = response.data;

					else $scope.users = [];
				});
			}
		}

	}); 