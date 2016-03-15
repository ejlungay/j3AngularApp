	
	angular.module('app').controller('printDirectoryModalController', function($scope, $modalInstance, data, basicData, ReportingService) {

		$scope.participants = data;
		$scope.basicData = basicData;
		
		$scope.ok = function () {
			ReportingService.printData(document.getElementById('printMe'));
		  	$modalInstance.close();
		};

		$scope.cancel = function () {
		  	$modalInstance.dismiss('cancel');
		};
	}); 