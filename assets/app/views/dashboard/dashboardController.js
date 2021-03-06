	
	angular.module('app').controller('dashboardController', function($scope, $http, dashboardFactory, trainingFactory, moment, toastr, $modal) {
		$scope.id = 0;
		/************  CALENDAR PART   ***************/
		var vm = this;
		vm.calendarView = 'month';
		vm.viewDate = new Date();
		vm.events = [];
		/*************  DATABASE QUERY ****************/
		$scope.trainings = [];
		trainingFactory.getTrainings().then(function(response) {
			if (response.data.length > 0) {
				$scope.trainings = response.data;
				var trainingID_values = [];
				var trainingTitles_values = [];
				var fromDate_values = [];
				var toDate_values = [];
				var locations = [];

				for(var i=0;i<$scope.trainings.length;i++) {
					var obj = $scope.trainings[i];
					for(var key in obj){
						var attrName = key;
						var attrValue = obj[key];
						if (attrName == 'training_id') trainingID_values.push(attrValue);
						if (attrName == 'course_name') trainingTitles_values.push(attrValue); 
						if (attrName == 'from_date') fromDate_values.push(attrValue);
						if (attrName == 'to_date') toDate_values.push(attrValue);
						if (attrName == 'location') locations.push(attrValue);
					}
				}
				//adding custom events from the database into the calendar :D
				for (var i = 0; i < response.data.length; i++) {
					vm.events.push({
						id: trainingID_values[i],
						title: trainingTitles_values[i] + ' @' + locations[i],
						type: 'info',
						startsAt: new Date(fromDate_values[i]),
						endsAt: new Date(fromDate_values[i]),
						draggable: true,
						resizable: true
					  });
				}
			}
			else {
				$scope.trainings = [];
			}
		});
		

		vm.isCellOpen = true;

		vm.eventClicked = function(event) {
			window.location = 'home#/app/training/todays-training?hellofromtheoutside=' + event.id;
			/*
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
			//gettting provided event date on event clicked :D
			var event_date = event.startsAt;
			dd = event_date.getDate();
			mm = event_date.getMonth()+1; //January is 0!
			yyyy = event_date.getFullYear();
			
			if(dd<10) {
				dd='0'+dd
			} 
			if(mm<10) {
				mm='0'+mm
			} 
			event_date = yyyy + '-' + mm + '-' + dd;
			if (event_date == current_date) {
				$scope.id = event.id;
				window.location = 'home#/app/training/todays-training?hellofromtheoutside=' + event.id;
			}
			else {
				$scope.openEventInfoModal();
			}
			*/
		}; 
		/*****************   END OF EVENT CLICK FUNCTION ***********************/
		
		vm.toggle = function($event, field, event) {
		  $event.preventDefault();
		  $event.stopPropagation();
		  event[field] = !event[field];
		};
		/*************    END CALENDAR PART  **************/
		
		//function to open modal
		$scope.openEventInfoModal = function() {
			var modalInstance = $modal.open({
				templateUrl: 'assets/app/views/dashboard/eventInfoModalView.html',
				controller: 'eventInfoModalController',
				size: 'lg',
				resolve: {
				  id: function () {
					return $scope.id;
				  }
				}
			});
			/*************   END OF OPEN EVENT INFO MODAL  **************/
		
		}
	});

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	