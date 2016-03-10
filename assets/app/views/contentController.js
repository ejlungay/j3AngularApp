
	angular.module('app').controller('contentController', function($scope, $http, contentFactory, moment, toastr) {
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
			document.cookie = 'username=';
			window.location="index.php";
		}
	});
