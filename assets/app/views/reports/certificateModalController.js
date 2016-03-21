	
	angular.module('app').controller('certificateModalController', function($scope, $modalInstance, categoryFactory, ReportingService, delegateFactory, courseFactory, delegateId, trainingId, whatToPrint) {
		
		$scope.img_tops = [];
		$scope.name_tops = [];
		$scope.managing_name_tops = [];
		$scope.managing_partner_tops = [];
		$scope.accreditation_tops = [];
		$scope.course_tops = [];
		$scope.certificate_tops = [];

		//variablessssssssssssssssssssssss
		$scope.temp_top = 0;
		$scope.name_top = 0;
		$scope.managing_name_top = 0;
		$scope.managing_partner_top = 0;
		$scope.accreditation_top = 0;
		$scope.course_top = 0;
		$scope.certificate_top = 0;

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

				$scope.img_tops[0] = 270;
				$scope.name_tops[0] = 390;
				$scope.managing_name_tops[0] = 870;
				$scope.managing_partner_tops[0] = 890;
				$scope.accreditation_tops[0] = 910;
				$scope.course_tops[0] = 510;
				$scope.certificate_tops[0] = 730;
			});
		}

		if (whatToPrint === 'all') {
			delegateFactory.getTrainingDelegatesUsingTrainingId(trainingId).then(function(response) {
				$scope.delegateDetail = response.data;

				$scope.img_tops = [];
				$scope.name_tops = [];

				for (var i = 0; i < response.data.length; i++) {
					if (i <= 0) {
						$scope.temp_top = $scope.temp_top + 270;
						$scope.name_top = $scope.name_top + 390;
						$scope.managing_name_top = $scope.managing_name_top + 870;
						$scope.managing_partner_top = $scope.managing_partner_top + 890;
						$scope.accreditation_top = $scope.accreditation_top + 910;
						$scope.course_top = $scope.course_top + 510;
						$scope.certificate_top = $scope.certificate_top + 730;

					}
					else {
						$scope.temp_top = $scope.temp_top + (270 + 860);
						$scope.name_top = $scope.name_top + (390 + 730);
						$scope.managing_name_top = $scope.managing_name_top + (870 + 260);
						$scope.managing_partner_top = $scope.managing_partner_top + (890 + 240);
						$scope.accreditation_top = $scope.accreditation_top + (910 + 220);
						$scope.course_top = $scope.course_top + (510 + 620);
						$scope.certificate_top = $scope.certificate_top + (730 + 400);
					}
					
					$scope.img_tops[i] = $scope.temp_top;
					$scope.name_tops[i] = $scope.name_top;
					$scope.managing_name_tops[i] = $scope.managing_name_top;
					$scope.managing_partner_tops[i] = $scope.managing_partner_top;
					$scope.accreditation_tops[i] = $scope.accreditation_top;
					$scope.course_tops[i] = $scope.course_top;
					$scope.certificate_tops[i] = $scope.certificate_top;
				}
			});
		}
		else {
			$scope.loadDetail();
		}

		$scope.ok = function () {
			ReportingService.printCertificate(document.getElementById('printDiv'));	
		  	$modalInstance.close();
		};

		$scope.cancel = function () {
		  $modalInstance.dismiss('cancel');
		};
	}); 