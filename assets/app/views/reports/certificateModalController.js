	
	angular.module('app').controller('certificateModalController', function($scope, $modalInstance, ReportingService) {
		
		//

		$scope.ok = function () {
			ReportingService.normalPrint(document.getElementById('printMe'));	
		  	$modalInstance.close();
		};

		$scope.cancel = function () {
		  $modalInstance.dismiss('cancel');
		};
	}); 