	
	angular.module('app').controller('setOrNoController', function($scope, $modalInstance, toastr, delegateFactory) {
		$scope.or = 0;
		delegateFactory.getMaxOrNo().then(function(response) {
			$scope.or = parseInt(response.data.max_or);
		});

		$scope.ok = function () {
			if ($scope.or_no != null && $scope.or_no != undefined) {
				delegateFactory.getMaxOrNo().then(function(response) {
					if (parseInt($scope.or_no) > parseInt(response.data.max_or)) {
						document.cookie = 'or_no=' + $scope.or_no;
			  			$modalInstance.close();
					}
					else {
						toastr.error('Please choose bigger OR No.');
					}
				});
			}
			else {
				toastr.error('Invalid Or No.');
			}
		};

		$scope.cancel = function () {
		  	$modalInstance.dismiss('cancel');
		};
	}); 