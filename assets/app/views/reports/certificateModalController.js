	
	angular.module('app').controller('certificateModalController', function($scope, $modalInstance, ReportingService) {
		
		//

		$scope.ok = function () {
			ReportingService.normalPrint(document.getElementById('printDiv'));	
		  	$modalInstance.close();
		};

		$scope.cancel = function () {
		  $modalInstance.dismiss('cancel');
		};
	}); 