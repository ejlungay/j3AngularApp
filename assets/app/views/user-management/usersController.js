	
	angular.module('app').controller('usersController', function($scope, userFactory, $modal) {
		
		$scope.users = [];
		$scope.loadUsers = function() {
			userFactory.users().then(function(response) {
				console.log(response.data);
				$scope.users = response.data;
			});
		}
		$scope.loadUsers();


		$scope.edit = function(userid) {
			alert(userid);
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
	}); 