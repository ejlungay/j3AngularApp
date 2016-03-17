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
					or_no: data.or_no,
                    delegate_number: data.delegate_number
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
						or_no: data.or_no,
                        delegate_number: data.delegate_number
						}),
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(response) {
                    return response;
                }).error(function(response) {
                    toastr.error('An error occured. The server is not responding to the sent request. Please contact the system administrator.', 'ERROR');
                	
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
            },

            get_delegate_details: function(id) {
                return $http({
                    url: 'delegate_details?delegate_id=' + id,
                    method: 'GET'
                }).success(function(response) {
                    return response.data;
                }).error(function(response) {
                    toastr.error('An error occured. The server is not responding to the sent request. Please contact the system administrator.', 'ERROR');
                	console.log(response);
                });
            },

            updateDelegate: function(datum, file) {
				return file.upload = Upload.upload({
                    url: 'update_delegate',
					data: {
						delegate_id: datum.delegate_id, 
						firstname: datum.firstname, 
						middlename: datum.middlename, 
						lastname: datum.lastname, 
						email: datum.email,
						company: datum.company,
						company_position: datum.position,
						phone: datum.phone,
						industry: datum.industry,
						address: datum.address,
						delegate_number: datum.number,
						file: file
					}
                }).success(function(response) {
                    return response;
                }).error(function(response) {
                    toastr.error('An error occured. The server is not responding to the sent request. Please contact the system administrator.', 'ERROR');
                	console.log(response);
                });
            },

            addDelegateToTraining: function(data) {
				return $http({
                    url: 'add_delegate_to_training',
                    method: 'POST',
					data: $.param ({
						training_id: data.training_id, 
						delegate_id: data.delegate_id
						}),
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(response) {
                    return response;
                }).error(function(response) {
                    toastr.error('An error occured. The server is not responding to the sent request. Please contact the system administrator.', 'ERROR');
                	
                });
            },

            checkDelegate: function(data) {
                return $http({
                    url: 'check_delegate?delegate_id=' + data.delegate_id + '&training_id=' + data.training_id,
                    method: 'GET'
                }).success(function(response) {
                    return response.data;
                }).error(function(response) {
                    toastr.error('An error occured. The server is not responding to the sent request. Please contact the system administrator.', 'ERROR');
                	console.log(response);
                });
            },
            
            get_delegate_profile: function(id) {
                return $http({
                    url: 'get_delegate_profile?delegate_id=' + id,
                    method: 'GET'
                }).success(function(response) {
                    return response.data;
                }).error(function(response) {
                    toastr.error('An error occured. The server is not responding to the sent request. Please contact the system administrator.', 'ERROR');
                    console.log(response);
                });
            },

            get_delegate_trainings: function(id) {
                return $http({
                    url: 'get_delegate_trainings?delegate_id=' + id,
                    method: 'GET'
                }).success(function(response) {
                    return response.data;
                }).error(function(response) {
                    toastr.error('An error occured. The server is not responding to the sent request. Please contact the system administrator.', 'ERROR');
                    console.log(response);
                });
            },

            
            get_delegate_transactions: function(data) {
                return $http({
                    url: 'delegate_transactions?delegate_id=' + data.delegate_id + '&training_id=' + data.training_id,
                    method: 'GET'
                }).success(function(response) {
                    return response.data;
                }).error(function(response) {
                    toastr.error('An error occured. The server is not responding to the sent request. Please contact the system administrator.', 'ERROR');
                    console.log(response);
                });
            },

            delegates_from_training: function(training_id) {
                return $http({
                    url: 'delegates_from_training?training_id=' + training_id,
                    method: 'GET'
                }).success(function(response) {
                    return response.data;
                }).error(function(response) {
                    toastr.error('An error occured. The server is not responding to the sent request. Please contact the system administrator.', 'ERROR');
                    console.log(response);
                });
            },

            check_delegate_number: function(number) {
                return $http({
                    url: 'check_delegate_number?delegate_number=' + number,
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