'use strict';

/**
 * @ngdoc function
 * @name app.config:uiRouter
 * @description
 * # Config
 * Config for the router
 */
angular.module('app')
  .run(['$rootScope', '$state', '$stateParams', 'userFactory', function ( $rootScope, $state, $stateParams, userFactory) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.$on('$stateChangeStart', function (event) {
          var temp = document.cookie.split(';');
          var username = '';
          if (temp != null) {
            for (var i = 0; i < temp.length; i++) {
              if (temp[i].indexOf("username") > -1) {
                username = temp[i].split('=');
              }
            }

            if (username[1] != '') {
              userFactory.isLoggedIn(username[1]).then(function(response) {
                if (response.data.returnValue == 'FALSE') {
                  event.preventDefault();
                  window.location.href="index.php";
                }
              });
            }
            else {
              window.location.href="index.php";
            }
          }
          else {
            alert('You are not logged in! Please login to continue.');
              window.location.href="index.php";
          }
        });

      }
  ])
  .config(
    [          '$stateProvider', '$urlRouterProvider', 'MODULE_CONFIG',
      function ( $stateProvider,   $urlRouterProvider,  MODULE_CONFIG ) {
        $urlRouterProvider
          .otherwise('/app/dashboard');
        $stateProvider
          .state('app', {
			abstract: true,
            url: '/app',
            views: {
              '': {
                templateUrl: 'assets/app/views/layout.html'
              },
              'aside': {
                templateUrl: 'assets/app/views/aside.html'
              },
              'content': {
                templateUrl: 'assets/app/views/content.html'
              }
            }
          })
          .state('app.dashboard', {
             url: '/dashboard',
             templateUrl: 'assets/app/views/dashboard/dashboardView.html',
             data : { title: 'Dashboard' },
			 controller: 'dashboardController'
           })
          .state('app.timeline', {
            url: '/timeline',
            templateUrl: 'assets/app/views/dashboard/timelineView.html',
            data : { title: 'J3 Timeline' }
          })
		  .state('app.courselist', {
             url: '/courselist',
             templateUrl: 'assets/app/views/course/courseListView.html',
             data : { title: 'J3 Course List' },
			 controller: 'courseController'
           })
		  .state('app.trainings', {
             url: '/trainings',
             templateUrl: 'assets/app/views/trainings/trainingsView.html',
             data : { title: 'J3 Trainings' }
           })
		  .state('app.trainingadd', {
             url: '/trainingsadd',
             templateUrl: 'assets/app/views/trainings/addtrainingView.html',
             data : { title: 'J3 Add Training' }
           })
		   .state('app.todays-training', {
             url: '/training/todays-training',
             templateUrl: 'assets/app/views/trainings/todaysTrainingView.html',
             data : { title: 'Today\'s training' }
           })
		   .state('app.add-training', {
             url: '/training/add-training',
             templateUrl: 'assets/app/views/trainings/initializeAddtrainingViews.html',
             data : { title: 'Select what to add' }
           })
		  .state('app.participants', {
             url: '/participants',
             templateUrl: 'assets/app/views/participants/participantsView.html',
             data : { title: 'Training participants' }
           })
		  .state('app.participantsadd', {
             url: '/participantsadd',
             templateUrl: 'assets/app/views/participants/addParticipantView.html',
             data : { title: 'Add participants' }
           })
		  .state('app.attendance', {
             url: '/attendance',
             templateUrl: 'assets/app/views/reports/attendanceView.html',
             data : { title: 'Training attendance' }
           })
		  .state('app.certificates', {
             url: '/certificates',
             templateUrl: 'assets/app/views/reports/certificateView.html',
             data : { title: 'Training certificates' }
           })
      .state('app.delegate-certificates', {
             url: '/certificates/delegate-certificates/:id',
             templateUrl: 'assets/app/views/reports/certificateLayoutView.html',
             data : { title: 'Participant Certificate' }
           })
		  .state('app.directory', {
             url: '/directory',
             templateUrl: 'assets/app/views/reports/directoryView.html',
             data : { title: 'Training directories' }
           })
		   .state('app.print-directory', {
             url: '/directory/print-directory/:training_id',
             templateUrl: 'assets/app/views/reports/printDirectoryView.html',
             data : { title: 'Print' }
           })
		  .state('app.financial', {
             url: '/financial',
             templateUrl: 'assets/app/views/reports/financialView.html',
             data : { title: 'Financial Report' }
           })
		  .state('app.users', {
             url: '/users',
             templateUrl: 'assets/app/views/user-management/usersView.html',
             data : { title: 'Users' }
        })
      .state('app.profile', {
             url: '/users/user-profile',
             templateUrl: 'assets/app/views/user-management/userProfileView.html',
             data : { title: 'My Profile' }
        })
		   .state('app.error', {
             url: '/404',
             templateUrl: 'assets/app/views/404/pageErrorView.html',
             data : { title: 'Users' }
           })
          ;


          function load(srcs, callback) {
            return {
                deps: ['$ocLazyLoad', '$q',
                  function( $ocLazyLoad, $q ){
                    var deferred = $q.defer();
                    var promise  = false;
                    srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                    if(!promise){
                      promise = deferred.promise;
                    }
                    angular.forEach(srcs, function(src) {
                      promise = promise.then( function(){
                        angular.forEach(MODULE_CONFIG, function(module) {
                          if( module.name == src){
                            if(!module.module){
                              name = module.files;
                            }else{
                              name = module.name;
                            }
                          }else{
                            name = src;
                          }
                        });
                        return $ocLazyLoad.load(name);
                      } );
                    });
                    deferred.resolve();
                    return callback ? promise.then(function(){ return callback(); }) : promise;
                }]
            }
          }
      }
    ]
  );
