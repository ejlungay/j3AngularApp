
	angular.module('app').controller('addParticipantModalController', function($scope, $modalInstance, categoryFactory, courseFactory, delegateFactory, trainingFactory, userFactory, toastr, trainingId) {
		$scope.takePic = false;
		$scope.data = {};

		$scope.courses = [];
		$scope.loadCourses = function() {
			//predefined training sent frrom the main source
			if (parseInt(trainingId) == 0) {
				courseFactory.load_courses_that_has_trainings().then(function(response) {
					if (response.data.length > 0) $scope.courses = response.data;
					
					else $scope.courses = [];
				});
			}
			//there is a predefined training that the user wanted to add this participant so query the training detail
			else {
				courseFactory.get_course_by_training_id(trainingId).then(function(response) {
					if (response.data.length > 0) $scope.courses = response.data;
					
					else $scope.courses = [];
				});
			}
		}
		$scope.loadCourses();

		$scope.take = function() {
			$scope.takePic = true;
			$('#takePicture').show();
		}
		
		$scope.upload = function() {
			$scope.takePic = false;
		}
		
		$scope.btnOKClicked = function(file) {
			//get the current logged on user
			var temp = document.cookie.split(';');
			var username = '';
			var userid = '';
			var or_no = 123456;

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

				if ($scope.takePic) {
					$scope.data.or_no = or_no;
					$scope.data.picture_mode = 'take';
					$scope.data.user_id = userid;

					/*****  REQUIRED FIELDS  ****/
					if ($scope.data.data.training_id == null || $scope.data.firstname == null || $scope.data.lastname == null || $scope.data.gender == null) {
						toastr.error('You cannot add participant without primary details.');
						return;
					}
					/*****  OPTIONAL FIELDS  ****/
					if ($scope.data.middlename == null || $scope.data.email == null || $scope.data.company == null || $scope.data.industry == null || $scope.data.position == null || $scope.data.phone == null || $scope.data.address == null || $scope.vm.picture == null) {
						if (confirm('There are empty fields including participant picture. Are you sure you want to add this records?')) {
							delegateFactory.addDelegate_take($scope.data, $scope.vm.picture).then(function(response) {
								if (response.data.returnValue == 'SUCCESS') {
									toastr.success(response.data.returnMessage);
									$modalInstance.close();
								}
								else {
									toastr.error(response.data.returnMessage);
								}
							});
						}
					}
					else {
						delegateFactory.addDelegate_take($scope.data, $scope.vm.picture).then(function(response) {
								if (response.data.returnValue == 'SUCCESS') {
									toastr.success(response.data.returnMessage);
									$modalInstance.close();
								}
								else {
									toastr.error(response.data.returnMessage);
								}
						});
					}
				}
				else {
					$scope.data.or_no = or_no;
					$scope.data.picture_mode = 'upload';
					$scope.data.user_id = userid;

					/*****  REQUIRED FIELDS  ****/
					if ($scope.data.training_id == null || $scope.data.firstname == null || $scope.data.lastname == null || $scope.data.gender == null) {
						toastr.error('You cannot add participant without primary details.');
						return;
					}
					/*****  OPTIONAL FIELDS  ****/
					if ($scope.data.middlename == null || $scope.data.email == null || $scope.data.company == null || $scope.data.industry == null || $scope.data.position == null || $scope.data.phone == null || $scope.data.address == null) {
						if (confirm('There are empty fields including participant picture. Are you sure you want to add this records?')) {
							delegateFactory.addDelegate($scope.data, file).then(function(response) {
								if (response.data.returnValue == 'SUCCESS') {
									toastr.success(response.data.returnMessage);
									$modalInstance.close();
								}
								else {
									toastr.error(response.data.returnMessage);
								}
							});
						}
					}
					else {
						delegateFactory.addDelegate($scope.data, file).then(function(response) {
								if (response.data.returnValue == 'SUCCESS') {
									toastr.success(response.data.returnMessage);
									$modalInstance.close();
								}
								else {
									toastr.error(response.data.returnMessage);
								}
						});
					}
				}

			});
		}
		
		$scope.btnCancelClicked = function() {
			$modalInstance.dismiss('cancel');
		}
		
		$scope.hide = function() {
			$('#takePicture').hide();
		}

	});