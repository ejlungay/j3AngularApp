	
	angular.module('app').controller('usersController', function($scope, userFactory, $modal) {
		
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
						if (attrValue === 'Standard User' || attrValue === 'Admin') window.location = 'home#/app/404';
					}
				}
			}
			});
		}
		$scope.verifyUser();

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