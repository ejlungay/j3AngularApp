
	var selectedCourseId = 0;
	  
	angular.module('app').controller('addParticipantController',  function($scope, $http, courseFactory, toastr) {
		$scope.genders = [{ value: 'Male'}, {value: 'Female'}];   
		
		$scope.courses = [];
			courseFactory.courseList().then(function(response) {
			$scope.courses = response.data;
				
		});
		/*************************************** END ***************************************************/
		
		//function that will be triggered after selecting in select tag
		$scope.onchange = function(id) {
			$scope.countSelected = $scope.courses[0].course_id; 
			selectedCourseId = id.course_id;
			alert(selectedCourseId);
		}
		$scope.genderListener = function(val) {
			
			alert(val);
		}
		/*************************************** END ***************************************************/

		$scope.more = function() {
			alert('More');
		}

		$scope.edit = function() {
			alert('Edit');
		}

		//upload picture
		$scope.upload = function() {
			alert('Uploadc');
		}
		
		$scope.take = function () {
			alert('Take');
		}
	});

	  
	  
	  
	  
	  
	  