	
	angular.module('app').controller('addAmountController', function($scope, $modalInstance, data, delegateFactory, toastr) {
		
		$scope.paymentData = {};
		$scope.paymentData.training_id = data.training_id;
		$scope.paymentData.delegate_id = data.delegate_id;
		$scope.paymentData.amount_paid = 0;
		$scope.paymentData.or_no = 0;

		$scope.ok = function () {
			if ($scope.paymentData.amount_paid != null && $scope.paymentData.or_no != null) {
				delegateFactory.addDelegateToTraining($scope.paymentData).then(function(response) {
					console.log('response:', response.data);
					if (response.data.returnValue == 'SUCCESS') {
						toastr.success(response.data.returnMessage);	
						$scope.paymentData.or_no = parseInt($scope.paymentData.or_no) + 1;
						document.cookie = 'or_no=' + $scope.paymentData.or_no;

						$modalInstance.close();
					}
					else {
						toastr.error(response.data.returnMessage);
					}
				});
			}
			else {
				toastr.error('Please input amount paid and or no.');
			}
		};

		$scope.cancel = function () {
		  	$modalInstance.dismiss('cancel');
		};


		//check for OR NO.
		$scope.checkOR = function() {
			var cookies = document.cookie.split(';')
			if (cookies != null) {
				var t = '';
				for (var i = 0; i < cookies.length; i++) {
					if (cookies[i].indexOf("or_no") > -1) {
						t = cookies[i].split('=');
						$scope.paymentData.or_no = parseInt(t[1]);
						if ($scope.paymentData.or_no <= 0) {
							var modalInstance = $modal.open({
								templateUrl: 'assets/app/views/others/setOrNoView.html',
								controller: 'setOrNoController',
								size: 'sm'/*,
								resolve: {
									  trainingId: function () {
										return $scope.training_id;
									}
								}*/
							});

							modalInstance.result.then(function(result) {
								$scope.checkOR();
							});
						}
					}
				}
			}
		}
		$scope.checkOR();
	}); 