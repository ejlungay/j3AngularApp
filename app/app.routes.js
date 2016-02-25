'use strict';

/**
 * @ngdoc overview
 * @name j3appApp
 * @description
 * # j3appApp
 *
 * Main module of the application.
 */
angular
  .module('j3appApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(['$httpProvider',function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }]) 
  .config(function ($routeProvider) {
    $routeProvider
		.when('/', {
			templateUrl: 'app/components/home/mainView.html',
			controller: 'MainCtrl'
		  })
		.when('/login', {
			templateUrl: 'app/components/login/loginView.html',
			controller: 'loginController'
		})
		.when('/home', {
			templateUrl: 'app/components/home/mainView.html',
			controller: 'MainCtrl'
		})
		.when('/signout', {
			templateUrl: 'app/components/signout/signoutView.html',
			controller: 'signOutController'
		})
		.when('/trainings', {
			templateUrl: 'app/components/trainings/trainingsView.html',
			controller: 'trainingsController'
		})
		.when('/participants', {
			templateUrl: 'app/components/participants/participantsView.html',
			controller: 'participantsController'
		})
		.when('/attendance', {
			templateUrl: 'app/components/reports/attendanceSheetView.html',
			controller: 'attendanceSheetController'
		})
		.when('/certificate', {
			templateUrl: 'app/components/reports/printCertificateView.html',
			controller: 'printCertificateController'
		})
		.otherwise({
			redirectTo: '/'
		});
  });
