'use strict';

angular.module('app')
    .factory('delegateFactory', function($http, toastr, Upload, $timeout) {
        return {
			//add delegate, picture is uploaded
            addDelegate: function(data, file) {
                return file.upload = Upload.upload({
				url: 'add_delegate',
				data: {
					file: file, 
					training_id: data.training_id, 
					firstname: data.firstname, 
					middlename: data.middlename, 
					lastname: data.lastname, 
					email: data.email,
					company: data.company,
					company_position: data.position,
					phone: data.phone,
					industry: data.industry,
					address: data.address,
					gender: data.gender,
					picture_mode: data.picture_mode,
					user_id: data.user_id,
					amount_paid: data.amount_paid,
					or_no: data.or_no
				},
				}).success( function(response) {
					return response;
				}).error(function(response) {
					toastr.error('An error occured while adding the delegate detail. Please contact system administrator', 'ERROR');
					console.log(response);
				});
            },
			//add delegate but picture is taken from the camera
			addDelegate_take: function(data, imageData) {
				return $http({
                    url: 'add_delegate',
                    method: 'POST',
					data: $.param ({
						training_id: data.training_id, 
						firstname: data.firstname, 
						middlename: data.middlename, 
						lastname: data.lastname, 
						email: data.email,
						company: data.company,
						company_position: data.position,
						phone: data.phone,
						industry: data.industry,
						address: data.address,
						gender: data.gender,
						picture_mode: data.picture_mode,
						image_data: imageData,
						user_id: data.user_id,
						amount_paid: data.amount_paid,
						or_no: data.or_no
						}),
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(response) {
                    return response;
                }).error(function(response) {
                    toastr.error('An error occured. The server is not responding to the sent request. Please contact the system administrator.', 'ERROR');
                	console.log(response);
                });
            },
			getTrainingDelegatesUsingTrainingId: function(training_id) {
                return $http({
                    url: 'training_delegates?training_id=' + training_id,
                    method: 'GET'
                }).success(function(response) {
                    return response.data;
                }).error(function(response) {
                    toastr.error('An error occured. The server is not responding to the sent request. Please contact the system administrator.', 'ERROR');
                	console.log(response);
                });
            },

            showAllDelegates: function() {
                return $http({
                    url: 'all_delegates',
                    method: 'GET'
                }).success(function(response) {
                    return response.data;
                }).error(function(response) {
                    toastr.error('An error occured. The server is not responding to the sent request. Please contact the system administrator.', 'ERROR');
                	console.log(response);
                });
            }
        };
    });