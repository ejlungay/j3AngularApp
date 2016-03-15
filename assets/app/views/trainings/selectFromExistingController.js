	
	angular.module('app').controller('selectFromExistingController', function($scope, $modalInstance, trainingId, delegateFactory, toastr) {
		
		$scope.data = {};

		$scope.delegateList = [];
		delegateFactory.showAllDelegates().then(function(response) {
			if (response.data.returnValue == null) {
				$scope.delegateList = response.data;
			}
			else {
				$scope.delegateList = [];
			}
		});

		$scope.add = function(delegate_id, index) {
			$scope.data.delegate_id = delegate_id;
			$scope.data.training_id = trainingId;

			delegateFactory.checkDelegate($scope.data).then(function(response) {
				if (parseInt(response.data.total) <= 0 ) {
					delegateFactory.addDelegateToTraining($scope.data).then(function(response) {
						if (response.data.returnValue == 'SUCCESS') {
							toastr.success(response.data.returnMessage);
							$scope.delegateList.splice(index, 1);
						}
						else {
							toastr.error(response.data.returnMessage);
						}
					});
				}
				else {
					toastr.error('Participant is existing to this training. No need to add.');
				}
			});
		}

		$scope.ok = function () {
		  $modalInstance.close();
		};
	}); 