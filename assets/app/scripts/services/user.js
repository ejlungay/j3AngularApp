'use strict';

angular.module('app')
    .factory('userFactory', function($http, toastr, Upload, $timeout) {
        return {
			getUserDetail: function(username) {
                return $http({
                    url: 'get_user_detail?username=' + username,
                    method: 'GET'
                }).success(function(response) {
                    return response.data;
                }).error(function(response) {
                    toastr.error('An error occured. The server is not responding to the sent request. Please contact the system administrator. : ' + response, 'ERROR');
                });
            },

            getUserDetailUsingUserId: function(id) {
                return $http({
                    url: 'get_user_detail_using_id?userid=' + id,
                    method: 'GET'
                }).success(function(response) {
                    return response.data;
                }).error(function(response) {
                    toastr.error('An error occured. The server is not responding to the sent request. Please contact the system administrator. : ' + response, 'ERROR');
                });
            },

            isLoggedIn: function(username) {
                return $http({
                    url: 'isLoggedIn?username=' + username,
                    method: 'GET'
                }).success(function(response) {
                    return response.data;
                }).error(function(response) {
                    toastr.error('An error occured. The server is not responding to the sent request. Please contact the system administrator. : ' + response, 'ERROR');
                });
            },

            users: function() {
                return $http({
                    url: 'users',
                    method: 'GET'
                }).success(function(response) {
                    return response.data;
                }).error(function(response) {
                    toastr.error('An error occured. The server is not responding to the sent request. Please contact the system administrator. : ' + response, 'ERROR');
                });
            },

            signup: function(data, file) {
                return file.upload = Upload.upload({
                    url: 'signup',
                    data: {
                        file: file, 
                        firstname: data.firstname, 
                        middlename: data.middlename, 
                        lastname: data.lastname, 
                        username: data.username,
                        password: data.password,
                        user_type: data.user_type
                     },
                }).success( function(response) {
                    return response;
                }).error(function(response) {
                    toastr.error('An error occured while adding the delegate detail. Please contact system administrator', 'ERROR');
                    console.log(response);
                });
            }    
        };
    });