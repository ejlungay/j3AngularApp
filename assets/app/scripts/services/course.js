'use strict';

angular.module('app')
    .factory('courseFactory', function($http, toastr) {
        return {
            addCourse: function(courseName, courseCode, userId, categoryId) {
                return $http({
                    url: 'add_course',
                    method: 'POST',
					data: $.param ({
						course_name: courseName,
						course_code: courseCode,
						user_id: userId,
						category_id: categoryId }),
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(response) {
                    return response;
                }).error(function(response) {
                    toastr.error('An error occured. The server is not responding to the sent request. Please contact the system administrator.', 'ERROR');
					console.error(response);
				});
            },
			
			updateCourse: function(courseId, courseName, courseCode) {
                return $http({
                    url: 'update_course',
                    method: 'POST',
					data: $.param ({
						course_name: courseName,
						course_code: courseCode,
						course_id: courseId}),
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(response) {
                    return response;
                }).error(function(response) {
                    toastr.error('An error occured. The server is not responding to the sent request. Please contact the system administrator.', 'ERROR');
					console.error(response);
				});
            },
			
			loadCourseByCategoryId: function(category_id) {
                return $http({
                    url: 'get_course_by_category_id?category_id=' + category_id,
                    method: 'GET'
                }).success(function(response) {
                    return response.data;
                }).error(function(response) {
                    toastr.error('An error occured. The server is not responding to the sent request. Please contact the system administrator.', 'ERROR');
					console.error(response);
				});
            },
			
			courseList: function() {
                return $http({
                    url: 'course_list',
                    method: 'GET'
                }).success(function(response) {
                    return response.data;
                }).error(function(response) {
                    toastr.error('An error occured. The server is not responding to the sent request. Please contact the system administrator.', 'ERROR');
					console.error(response);
				});
            },

            load_courses_that_has_trainings: function() {
                return $http({
                    url: 'available_course',
                    method: 'GET'
                }).success(function(response) {
                    return response.data;
                }).error(function(response) {
                    toastr.error('An error occured. The server is not responding to the sent request. Please contact the system administrator.', 'ERROR');
                    console.error(response);
                });
            }
        };
    });
