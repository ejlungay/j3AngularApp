	
	angular.module('app').controller('certificateModalController', function($scope, $modalInstance, ReportingService, delegateFactory, delegateId, trainingId, whatToPrint) {
		
		//get delegate detail
		$scope.delegateDetail = [];
		//get the last two digits of the year to be used in certificate number :D
		var date = new Date(); //XXXX or 2016 or whatever year
		$scope.lastTwoDigitsOfTheYear = date[2] + '' + date[3]; //at index 2 and 3 or 1 and 16 in the example above

		


		$scope.loadDetail = function() {
			delegateFactory.get_delegate_profile(delegateId).then(function(response) {
				console.log('delegate detail', response.data);
				$scope.delegateDetail = response.data;
			});
		}

		if (whatToPrint === 'all') {
			
		}
		else {
			$scope.loadDetail();
		}

		$scope.ok = function () {
			ReportingService.normalPrint(document.getElementById('printDiv'));	
		  	$modalInstance.close();
		};

		$scope.cancel = function () {
		  $modalInstance.dismiss('cancel');
		};
	}); 