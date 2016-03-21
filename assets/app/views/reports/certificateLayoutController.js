	
	angular.module('app').controller('certificateLayoutController', function($scope, courseFactory, $state, $modal, $stateParams, ReportingService) {

		//alert($stateParams.id);
		var temp = $stateParams.id.split(':');
			var tid = '';
			var did = '';
			var printWhat = '';

			if (temp.length <= 1) {
				tid = $stateParams.id;
				printWhat = 'all';
			}
			else {
				did = temp[0];
				tid = temp[1];
				printWhat = '1delegateOnly';
			}

		$scope.print = function() {

			if (printWhat === 'all') {
				var modalInstance = $modal.open({
				templateUrl: 'assets/app/views/reports/certificateModalView.html',
				controller: 'certificateModalController',
				size: 'lg',
				resolve: {
					  delegateId: function () {
						return did;
					  },
					  trainingId: function () {
						return tid;
					  },
					  whatToPrint: function () {
						return printWhat;
					  }
					}
				});
			}
			else {
				var modalInstance = $modal.open({
				templateUrl: 'assets/app/views/reports/certificateModalView.html',
				controller: 'certificateModalController',
				size: 'lg',
				resolve: {
					  delegateId: function () {
						return did;
					  },
					  trainingId: function () {
						return tid;
					  },
					  whatToPrint: function () {
						return printWhat;
					  }
					}
				});
			}


			$scope.courseName = '';
		$scope.courseCode = '';

		$scope.categoryId = '';
		$scope.categoryDescription = '';
		//get delegate detail
		$scope.delegateDetail = [];
		//get the last two digits of the year to be used in certificate number :D
		var date = new Date().getFullYear(); //XXXX or 2016 or whatever year
		$scope.lastTwoDigitsOfTheYear = date.toString().charAt(2) + '' + date.toString().charAt(3); //at index 2 and 3 or 1 and 16 in the example above
		$scope.courseDetail = [];
		$scope.categoryDetail = [];
		$scope.loadCourseDetail = function() {
			courseFactory.get_course_by_training_id(trainingId).then(function(response) {
				$scope.courseDetail = response.data;

				for(var i=0;i<$scope.courseDetail.length;i++) {
					var obj = $scope.courseDetail[i];
					for(var key in obj){
						var attrName = key;
						var attrValue = obj[key];
						if (attrName == 'course_name') $scope.courseName = attrValue; 
						if (attrName == 'course_code') $scope.courseCode = attrValue; 
						if (attrName == 'category_id') $scope.categoryId = attrValue; 
					}
				}

				categoryFactory.getCategoryById($scope.categoryId).then(function(response) {
					$scope.categoryDetail = response.data;
					for(var i=0;i<$scope.categoryDetail.length;i++) {
						var obj = $scope.categoryDetail[i];
						for(var key in obj){
							var attrName = key;
							var attrValue = obj[key];
							if (attrName == 'description') $scope.categoryDescription = attrValue; 
						}
					}
				});
			});
		}
		$scope.loadCourseDetail();

		$scope.loadDetail = function() {
			delegateFactory.get_delegate_profile(delegateId).then(function(response) {
				$scope.delegateDetail = response.data;
			});
		}

		if (whatToPrint === 'all') {
			delegateFactory.getTrainingDelegatesUsingTrainingId(trainingId).then(function(response) {
				$scope.delegateDetail = response.data;
			});
		}
		else {
			$scope.loadDetail();
		}

		}
	});