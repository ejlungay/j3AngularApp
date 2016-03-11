	
	angular.module('app').controller('editCertificateDetailModalController', function($scope, $modalInstance, userFactory, trainingId, trainingFactory, speakerFactory, toastr, $window, signatoryFactory) {
		$scope.data = {};
		$scope.data.training_id = trainingId;
		$scope.speakerLabel ="No speaker for this training. Click add speaker.";

		$scope.data2 = {};
		$scope.data2.training_id = trainingId;

		$scope.loadInfo = function() {
			$scope.training_name = '';
			$scope.form_date = '';
			$scope.training_location = '';
			$scope.to_date = '';
			$scope.start_time = '';
			$scope.end_time = '';
			
			$scope.trainingList = [];
			trainingFactory.getTrainings().then(function(response) {
			$scope.trainingList = response.data;

			var trainingID_values = [];
			var trainingTitles_values = [];
			var fromDate_values = [];
			var toDate_values = [];
			var location = [];
			var time_start = [];
			var time_end = [];

			for(var i = 0; i < $scope.trainingList.length; i++){
				var obj = $scope.trainingList[i];
				for(var key in obj) {
					var attrName = key;
					var attrValue = obj[key];

					if (attrName == 'training_id') trainingID_values.push(attrValue);
					if (attrName == 'course_name') trainingTitles_values.push(attrValue); 
					if (attrName == 'from_date') fromDate_values.push(attrValue);
					if (attrName == 'to_date') toDate_values.push(attrValue);
					if (attrName == 'location') location.push(attrValue);
					if (attrName == 'time_start') time_start.push(attrValue);
					if (attrName == 'time_end') time_end.push(attrValue);
				}
			}
	
			for (var i = 0; i < trainingID_values.length; i++) {
				if (trainingID_values[i] == trainingId) {
					$scope.training_name = trainingTitles_values[i];
							
					$scope.from_date = formatDate(fromDate_values[i]);
					$scope.to_date = formatDate(toDate_values[i]);
							
					$scope.training_location = location[i];

					$scope.start_time = formatTime(time_start[i]);
					$scope.end_time = formatTime(time_end[i]);

					break;
				}
			}
			});
		}
		$scope.loadInfo();

		$scope.ok = function () {
			
		 	 $modalInstance.close();
		};

		$scope.cancel = function () {
		  $modalInstance.dismiss('cancel');
		};

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

		$scope.addSpeaker = function(file) {
			if ($scope.data.firstname != null && $scope.data.lastname != null) {
				speakerFactory.addSpeaker($scope.data, file).then(function(response) {
					if (response.data.returnValue == 'SUCCESS') {
						toastr.success(response.data.returnMessage);
						$scope.loadSpeakers();
						$scope.data = {};
						$scope.picFile = null;
						$scope.picView = null;
					}
					else {
						toastr.error('Unable to add the speaker. Please try again or  contact system administrator.', 'ERROR');
					}
				}); 
			} 
			else {
				toastr.error('Please input primary details and try again.', 'ERROR');
			}
		}

		$scope.speakers = [];
		$scope.loadSpeakers = function() {
			speakerFactory.get_speaker_by_training_id(trainingId).then(function(response) {
				if (response.data.length > 0) {
					$scope.speakers = response.data;
					$scope.speakerLabel ="Current speaker(s)";
				}
				else {
					$scope.speakers = [];
					$scope.speakerLabel ="No speaker for this training. Click add speaker.";
				}
			});
		}
		$scope.loadSpeakers();

		$scope.addSignatory = function() {
			//get the current logged on user
			var temp = document.cookie.split(';');
			var username = '';
			if (temp != null) {
				for (var i = 0; i < temp.length; i++) {
					if (temp[i].indexOf("username") > -1) {
						username = temp[i].split('=');
					}
				}
			}
			//get user detail from db
			userFactory.getUserDetail(username[1]).then(function(response) {
				for(var i = 0; i < response.data.length; i++){
					var obj = response.data[i];
					for(var key in obj){
						var attrName = key;
						var attrValue = obj[key];
						if (attrName == 'uid') {
							$scope.data2.user_id = attrValue;
							break;
						}
					}
				}
				signatoryFactory.addSignatory($scope.data2).then(function(response) {
					if (response.data.returnValue == 'SUCCESS') {
						$scope.getSignatories();
						toastr.success(response.data.returnMessage);
						$scope.data2 = null;
					}
					else toastr.error('Unable to add signatory please try again.');
				});
			});
		}

		$scope.signtories = [];
		$scope.getSignatories = function() {
			signatoryFactory.get_signatories_by_training_id(trainingId).then(function(response) {
				console.log(response.data);
				if (response.data.length > 0) $scope.signtories = response.data;

				else $scope.signtories = []; 
			});
		}
		$scope.getSignatories();
	}); 