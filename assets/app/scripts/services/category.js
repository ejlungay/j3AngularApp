	'use strict';

	angular.module('app')
		.factory('categoryFactory', function($http, toastr) {
			return {
				addCategory: function(name, userid, description) {
					return $http({
						url: 'add_category',
						method: 'POST',
						data: $.param ({
							category_name: name, 
							user_id: userid,
							description: description
							}),
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}
					}).success(function(response) {
						return response;
					}).error(function(response) {
						toastr.error('An error occured. The server is not responding to the sent request. Please contact the system administrator. : ' + response, 'ERROR');
					});
				},
				
				updateCategory: function(name, userid) {
					return $http({
						url: 'update_category',
						method: 'POST',
						data: $.param ({
							category_name: name, 
							category_id: userid
							}),
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}
					}).success(function(response) {
						return response;
					}).error(function(response) {
						toastr.error('An error occured. The server is not responding to the sent request. Please contact the system administrator. : ' + response, 'ERROR');
					});
				},
				
				categoryList: function() {
					return $http({
						url: 'categories',
						method: 'GET'
					}).success(function(response) {
						return response.data;
					}).error(function(response) {
						toastr.error('An error occured. The server is not responding to the sent request. Please contact the system administrator. : ' + response, 'ERROR');
					});
				}
			};
		});