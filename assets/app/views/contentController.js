
	angular.module('app').controller('contentController', function($scope, $http, userFactory, contentFactory, moment, toastr) {
		$scope.trainingCounts = '';
		/*************  DATABASE QUERY ****************/
		contentFactory.todaysTrainings().then(function(response) {
			for(var i=0;i<response.data.length;i++){
				var obj = response.data[i];
				for(var key in obj){
					var attrName = key;
					var attrValue = obj[key];
					$scope.trainingCounts = attrValue;
					if (parseInt($scope.trainingCounts) > 0) toastr.info('You have new notifications.'); 
				}
			}
		});
		
		$scope.exit = function() {
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

			userFactory.logout(username[1]).then(function(response) {
				document.cookie = 'previous_url=';
				window.location = 'index.php';
			});
		}
	});
