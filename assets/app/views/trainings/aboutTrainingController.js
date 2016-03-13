	
	angular.module('app').controller('aboutTrainingController', function($scope, $modalInstance, trainingFactory, categoryFactory, toastr, courseFactory, userFactory) {
		
		$scope.btnOkClicked = function () {
			$modalInstance.close();
		
		};
	}); 