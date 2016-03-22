	
	angular.module('app').controller('selectFromExistingController', function($scope, $modal, $modalInstance, trainingId, delegateFactory, toastr) {
		
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

			//alert('del id:' + $scope.data.delegate_id + ' tid: ' + $scope.data.training_id);

			delegateFactory.checkDelegate($scope.data).then(function(response) {
				if (parseInt(response.data.total) <= 0 ) {
					var modalInstance = $modal.open({
						templateUrl: 'assets/app/views/others/addAmountView.html',
						controller: 'addAmountController',
						size: 'sm',
						resolve: {
						  data: function () {
							return $scope.data;
						  }
						}
					});

					modalInstance.result.then(function(result) {
						$scope.delegateList.splice(index, 1);
					});
				}
				else {
					$scope.data.delegate_id = 0;
					$scope.data.training_id = 0;
					toastr.error('Participant is existing to this training. No need to add.');
					//$scope.delegateList.splice(index, 1);
				}
			});
		}

		$scope.ok = function () {
		  $modalInstance.close();
		};
	}); 