	'use strict';

	angular.module('app')
		.factory('signatoryFactory', function($http, toastr, Upload, $timeout) {
			return {
				addSignatory: function(data) {
					return $http({
						url: 'add_signatory',
						method: 'POST',
						data: $.param ({
							firstname: data.firstname,
							middlename: data.middlename,
							lastname: data.lastname,
							position: data.position,
							accredition_no: data.accredition_no,
							user_id: data.user_id,
							training_id: data.training_id
							}),
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}
					}).success(function(response) {
						return response;
					}).error(function(response) {
						toastr.error('An error occured. The server is not responding to the sent request. Please contact the system administrator. : ' + response, 'ERROR');
					});
				},
				
				get_signatories_by_training_id: function(id) {
					return $http({
						url: 'get_signatories_using_training_id?training_id=' + id,
						method: 'GET'
					}).success(function(response) {
						return response.data;
					}).error(function(response) {
						toastr.error('An error occured. The server is not responding to the sent request. Please contact the system administrator. : ' + response, 'ERROR');
					});
				},

				signatories: function() {
					return $http({
						url: 'signatories',
						method: 'GET'
					}).success(function(response) {
						return response.data;
					}).error(function(response) {
						toastr.error('An error occured. The server is not responding to the sent request. Please contact the system administrator. : ' + response, 'ERROR');
					});
				}
			};
		});