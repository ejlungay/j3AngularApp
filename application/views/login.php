<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Safety Solutions - Login</title>
  <meta name="J3 Safety Solutions Co." content="J3 Safety Solutions Co." />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
  <link rel="stylesheet" href="assets/libs/assets/animate.css/animate.css" type="text/css" />
  <link rel="stylesheet" href="assets/libs/assets/font-awesome/css/font-awesome.css" type="text/css" />
  <link rel="stylesheet" href="assets/libs/jquery/waves/dist/waves.css" type="text/css" />
  <link rel="stylesheet" href="assets/login-assets/material-design-icons.css" type="text/css" />

  <link rel="stylesheet" href="assets/libs/jquery/bootstrap/dist/css/bootstrap.css" type="text/css" />
  <link rel="stylesheet" href="assets/login-assets/styles/font.css" type="text/css" />
  <link rel="stylesheet" href="assets/login-assets/styles/app.css" type="text/css" />
  <link rel="stylesheet" href="assets/libs/angular/angular-toastr/dist/angular-toastr.min.css"/>

</head>
<body>
<div class="app bg-info">
  <div class="center-block w-xxl w-auto-xs p-v-md">
	<!-- Logo! -->
    <div class="navbar">
      <div class="navbar-brand m-t-lg text-center">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve" style="
                width: 24px; height: 24px;">
          <path d="M 50 0 L 100 14 L 92 80 Z" fill="rgba(139, 195, 74, 0.5)"></path>
          <path d="M 92 80 L 50 0 L 50 100 Z" fill="rgba(139, 195, 74, 0.8)"></path>
          <path d="M 8 80 L 50 0 L 50 100 Z" fill="#fff"></path>
          <path d="M 50 0 L 8 80 L 0 14 Z" fill="rgba(255, 255, 255, 0.6)"></path>
        </svg>
        <span class="m-l inline">j3safetysolutions co.</span>
      </div>
    </div>
    <div class="p-lg panel md-whiteframe-z1 text-color m"  ng-app="app" ng-controller="loginController">
      <div class="m-b text-sm">
        Sign in with your J3 Account
      </div>
      <form>
        <div class="md-form-group float-label">
          <input type="text" class="md-input" name="username" required ng-model="username">
          <label>Username</label>
        </div>
        <div class="md-form-group float-label">
          <input type="password" class="md-input" name="password" required ng-model="password">
          <label>Password</label>
        </div>      
        <div class="m-b-md">        
          <label class="md-check">
            <input type="checkbox"><i class="indigo"></i> Keep me signed in
          </label>
        </div>
        <button md-ink-ripple class="md-btn md-raised pink btn-block p-h-md" ng-click="login()">Sign in</button>
	   </form>
    </div>
  </div>
</div>
<!-- Scripts! -->
<script src="assets/libs/angular/angular/angular.js"></script>
<script src="assets/libs/angular/angular-toastr/dist/angular-toastr.tpls.min.js"></script>
<script src="assets/libs/jquery/jquery/dist/jquery.js"></script>
<script src="assets/libs/jquery/bootstrap/dist/js/bootstrap.js"></script>
<script src="assets/libs/jquery/waves/dist/waves.js"></script>

<script src="assets/login-assets/scripts/ui-load.js"></script>
<script src="assets/login-assets/scripts/ui-jp.config.js"></script>
<script src="assets/login-assets/scripts/ui-jp.js"></script>
<script src="assets/login-assets/scripts/ui-nav.js"></script>
<script src="assets/login-assets/scripts/ui-toggle.js"></script>
<script src="assets/login-assets/scripts/ui-form.js"></script>
<script src="assets/login-assets/scripts/ui-waves.js"></script>
<script src="assets/login-assets/scripts/ui-client.js"></script>

<script>
	var app = angular.module('app', ['toastr']).controller('loginController', function($scope, $http, toastr) {
		$scope.login = function() {
			if ($.trim($scope.username) != null && $.trim($scope.password) != null) {
				$http.get('signin?username=' + $scope.username + '&password=' + $scope.password).success(function(response) {
					if (response.returnValue == 'SUCCESS') {
						document.cookie = 'username=' + response.username;
						window.location="home";
					}
					else {
						toastr.error('Invalid username or password.');
					}
 				}).error(function(response) {
					toastr.error('En error occured while communicating with the server. Please contact system administrator. Error detail: ' + response);
				});
			}
		}
	});
</script>
</body>
</html>
