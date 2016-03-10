
	angular.module('app').controller('addParticipantModalController', function($scope, $modalInstance, categoryFactory, courseFactory, delegateFactory, trainingFactory, userFactory, toastr) {
		$scope.takePic = false;
		var vm = this;
		$scope.onlyNumbers = /^\d+$/;
		
		$scope.courses = [];
		$scope.loadCourses = function() {
			courseFactory.load_courses_that_has_trainings().then(function(response) {
				if (response.data.length > 0) $scope.courses = response.data;
				
				else $scope.courses = [];
			});
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
					alert('take pic');
					/*****  REQUIRED FIELDS  ****/
					if ($scope.training_id == null || $scope.firstname == null || $scope.lastname == null || $scope.gender == null) {
						toastr.error('You cannot add participant without primary details.');
						return;
					}
					/*****  OPTIONAL FIELDS  ****/
					if ($scope.middlename == null || $scope.email == null || $scope.company == null || $scope.industry == null || $scope.position == null || $scope.phone == null || $scope.address == null || $scope.vm.picture == null) {
						if (confirm('There are empty fields including participant picture. Are you sure you want to add this records?')) {
							delegateFactory.addDelegate_take($scope.training_id, $scope.firstname, $scope.middlename, $scope.lastname, $scope.email, $scope.company, $scope.industry, $scope.position, $scope.phone, $scope.gender, $scope.address, 'take', $scope.vm.picture, userid, $scope.amount_paid, or_no).then(function(response) {
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
						delegateFactory.addDelegate_take($scope.training_id, $scope.firstname, $scope.middlename, $scope.lastname, $scope.email, $scope.company, $scope.industry, $scope.position, $scope.phone, $scope.gender, $scope.address, 'take', $scope.vm.picture, userid, $scope.amount_paid, or_no).then(function(response) {
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
					if ($scope.training_id == null || $scope.firstname == null || $scope.lastname == null || $scope.gender == null) {
						toastr.error('You cannot add participant without primary details.');
						return;
					}
					/*****  OPTIONAL FIELDS  ****/
					if ($scope.middlename == null || $scope.email == null || $scope.company == null || $scope.industry == null || $scope.position == null || $scope.phone == null || $scope.address == null) {
						if (confirm('There are empty fields including participant picture. Are you sure you want to add this records?')) {
							delegateFactory.addDelegate($scope.training_id, $scope.firstname, $scope.middlename, $scope.lastname, $scope.email, $scope.company, $scope.industry, $scope.position, $scope.phone, file, $scope.gender, $scope.address, 'upload', userid, $scope.amount_paid, or_no).then(function(response) {
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
						delegateFactory.addDelegate($scope.training_id, $scope.firstname, $scope.middlename, $scope.lastname, $scope.email, $scope.company, $scope.industry, $scope.position, $scope.phone, file, $scope.gender, $scope.address, 'upload', userid, $scope.amount_paid, or_no).then(function(response) {
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