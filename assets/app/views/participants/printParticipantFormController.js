	
	angular.module('app').controller('printParticipantFormController', function($scope, $modalInstance, courseFactory, ReportingService, delegateId, delegateFactory, trainingId) {
		$scope.amount_paid = 0;
		$scope.or_no = 0;

		$scope.course_name = '';
		$scope.training_date = '';
		$scope.location = '';

		$scope.delegateDetails = [];
		$scope.loadDetails = function() {
			delegateFactory.get_delegate_profile(delegateId).then(function(response) {
				$scope.delegateDetails = response.data;
			});
		}
		$scope.loadDetails();

		$scope.loadPaymentDetail = function() {
			delegateFactory.get_delegate_payment(delegateId, trainingId).then(function(response) {
				$scope.amount_paid = response.data.amount_paid;
				$scope.or_no = response.data.or_no;
			});
		}
		$scope.loadPaymentDetail();

		$scope.loadCourseDetails = function() {
			courseFactory.get_course_by_training_id(trainingId).then(function(response) {
				var from_date = '', to_date = '';
				for(var i = 0; i < response.data.length; i++) {
					var obj = response.data[i];
					for(var key in obj){
						var attrName = key;
						var attrValue = obj[key];
						if (attrName == 'course_name') $scope.course_name = attrValue; 
						if (attrName == 'from_date') from_date = attrValue; 	
						if (attrName == 'to_date') to_date = attrValue; 	
						if (attrName == 'location') $scope.location = attrValue; 	
					}
				}

				if (from_date != to_date) $scope.training_date = from_date + ' to ' + to_date;
				else $scope.training_date = from_date;
			});
		}
		$scope.loadCourseDetails();

		$scope.ok = function () {
			ReportingService.normalPrint(document.getElementById('form'));
		  	$modalInstance.close();
		};

		$scope.cancel = function () {
		  	$modalInstance.dismiss('cancel');
		};
	}); 