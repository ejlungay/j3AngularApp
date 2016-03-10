'use strict';

angular.module('app')
    .factory('userFactory', function($http, toastr) {
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
            }
        };
    });