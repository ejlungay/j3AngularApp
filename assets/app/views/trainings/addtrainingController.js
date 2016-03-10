
  /*******************  GLOBAL VARIABLES ***********************
  * I used global variables to store values from different controllers :D
  */
  //global variable for selected course id
  var selectedCourseId = 0;
  /******************  DATE PICKER CONTROLLER ******************/
  angular.module('app').controller('DatepickerCtrl',  function($scope, $http, courseFactory, trainingFactory, toastr) {
	//function to retrieve current date
    $scope.today = function() {
      $scope.startDate = new Date();
    };
	//function to retrieve current date using a parameter
	$scope.day = function(param) {
		if (param == 'start') {
			$scope.startDate = new Date();
		}
		else {
			$scope.endDate = new Date();
		}
	}
	//function to clear current date selection
    $scope.clear = function () {
      $scope.startDate = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.openStartDate = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.startOpened = true;
    };

	$scope.openEndDate = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.endOpened = true;
    };
	
    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1,
      class: 'datepicker'
    };

    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[1];
  });
  /***************** END OF DATE PICKER CONTROLLER *********************/
  
  
  angular.module('app').controller('courseController2',  function($scope, $http, courseFactory, toastr) {
	  /*
	* The following functions are functions that functions fatch-yun :D
	* Bitaw again: these functions are used in querying data from the database at start-up
	*/
	/******* Load the course list into HTML select tag :D**************/
	$scope.courses = [];
		courseFactory.courseList().then(function(response) {
			$scope.courses = response.data;
			
	});
	/*************************************** END ***************************************************/
	
	//function that will be triggered after selecting a course :D
	$scope.onchange = function(id) {
			$scope.countSelected = $scope.courses[0].course_id; 
			selectedCourseId = id.course_id;
			alert(selectedCourseId);
	}
	/*************************************** END ***************************************************/
  });
  
  angular.module('app').controller('mainController',  function($scope, $http, trainingFactory, toastr) {
	$scope.currentProgress = 30;
	$scope.progressBuffer = $scope.currentProgress + 30;
	
	$scope.switch_tabs = function() {
		if ($scope.selectedIndex == 0) {
			//progress bar progress
			$scope.currentProgress = 30;
			$scope.progressBuffer = $scope.currentProgress + 30;
		}
		else if ($scope.selectedIndex == 1) {
			//progress bar progress
			$scope.currentProgress = 60;
			$scope.progressBuffer = $scope.currentProgress + 30;
		}
		else {
			//progress bar progress
			$scope.currentProgress = 100;
			$scope.progressBuffer = 0;
		}
	}
	
	$scope.saveTraining = function() {
		alert();
		//check the input fields

	}
		
	});
  
  
  
  
  
  
  
  
  
  
  