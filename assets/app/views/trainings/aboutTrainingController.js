	
	angular.module('app').controller('aboutTrainingController', function($scope, $modalInstance, userFactory, trainingFactory, categoryFactory, toastr, courseFactory, delegateFactory, trainingId) {
		
		$scope.data = {};
		$scope.isEddited = false;

		$scope.participants = [];
		$scope.loadParticipants = function() {
			delegateFactory.getTrainingDelegatesUsingTrainingId(trainingId).then(function(response) {
				if (response.data.length > 0) {
					$scope.participants = response.data;
				}
				else {
					$scope.participants = [];
				}
			});
		}
		$scope.loadParticipants();

		$scope.delegateCounts = 0;
		$scope.countDelegates = function() {
			trainingFactory.countDelegates(trainingId).then(function(response) {
				if (response.data.returnValue != 'FAILURE') {
					$scope.delegateCounts = response.data.total;
				}
				else {
					$scope.delegateCounts = 0;
				}
			});
		}
		$scope.countDelegates();

		$scope.btnOkClicked = function () {
			$modalInstance.close();
		};

		$scope.loadInfo = function() {
			$scope.trainingDetail = [];
			trainingFactory.trainingDetail(trainingId).then(function(response) {
				$scope.trainingDetail = response.data;

				for(var i = 0; i < $scope.trainingDetail.length; i++){
					var obj = $scope.trainingDetail[i];
					for(var key in obj) {
						var attrName = key;
						var attrValue = obj[key];

						if (attrName == 'training_id') $scope.data.training_id = attrValue;
						if (attrName == 'course_name') $scope.data.course_name = attrValue; 
						if (attrName == 'from_date') $scope.data.from_date = formatDate(attrValue);
						if (attrName == 'to_date') $scope.data.to_date = formatDate(attrValue);
						if (attrName == 'location') $scope.data.location = attrValue;
						if (attrName == 'time_start') $scope.data.time_start = formatTime(attrValue);
						if (attrName == 'time_end') $scope.data.time_end = formatTime(attrValue);
						if (attrName == 'regular_fee') $scope.data.regular_fee = attrValue;
						if (attrName == 'discounted_fee') $scope.data.discounted_fee = attrValue;
						if (attrName == 'category_name') $scope.data.category_name = attrValue;
						if (attrName == 'date_added') $scope.data.date_added = attrValue;
						if (attrName == 'added_by') $scope.data.added_by = attrValue;
						if (attrName == 'remarks') {
							var temp = attrValue.split('=>');
							$scope.data.remarks = temp[0];
							if ($scope.data.remarks.length > 0) {
								var temp2 = temp[1].split(':');
								$scope.isEddited = true;
								userFactory.getUserDetailUsingUserId(temp2[1]).then(function(response) {
									$scope.data.edited_by = response.data.fullname;
								});
							}
						}
					}
				}
			});
		}
		$scope.loadInfo();


		function formatTime(time) {
			// 0 = 12am; 23 = 11pm
			var temp = time.split(' ');
			var temp1 = temp[4].split(':'); // 0 - 1 index
			var hour = parseInt(temp1[0]);
			var minute = temp1[1];

			for (var i = 0; i <= 23; i++) {
				if (minute.length == 1) minute += '0';

				if (hour <= 11) {
					if (hour == 0) hour = 12;

					time = hour.toString() + ':' + minute +' am';
				}
				else {
					if (hour > 12) 

					time = (hour - 12).toString() + ':' + minute +' pm';
				}
			}
			return time;
		}

		function formatDate(date) {
			var monthsInText = [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December'
			];
			var temp = date.split('-');
			var year = temp[0];
			var month = parseInt(temp[1]);
			var day = temp[2];

			return monthsInText[month - 1] + ' ' + day + ', ' + year;
		}

	}); 