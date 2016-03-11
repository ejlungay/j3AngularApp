	'use strict';

	angular.module('app')
		.factory('speakerFactory', function($http, toastr, Upload, $timeout) {
			return {
				addSpeaker: function(data, file) {
	                return file.upload = Upload.upload({
					url: 'add_speaker',
					data: {
						file: file, 
						training_id: data.training_id, 
						firstname: data.firstname, 
						middlename: data.middlename, 
						lastname: data.lastname, 
						email: data.email,
						company: data.company,
						company_position: data.position,
						phone: data.phone
					},
					}).success( function(data) {
						return data;
					}).error(function(data) {
						toastr.error('An error occured while adding the delegate detail. Please contact system administrator', 'ERROR');
						console.log(data);
					});
				},
				
				/*updateCategory: function(name, userid) {
					return $http({
						url: 'update_category',
						method: 'POST',
						data: $.param ({
							category_name: name, 
							category_id: userid
							}),
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}
					}).success(function(response) {
						return response;
					}).error(function(response) {
						toastr.error('An error occured. The server is not responding to the sent request. Please contact the system administrator. : ' + response, 'ERROR');
					});
				},*/
				
				get_speaker_by_training_id: function(id) {
					return $http({
						url: 'get_speaker_by_training_id?training_id=' + id,
						method: 'GET'
					}).success(function(response) {
						return response.data;
					}).error(function(response) {
						toastr.error('An error occured. The server is not responding to the sent request. Please contact the system administrator. : ' + response, 'ERROR');
					});
				}
			};
		});