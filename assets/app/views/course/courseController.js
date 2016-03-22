
	angular.module('app').controller('courseController', function($scope, $http, courseFactory, toastr, categoryFactory, userFactory) {
		
		$scope.verifyUser = function() {
			$scope.user_detail = [];
			//get the current logged on user
			var temp = document.cookie.split(';');
			var username = '';
			var userid = '';
			if (temp != null) {
				for (var i = 0; i < temp.length; i++) {
					if (temp[i].indexOf("username") > -1) {
						username = temp[i].split('=');
					}
				}
			}
			//get user detail from db
			userFactory.getUserDetail(username[1]).then(function(response) {
				console.log('-----', response.data);
				$scope.user_detail = response.data;

				for(var i=0;i<response.data.length;i++){
				var obj = response.data[i];
				for(var key in obj){
					var attrName = key;
					var attrValue = obj[key];
					
					if (attrName === 'user_type') {
						if (attrValue === 'Standard User') window.location = 'home#/app/404';
					}
				}
			}
			});
		}
		$scope.verifyUser();
		
		var itemId = 0;
		$('#btnCancel').hide();
		$scope.editMode = false;
		//do course list query here
		$scope.categories = [];
		$scope.loadCategories = function() {
			categoryFactory.categoryList().then(function(response) {
				if (response.data.length > 0) {
					$scope.categories = response.data;
				}
				else {
					$scope.categories = [];
				}
			});
		}
		$scope.loadCategories();
		//when add button is clicked
		$scope.addCategory = function() {
			//get the current logged on user
			var temp = document.cookie.split(';');
			var username = '';
			var userid = '';
			if (temp != null) {
				for (var i = 0; i < temp.length; i++) {
					if (temp[i].indexOf("username") > -1) {
						username = temp[i].split('=');
					}
				}
			}
			//get user detail from db
			userFactory.getUserDetail(username[1]).then(function(response) {
				for(var i = 0; i < response.data.length; i++){
					var obj = response.data[i];
					for(var key in obj){
						var attrName = key;
						var attrValue = obj[key];
						if (attrName == 'uid') {
							userid = attrValue;
							break;
						}
					}
				}
				//if editMode is false action = add new course
				if (!$scope.editMode) {
					if ($scope.category_name != null && $scope.description != null) {
						categoryFactory.addCategory($scope.category_name, userid, $scope.description).then(function(response) {
							if (response.data.returnValue == 'SUCCESS') {
								toastr.success('Successfully added');
								$scope.category_name = null;
								$scope.description = null;
								//update the table list
								$scope.loadCategories();
							}
							else {
								toastr.error('Unable to add course. Please check the names.');
							}
						});
					}
					//if editMode is true, action is edit exiting course
					else {
						toastr.error('Please input category name.');
					}
				}
				else {
					categoryFactory.updateCategory($scope.category_name, itemId, $scope.description).then(function(response) {
						if (response.data.returnValue == 'SUCCESS') {
							toastr.success('Successfully updated');
							$scope.category_id = null;
							$scope.category_name = null;
							$scope.description = null;
							//update the table list
							$scope.hide();
							$scope.loadCategories();
						}
						else {
							toastr.error('Unable to add course. Please check the names.');
						}
					});
				}
			});
		}
		//when edit button is clicked
		$scope.editCategory = function(category_id, category_name, description) {
			toastr.info('Edit mode');
			itemId = category_id;
			$scope.category_name = category_name;
			$('#btnCancel').show();
			$scope.description = description;
			$scope.editMode = true;
		}
		//when cancel button is clicked, hide it self
		$scope.hide = function () {
			$scope.category_id = null;
			$scope.category_name = null;
			$scope.description = null;
			$('#btnCancel').hide();
			$scope.editMode = false;
		}
	});
