'use strict';

angular.module('app')
    .factory('dashboardFactory', function($http, toastr) {
        return {
            upcomingTrainings: function() {
                return $http({
                    url: 'trainings',
                    method: 'GET'
                }).success(function(res) {
                    return res.data;
                }).error(function(response) {
                    toastr.error('An error occured. The server is not responding to the sent request. Please contact the system administrator. : ' + response, 'ERROR');
                });
            },
			isLoggedIn: function(username) {
				return $http({
                    url: 'isLoggedIn?username=' + username,
                    method: 'GET'
                }).success(function(res) {
                    return res.data;
                }).error(function(response) {
                    toastr.error('An error occured. The server is not responding to the sent request. Please contact the system administrator. : ' + response, 'ERROR');
                });
			}
        };
    });
