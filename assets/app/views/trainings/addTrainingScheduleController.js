	
	angular.module('app').controller('addTrainingScheduleController', function($scope, $modalInstance, trainingFactory, categoryFactory, toastr, courseFactory, userFactory) {
		
		$scope.categories = [];
		$scope.training = {};
		
		$scope.loadCategories = function() {
			categoryFactory.categoryList().then(function(response) {
				$scope.categories = response.data;
			});
		}
		$scope.loadCategories();
		
		$scope.courses = [];
		$scope.loadCourses = function() {
			courseFactory.loadCourseByCategoryId($scope.category_id).then(function(response) {
				if (response.data.length > 0) $scope.courses = response.data;
				
				else $scope.courses = [];
			});
		}
		
		$scope.btnOkClicked = function () {
			//direct date check
			if (($scope.startDate > $scope.endDate) || ($scope.startDate == null) || ($scope.endDate == null)) {
				toastr.error('Training Start date or End date is invalid. Please check them and try again.', 'ERROR');
				return;
			}
			
			//check input fields
			if ($scope.course_id == null || $scope.training_location == null || $scope.regular == null || $scope.discounted == null) {
				toastr.error('There are empty fields. Please check them and try again.', 'ERROR');
				return;
			}
			
			
			//format start date and end date
			var sdate = new Date($scope.startDate);
			var edate = new Date($scope.endDate);
			
			var dd = sdate.getDate();
			var mm = sdate.getMonth()+1; //January is 0!
			var yyyy = sdate.getFullYear();
			if(dd<10) {
				dd='0'+dd
			} 
			if(mm<10) {
				mm='0'+mm
			} 
			sdate = yyyy + '.' + mm + '.' + dd;
			
			
			dd = edate.getDate();
			mm = edate.getMonth()+1; //January is 0!
			yyyy = edate.getFullYear();
			if(dd<10) {
				dd='0'+dd
			} 
			if(mm<10) {
				mm='0'+mm
			} 
			edate = yyyy + '.' + mm + '.' + dd;
			
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

				trainingFactory.addTraining($scope.course_id, $scope.training_location, sdate, edate, $scope.startTime, $scope.endTime, userid, $scope.regular, $scope.discounted).then(function(response){
					if (response.data.returnValue == 'SUCCESS') {
						toastr.success('Successfully updated');
						$modalInstance.close();
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
	}); 