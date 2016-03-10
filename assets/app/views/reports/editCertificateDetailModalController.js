	
	angular.module('app').controller('editCertificateDetailModalController', function($scope, $modalInstance, trainingiI) {
		$scope.ok = function () {
			
		 	 $modalInstance.close();
		};

		$scope.cancel = function () {
		  $modalInstance.dismiss('cancel');
		};
	}); 