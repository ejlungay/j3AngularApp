	
	angular.module('app').controller('certificateLayoutController', function($scope, $state, $modal, $stateParams, ReportingService) {

		$scope.participants = ['ako', 'ikaw'];

		$scope.print = function() {
			var modalInstance = $modal.open({
				templateUrl: 'assets/app/views/reports/certificateModalView.html',
				controller: 'certificateModalController',
				size: 'lg'/*,
				resolve: {
				  id: function () {
					return $scope.id;
				  }
				}*/
			});
		}
	});