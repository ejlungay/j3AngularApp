	
	angular.module('app').controller('financialController', function($scope, $state, $modal, $stateParams, userFactory, delegateFactory, trainingFactory, ReportingService) {
		
		$scope.verifyUser = function() {
			$scope.user_detail = [];
			//get the current logged on user
			var temp = document.cookie.split(';');
			var username = '';
			var userid = '';
			if (temp != null) {
				for (var i = 0; i < temp.length; i++) {
					if (temp[i].indexOf("username") > -1) {
						username = temp[i].split('=');
					}
				}
			}
			//get user detail from db
			userFactory.getUserDetail(username[1]).then(function(response) {
				console.log('-----', response.data);
				$scope.user_detail = response.data;

				for(var i=0;i<response.data.length;i++){
				var obj = response.data[i];
				for(var key in obj){
					var attrName = key;
					var attrValue = obj[key];
					
					if (attrName === 'user_type') {
						if (attrValue === 'Standard User') window.location = 'home#/app/404';
					}
				}
			}
			});
		}
		$scope.verifyUser();

		//alert($stateParams.training_id);
		$scope.isEditable = false;

		$scope.trainingList = [];
		$scope.loadTrainingList = function() {
			trainingFactory.getTrainings().then(function(response) {
				if (response.data.length > 0) {
					$scope.trainingList = response.data;
					$scope.isEditable = true;
				}
				else $scope.trainingList = [];

			});
		}
		$scope.loadTrainingList();

		$scope.delegateList = [];
		$scope.delegateAmountPaidTotal = 0;
		$scope.loadTrainingDelegates = function() {
			$scope.delegateAmountPaidTotal = 0;
			if ($scope.training_id == null) return;

			delegateFactory.getTrainingDelegatesUsingTrainingId($scope.training_id).then(function(response) {
				console.log('res: ', response.data);
				if (response.data.returnValue == null || response.data.returnValue == undefined) {
					$scope.delegateList = response.data;

					for(var i=0;i<$scope.delegateList.length;i++) {
						var obj = $scope.delegateList[i];
						for(var key in obj){
							var attrName = key;
							var attrValue = obj[key];
							if (attrName == 'amount_paid') $scope.delegateAmountPaidTotal += parseInt(attrValue);
						}
					}

					$scope.loadExpenses();
				}
				else {
					$scope.delegateList = [];
					$scope.delegateAmountPaidTotal = 0;
				}
			});
		}

		$scope.expenses = [];
		$scope.expensesTotal = 0;
		$scope.loadExpenses = function() {
			$scope.expensesTotal = 0;
			trainingFactory.getTrainingExpenses($scope.training_id).then(function(response) {
				if (response.data.length > 0) {
					$scope.expenses = response.data;

					for(var i = 0;i < $scope.expenses.length; i++) {
						var obj = $scope.expenses[i];
						for(var key in obj){
							var attrName = key;
							var attrValue = obj[key];
							if (attrName == 'amount_paid') $scope.expensesTotal += parseInt(attrValue);
						}
					}
				}
				else {
					$scope.expenses = [];
					$scope.expensesTotal = 0;
				}
			});
		}

		$scope.edit = function() {
			if ($scope.training_id != null) {
				var modalInstance = $modal.open({
					templateUrl: 'assets/app/views/reports/editFinancialView.html',
					controller: 'editFinancialController',
					size: 'sm',
					resolve: {
					  trainingId: function () {
						return $scope.training_id;
					  }
					}
				});

				modalInstance.result.then(function(result) {
					$scope.loadExpenses();
				});
			}
		}

		$scope.formatPeso = function(value) {
			return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}

		$scope.print = function(){
			ReportingService.printData(document.getElementById('printMe'));
		}

		$scope.user_detail = [];
		//get the current logged on user
		var temp = document.cookie.split(';');
		var username = '';
		var userid = '';
		if (temp != null) {
			for (var i = 0; i < temp.length; i++) {
				if (temp[i].indexOf("username") > -1) {
					username = temp[i].split('=');
				}
			}
		}
		//get user detail from db
		userFactory.getUserDetail(username[1]).then(function(response) {
			$scope.user_detail = response.data;
		});
	});