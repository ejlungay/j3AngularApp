	
	angular.module('app').controller('printAttendanceModalController', function($scope, $modalInstance, data, basicData, ReportingService) {

		$scope.delegateList = data;
		$scope.basicData = basicData;
		$scope.ok = function () {
			ReportingService.normalPrint(document.getElementById('printMe'));
		  	$modalInstance.close();
		};

		$scope.cancel = function () {
		  	$modalInstance.dismiss('cancel');
		};
	}); 