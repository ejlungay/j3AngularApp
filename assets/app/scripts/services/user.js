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
                    url: 'isLoggedIn',
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
                        password: data.password1,
                        user_type: data.user_type
                     },
                }).success( function(response) {
                    return response;
                }).error(function(response) {
                    toastr.error('An error occured while adding the delegate detail. Please contact system administrator', 'ERROR');
                    console.log(response);
                });
            },  

            updateUserType: function(data) {
                return $http({
                    url: 'change_user_type',
                    method: 'POST',
                    data: $.param ({
                        userid: data.userid,
                        new_type: data.new_type
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).success(function(response) {
                    return response.data;
                }).error(function(response) {
                    toastr.error('An error occured. The server is not responding to the sent request. Please contact the system administrator. : ' + response, 'ERROR');
                });
            },

            updateUserStatus: function(data) {
                return $http({
                    url: 'change_status',
                    method: 'POST',
                    data: $.param ({
                        userid: data.userid,
                        new_status: data.new_status
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).success(function(response) {
                    return response.data;
                }).error(function(response) {
                    toastr.error('An error occured. The server is not responding to the sent request. Please contact the system administrator. : ' + response, 'ERROR');
                });
            },

            filterUsers: function(key) {
                return $http({
                    url: 'filter_users?key=' + key,
                    method: 'GET'
                }).success(function(response) {
                    return response.data;
                }).error(function(response) {
                    toastr.error('An error occured. The server is not responding to the sent request. Please contact the system administrator. : ' + response, 'ERROR');
                });
            },
            
            logout: function() {
                return $http({
                    url: 'destroy_user',
                    method: 'DELETE'
                }).success(function(response) {
                    document.cookie = 'username=';
                    return response.data;
                }).error(function(response) {
                    toastr.error('An error occured. The server is not responding to the sent request. Please contact the system administrator. : ' + response, 'ERROR');
                });
            },

            updateFullProfileWithPicture: function(data, file) {
                return file.upload = Upload.upload({
                    url: 'update_user',
                    data: {
                        file: file, 
                        firstname: data.firstname, 
                        middlename: data.middlename, 
                        lastname: data.lastname, 
                        username: data.username,
                        method: 'with_picture'
                     },
                }).success( function(response) {
                    return response;
                }).error(function(response) {
                    toastr.error('An error occured while adding the delegate detail. Please contact system administrator', 'ERROR');
                    console.log(response);
                });
            },

            updateFullProfileWithoutPicture: function(data) {
                return $http({
                    url: 'update_user',
                    method: 'POST',
                    data: $.param ({
                        firstname: data.firstname, 
                        middlename: data.middlename, 
                        lastname: data.lastname, 
                        username: data.username,
                        method: 'without_picture'
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).success(function(response) {
                    return response.data;
                }).error(function(response) {
                    toastr.error('An error occured. The server is not responding to the sent request. Please contact the system administrator. : ' + response, 'ERROR');
                });
            },

            login: function(data) {
                return $http({
                    url: 'signin?username='+ data.username +'&password=' + data.oldpassword,
                    method: 'GET'
                }).success(function(response) {
                    return response.data;
                }).error(function(response) {
                    toastr.error('An error occured. The server is not responding to the sent request. Please contact the system administrator. : ' + response, 'ERROR');
                });
            },

            change_password: function(data) {
                return $http({
                    url: 'change_password',
                    method: 'POST',
                    data: $.param ({
                        username: data.username,
                        password: data.newpassword1
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).success(function(response) {
                    return response.data;
                }).error(function(response) {
                    toastr.error('An error occured. The server is not responding to the sent request. Please contact the system administrator. : ' + response, 'ERROR');
                });
            }
        };
    });