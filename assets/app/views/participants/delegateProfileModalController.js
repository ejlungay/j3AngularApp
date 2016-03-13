
	angular.module('app').controller('delegateProfileModalController', function($scope, $modalInstance, delegateFactory, delegateId, toastr) {
		$scope.title = 'Participant Profile';
		$scope.showProfile = true;
		$scope.showTraining = false;
		$scope.showPayment = false;
		$scope.showRegistration = false;

		$scope.editable = false;

		$scope.userData = {};
		$scope.userData.delegate_id = delegateId;
		$scope.details = [];
		$scope.loadDetails = function() {
			delegateFactory.get_delegate_details(delegateId).then(function(response) {
				var amount_paid = 0;
				var fee = 0;
				if (response.data.length > 0) {
					$scope.details = response.data;

					for(var i = 0;i < $scope.details.length; i++) {
						var obj = $scope.details[i];
						for(var key in obj){
							var attrName = key;
							var attrValue = obj[key];
							if (attrName == 'firstname') $scope.userData.firstname = attrValue;
							if (attrName == 'lastname') $scope.userData.lastname = attrValue; 
							if (attrName == 'middlename') $scope.userData.middlename = attrValue;
							if (attrName == 'email') $scope.userData.email = attrValue;
							if (attrName == 'phone') $scope.userData.phone = parseInt(attrValue);
							if (attrName == 'company') $scope.userData.company = attrValue;
							if (attrName == 'company_position') $scope.userData.position = attrValue;
							if (attrName == 'address') $scope.userData.address = attrValue;
							if (attrName == 'image') $scope.userData.image = attrValue;
							if (attrName == 'delegate_number') $scope.userData.number = parseInt(attrValue);
							if (attrName == 'amount_paid') amount_paid = parseInt(attrValue);
							if (attrName == 'regular_fee') fee = parseInt(attrValue);
						}
					}

					$scope.userData.balance = fee - amount_paid;
				}

				else {
					$scope.details = [];
					$scope.userData = {};
				}
			});
		}
		$scope.loadDetails();

		$scope.toggleWhatToShow = function(param) {
			if (param == 'profile') {
				$scope.title = 'Participant Profile';
				$scope.showProfile = true;
				$scope.showTraining = false;
				$scope.showPayment = false;
				$scope.showRegistration = false;
			}
			else if (param == 'training') {
				$scope.title = 'Trainings Attended';
				$scope.showProfile = false;
				$scope.showTraining = true;
				$scope.showPayment = false;
				$scope.showRegistration = false;
			}
			else if (param == 'payment') {
				$scope.title = 'Payment Transaction';
				$scope.showProfile = false;
				$scope.showTraining = false;
				$scope.showPayment = true;
				$scope.showRegistration = false;
				$scope.paymentDetail();
			}
			else {
				$scope.title = 'Registration Detail';
				$scope.showProfile = false;
				$scope.showTraining = false;
				$scope.showPayment = false;
				$scope.showRegistration = true;
			}
		}

		$scope.ok = function() {
			$modalInstance.close();
		}

		$scope.editMode = function() {
			$scope.editable = true;
		}

		$scope.paymentDetail = function() {

		}

		$scope.update = function(file) {
			if (file == null) {
				alert('error file');
				return;
			}
			delegateFactory.updateDelegate($scope.userData, file).then(function(response) {
				if (response.data.returnValue == 'SUCCESS') {
					toastr.success(response.data.returnMessage);
					$scope.loadDetails();
					$scope.editable = false;
				}
				else {
					console.error(response.data);
				}
			});
		}
	});