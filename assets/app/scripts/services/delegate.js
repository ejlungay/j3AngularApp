'use strict';

angular.module('app')
    .factory('delegateFactory', function($http, toastr, Upload, $timeout) {
        return {
			//add delegate, picture is uploaded
            addDelegate: function(trainingId, fname, mname, lname, user_email, user_company, company_industry, companyPosition, user_phone, file, user_gender, user_address, pictureMode, userId, amountPaid, orNo) {
                return file.upload = Upload.upload({
				url: 'add_delegate',
				data: {
					file: file, 
					training_id: trainingId, 
					firstname: fname, 
					middlename: mname, 
					lastname: lname, 
					email: user_email,
					company: user_company,
					company_position: companyPosition,
					phone: user_phone,
					industry: company_industry,
					address: user_address,
					gender: user_gender,
					picture_mode: pictureMode,
					user_id: userId,
					amount_paid: amountPaid,
					or_no: orNo
				},
				}).success( function(data) {
					return data;
				}).error(function(data) {
					toastr.error('An error occured while adding the delegate detail. Please contact system administrator', 'ERROR');
					console.log(data);
				});
            },
			//add delegate but picture is taken from the camera
			addDelegate_take: function(trainingId, fname, mname, lname, user_email, user_company, company_industry, companyPosition, user_phone, user_gender, user_address, pictureMode, imageData, userId, amountPaid, orNo) {
				return $http({
                    url: 'add_delegate',
                    method: 'POST',
					data: $.param ({
						training_id: trainingId, 
						firstname: fname, 
						middlename: mname, 
						lastname: lname, 
						email: user_email,
						company: user_company,
						company_position: companyPosition,
						phone: user_phone,
						industry: company_industry,
						address: user_address,
						gender: user_gender,
						picture_mode: pictureMode,
						image_data: imageData,
						user_id: userId,
						amount_paid: amountPaid,
						or_no: orNo
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