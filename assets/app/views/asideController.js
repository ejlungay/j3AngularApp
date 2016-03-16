	
	angular.module('app').controller('asideController', function($scope, userFactory) {
		
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
			console.log(response.data);
			$scope.user_detail = response.data;
		});

		$scope.logout = function() {
			userFactory.logout(username[1]).then(function(response) {
				window.location = 'index.php';
			});
		}
	}); 