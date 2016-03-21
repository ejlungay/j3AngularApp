	
	angular.module('app').controller('sidebarController', function($scope, userFactory, contentFactory, toastr) {
		
		$scope.showUserManagement = false;
		

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
			$scope.user_detail = response.data;
		});

		$scope.trainingCounts = '';
		/*************  DATABASE QUERY ****************/
		contentFactory.todaysTrainings().then(function(response) {
			for(var i=0;i<response.data.length;i++){
				var obj = response.data[i];
				for(var key in obj){
					var attrName = key;
					var attrValue = obj[key];
					$scope.trainingCounts = attrValue; 
				}
			}
		});
	}); 