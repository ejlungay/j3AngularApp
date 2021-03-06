	
	angular.module('app').controller('editTrainingController', function($scope, $modalInstance, trainingFactory, categoryFactory, toastr, courseFactory, userFactory, trainingId) {
		$scope.data = {};

		$scope.btnOkClicked = function () {
			
			//format start date and end date
			var sdate = new Date($scope.data.from_date);
			var edate = new Date($scope.data.to_date);
			
			var dd = sdate.getDate();
			var mm = sdate.getMonth()+1; //January is 0!
			var yyyy = sdate.getFullYear();
			if(dd<10) {
				dd='0'+dd
			} 
			if(mm<10) {
				mm='0'+mm
			} 
			$scope.data.from_date = yyyy + '.' + mm + '.' + dd;
			
			
			dd = edate.getDate();
			mm = edate.getMonth()+1; //January is 0!
			yyyy = edate.getFullYear();
			if(dd<10) {
				dd='0'+dd
			} 
			if(mm<10) {
				mm='0'+mm
			} 
			$scope.data.to_date = yyyy + '.' + mm + '.' + dd;
			
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
				for(var i = 0; i < response.data.length; i++){
					var obj = response.data[i];
					for(var key in obj){
						var attrName = key;
						var attrValue = obj[key];
						if (attrName == 'uid') {
							userid = attrValue;
							break;
						}
					}
				}
				$scope.data.remarks = $scope.data.remarks + ' => userid:' + userid;
				trainingFactory.updateTraining($scope.data).then(function(response){
					if (response.data.returnValue == 'SUCCESS') {
						toastr.success('Successfully updated');
						$modalInstance.close();
					}
					else {
						toastr.error(response.data.returnMessage);
					}
				});

			});
		};

		$scope.btnCancelClicked = function () {
			$modalInstance.dismiss('cancel');
		}
		
		$scope.courseChanged = function(id) {
			$scope.getTrainingListUsingCourseId(id.course_id);
		}
		
		$scope.trainingChanged = function() {
			//console.log('training_id: ', $scope.trainings);
		}
		
		/**** DATE PCIKER CONTROLLER *****/
		$scope.day = function(param) {
			// getting system date
			var current_date = new Date();
			var dd = current_date.getDate();
			var mm = current_date.getMonth()+1; //January is 0!
			var yyyy = current_date.getFullYear();
			
			if(dd<10) {
				dd='0'+dd
			} 
			if(mm<10) {
				mm='0'+mm
			} 
			current_date = yyyy + '-' + mm + '-' + dd;
			if (param == "start") {
				$scope.startDate = current_date;
			}
			else {
				$scope.endDate = current_date;
			}
		}
		//function to clear current date selection
		$scope.clear = function(param) {
			if (param == 'start') {
				$scope.startDate = null;
			}
			else {
				$scope.endDate = null;
			}
		}

		// Disable weekend selection
		$scope.disabled = function(date, mode) {
		  return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
		}

		$scope.toggleMin = function() {
		  $scope.minDate = $scope.minDate ? null : new Date();
		}
		$scope.toggleMin();

		$scope.openStartDate = function($event) {
		  $event.preventDefault();
		  $event.stopPropagation();

		  $scope.startOpened = true;
		}

		$scope.openEndDate = function($event) {
		  $event.preventDefault();
		  $event.stopPropagation();

		  $scope.endOpened = true;
		}
	
		$scope.dateOptions = {
		  formatYear: 'yy',
		  startingDay: 1,
		  class: 'datepicker'
		}

		$scope.initDate = new Date('2016-15-20');
		$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
		$scope.format = $scope.formats[1];
		
		/**** TIME PICKER START CONTROLLER *****/
		$scope.timeStart = new Date();
		$scope.hstep = 1;
		$scope.mstep = 15;

		$scope.options = {
		  hstep: [1, 2, 3],
		  mstep: [1, 5, 10, 15, 25, 30]
		}

		$scope.ismeridian = true;
		$scope.toggleMode = function() {
		  $scope.ismeridian = ! $scope.ismeridian;
		}

		$scope.update = function() {
		  var d = new Date();
		  d.setHours( 14 );
		  d.setMinutes( 0 );
		  $scope.timeStart = d;
		}
		/**** END TIME PICKER START CONTROLLER *****/

		$scope.detail = [];
		$scope.loadDetail = function() {
			$scope.data.trainingId = trainingId;
			trainingFactory.trainingDetail(trainingId).then(function(response) {
				console.log(response.data);
				$scope.detail = response.data;
				for(var i = 0; i < $scope.detail.length; i++){
					var obj = $scope.detail[i];
					for(var key in obj) {
						var attrName = key;
						var attrValue = obj[key];

						if (attrName == 'training_id') $scope.data.training_id = attrValue;
						if (attrName == 'course_name') $scope.data.course_name = attrValue; 
						if (attrName == 'from_date') $scope.data.from_date = attrValue;
						if (attrName == 'to_date') $scope.data.to_date = attrValue;
						if (attrName == 'location') $scope.data.location = attrValue;

						if (attrName == 'time_start') {
							$scope.data.time_start = attrValue;
							$scope.data.time_start_hour = extractTime(attrValue, 'hour');
							$scope.data.time_start_minute = extractTime(attrValue, 'minute');
						}

						if (attrName == 'time_end') {
							$scope.data.time_end = attrValue;
							$scope.data.time_end_hour = extractTime(attrValue, 'hour');
							$scope.data.time_end_minute = extractTime(attrValue, 'minute');
						}

						if (attrName == 'regular_fee') $scope.data.regular_fee = parseFloat(attrValue);
						if (attrName == 'discounted_fee') $scope.data.discounted_fee = parseFloat(attrValue);
						if (attrName == 'category_name') $scope.data.category_name = attrValue;
						if (attrName == 'date_added') $scope.data.date_added = attrValue;
						if (attrName == 'added_by') $scope.data.added_by = attrValue;

						if (attrName == 'remarks') {
							var temp = attrValue.split('=>');
							$scope.data.remarks = temp[0];
						}
					}
				}
			});
		}
		$scope.loadDetail();

		function extractTime(time, extractWhat) {
			// 0 = 12am; 23 = 11pm
			var temp = time.split(' ');
			var temp1 = temp[4].split(':'); // 0 - 1 index
			var hour = parseInt(temp1[0]);
			var minute = temp1[1];

			if (minute.length == 1) minute += '0';

			if (extractWhat == 'hour') return hour;

			else if (extractWhat == 'minute') return minute;

			else return hour + ':' + minute;
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