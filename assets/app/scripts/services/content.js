'use strict';

angular.module('app')
    .factory('contentFactory', function($http, toastr) {
        return {
            todaysTrainings: function() {
                return $http({
                    url: 'todaysTrainings',
                    method: 'GET'
                }).success(function(res) {
                    return res.data;
                }).error(function(response) {
                    toastr.error('An error occured. The server is not responding to the sent request. Please contact the system administrator. : ' + response, 'ERROR');
                });
            }
        };
    });
