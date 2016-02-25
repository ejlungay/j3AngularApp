'use strict';

/**
 * @ngdoc function
 * @name j3appApp.controller:MainCtrl
 * @description
 * # TrainingsController
 * Controller of the j3appApp
 */
angular.module('j3appApp').controller('trainingsController', function () 
  {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
	  'ui.bootstrap'
    ];
  }); 
/*
*	get the user type for hiding/showing the add training button
*/
angular.module('j3appApp').controller('trainingsController', ['$scope', '$http', function($scope, $http){ 
	//get first the currently logged on user
	$scope.temp = document.cookie.split(';');
	if ($scope.temp != null) {
		$scope.user = '';
		for (var i = 0; i < $scope.temp.length; i++) {
			if ($scope.temp[i].indexOf("username") > -1) {
				$scope.user = $scope.temp[i].split('=');
			}
		}
		$http.get("http://localhost/j3safetysolutions/index.php/current_user?username=" + $.trim($scope.user[1])).success(function(response) { 
				if (response.uid != null) {
					$scope.uid = response.uid;
					//get the user type: admin or super admin or standard user
					$http.get("http://localhost/j3safetysolutions/index.php/get_user_type?uid=" + $.trim($scope.uid)).success(function(data) { 
						if (data.user_type != null) {
							//only hide the button if the user type is standard
							if (data.user_type == 'standard-user') {
								$('#btn_add').hide();
							}
							
						}
					}).error(function(data){
						alert('An error occured. The server is not responding to the sent request. Please contact the system administrator.');
					});
				}
		}).error(function(response){
			alert('An error occured. The server is not responding to the sent request. Please contact the system administrator.');
		});
	}
}]);
//-------------------------------------------------------------------------------------------------
/*
*	Getting all trainings
*
angular.module('j3appApp').controller('trainingsController', ['$scope', '$http', function($scope, $http){ 
	$http.get("http://localhost/j3safetysolutions/index.php/signin?username=" +  $scope.uname + "&password=" + $scope.pword).success(function(response) { 
		if (response.returnValue == 'FAILED') {
			alert(response.returnMessage);
		}
		else {
			window.location = "#/home";
		}
	}).error(function(response){
		alert('An error occured. The server is not responding to the sent request. Please contact the system administrator. Error detail: ' + response);
	});
}]);*/
//-------------------------------------------------------------------------------------------------