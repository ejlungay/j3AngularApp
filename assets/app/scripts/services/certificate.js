'use strict';

angular.module('app')
    .factory('certificateFactory', function($http, toastr) {
        return {
            addCourse: function(courseName, courseCode, userId) {
                return $http({
                    url: 'add_course',
                    method: 'POST',
					data: $.param ({
						course_name: courseName,
						course_code: courseCode,
						user_id: userId}),
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(response) {
                    return response;
                }).error(function(response) {
                    toastr.error('An error occured. The server is not responding to the sent request. Please contact the system administrator. : ' + response, 'ERROR');
                });
            }
        };
    });
