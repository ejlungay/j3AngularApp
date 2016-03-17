	
	angular.module('app').controller('certificateLayoutController', function($scope, $state, $modal, $stateParams, ReportingService) {

		//alert($stateParams.id);

		$scope.print = function() {
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

			if (printWhat === 'all') {
				alert('print all');
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
		}
	});