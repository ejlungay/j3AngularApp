
	angular.module('app').controller('addParticipantModalController', function($scope, $modal, $modalInstance, categoryFactory, courseFactory, delegateFactory, trainingFactory, userFactory, toastr, trainingId) {
		$scope.takePic = false;
		$scope.data = {};
		$scope.data.amount_paid = 0;
		$scope.data.or_no = 0;

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
					$scope.data.picture_mode = 'take';
					$scope.data.user_id = userid;

					/*****  REQUIRED FIELDS  ****/
					if ($scope.data.delegate_number == null || $scope.data.training_id == null || $scope.data.firstname == null || $scope.data.lastname == null || $scope.data.gender == null) {
						toastr.error('You cannot add participant without primary details.');
						return;
					}

					//check delegate number
					delegateFactory.check_delegate_number($scope.data.delegate_number).then(function(response) {
						if (response.data.returnValue == null || response.data.returnValue == undefined) {
							toastr.error('Delegate number ' + $scope.data.delegate_number + ' is already assigned to ' + response.data.firstname + ' ' + response.data.lastname + '. Please change delegate number.');
							return;
						}
						else {
							/*****  OPTIONAL FIELDS  ****/
							if ($scope.data.middlename == null || $scope.data.email == null || $scope.data.company == null || $scope.data.industry == null || $scope.data.position == null || $scope.data.phone == null || $scope.data.address == null || $scope.vm.picture == null) {
								if (confirm('There are empty fields including participant picture. Are you sure you want to add this records?')) {
									delegateFactory.addDelegate_take($scope.data, $scope.vm.picture).then(function(response) {
										if (response.data.returnValue == 'SUCCESS') {
											toastr.success(response.data.returnMessage);
											$scope.data.or_no = parseInt($scope.data.or_no) + 1;
											document.cookie = 'or_no=' + $scope.data.or_no;

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
											$scope.data.or_no = parseInt($scope.data.or_no) + 1;
											document.cookie = 'or_no=' + $scope.data.or_no;

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
				else {
					$scope.data.picture_mode = 'upload';
					$scope.data.user_id = userid;

					/*****  REQUIRED FIELDS  ****/
					if ($scope.data.delegate_number == null || $scope.data.training_id == null || $scope.data.firstname == null || $scope.data.lastname == null || $scope.data.gender == null) {
						toastr.error('You cannot add participant without primary details.');
						return;
					}

					//check delegate number
					delegateFactory.check_delegate_number($scope.data.delegate_number).then(function(response) {
						if (response.data.returnValue == null || response.data.returnValue == undefined) {
							toastr.error('Delegate number ' + $scope.data.delegate_number + ' is already assigned to ' + response.data.firstname + ' ' + response.data.lastname + '. Please change delegate number.');
							return;
						}
						else {
							/*****  OPTIONAL FIELDS  ****/
							if ($scope.data.middlename == null || $scope.data.email == null || $scope.data.company == null || $scope.data.industry == null || $scope.data.position == null || $scope.data.phone == null || $scope.data.address == null) {
								if (confirm('There are empty fields including participant picture. Are you sure you want to add this records?')) {
									delegateFactory.addDelegate($scope.data, file).then(function(response) {
										if (response.data.returnValue == 'SUCCESS') {
											toastr.success(response.data.returnMessage);
											$scope.data.or_no = parseInt($scope.data.or_no) + 1;
											document.cookie = 'or_no=' + $scope.data.or_no;

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
											$scope.data.or_no = parseInt($scope.data.or_no) + 1;
											document.cookie = 'or_no=' + $scope.data.or_no;

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

			});
		}
		
		$scope.btnCancelClicked = function() {
			$modalInstance.dismiss('cancel');
		}
		
		$scope.hide = function() {
			$('#takePicture').hide();
		}

		//check for OR NO.
		$scope.checkOR = function() {
			var cookies = document.cookie.split(';')
			if (cookies != null) {
				var t = '';
				for (var i = 0; i < cookies.length; i++) {
					if (cookies[i].indexOf("or_no") > -1) {
						t = cookies[i].split('=');
						$scope.data.or_no = parseInt(t[1]);
						if ($scope.data.or_no <= 0) {
							var modalInstance = $modal.open({
								templateUrl: 'assets/app/views/others/setOrNoView.html',
								controller: 'setOrNoController',
								size: 'sm'/*,
								resolve: {
									  trainingId: function () {
										return $scope.training_id;
									}
								}*/
							});

							modalInstance.result.then(function(result) {
							$scope.checkOR();
							});
						}
					}
				}
			}
		}
		$scope.checkOR();

	});