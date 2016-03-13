<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>J3 Safety Solutions Co.</title>
  <meta name="J3 Safety Solutions Co." content="J3 Safety Solutions Co." />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

  <link rel="stylesheet" href="assets/libs/assets/animate.css/animate.css" type="text/css" />
  <link rel="stylesheet" href="assets/libs/assets/font-awesome/css/font-awesome.css" type="text/css" />

  <link rel="stylesheet" href="assets/libs/angular/angular-loading-bar/build/loading-bar.css" type="text/css" />
  <link rel="stylesheet" href="assets/libs/angular/angular-material/angular-material.css" type="text/css" />

  <link rel="stylesheet" href="assets/libs/jquery/bootstrap/dist/css/bootstrap.css" type="text/css" />
  
  <link rel="stylesheet" href="assets/app/styles/material-design-icons.css" type="text/css" />
  <link rel="stylesheet" href="assets/app/styles/font.css" type="text/css" />
  <link rel="stylesheet" href="assets/app/styles/app.css" type="text/css" />
  <!-- Calendar Again! -->
  <link href="assets/libs/angular/angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.min.css" rel="stylesheet">
  <!-- Toaster -->
  <link rel="stylesheet" href="assets/libs/angular/angular-toastr/dist/angular-toastr.min.css"/>
  
  <!-- CAMERA CSS --> 
  <link rel="stylesheet" href="assets/libs/angular/ng-camera/app/style.css"/>
</head>
<body ng-app="app">
  <div class="app" ui-view></div>
<!-- jQuery -->
  <script src="assets/libs/jquery/jquery/dist/jquery.js"></script>
  <script src="assets/libs/jquery/bootstrap/dist/js/bootstrap.js"></script>
<!-- Angular -->
  <script src="assets/libs/angular/angular/angular.js"></script>
  <script src="assets/libs/angular/angular-animate/angular-animate.js"></script>
  <script src="assets/libs/angular/angular-aria/angular-aria.js"></script>
  <script src="assets/libs/angular/angular-cookies/angular-cookies.js"></script>
  <script src="assets/libs/angular/angular-messages/angular-messages.js"></script>
  <script src="assets/libs/angular/angular-resource/angular-resource.js"></script>
  <script src="assets/libs/angular/angular-sanitize/angular-sanitize.js"></script>
  <script src="assets/libs/angular/angular-touch/angular-touch.js"></script>
  <script src="assets/libs/angular/angular-material/angular-material.js"></script>
  <script src="assets/libs/angular/ng-file-upload-shim/ng-file-upload.js"></script>
  <script src="assets/libs/angular/ng-file-upload-shim/ng-file-upload-shim.js"></script>

  <!-- Vendor -->
  <script src="assets/libs/angular/angular-ui-router/release/angular-ui-router.js"></script>
  <script src="assets/libs/angular/ngstorage/ngStorage.js"></script>
  <script src="assets/libs/angular/angular-ui-utils/ui-utils.js"></script>
  
  <!-- bootstrap -->
  <script src="assets/libs/angular/angular-bootstrap/ui-bootstrap-tpls.js"></script>

  <!-- lazyload -->
  <script src="assets/libs/angular/oclazyload/dist/ocLazyLoad.js"></script>
  <!-- translate -->
  <script src="assets/libs/angular/angular-translate/angular-translate.js"></script>
  <script src="assets/libs/angular/angular-translate-loader-static-files/angular-translate-loader-static-files.js"></script>
  <script src="assets/libs/angular/angular-translate-storage-cookie/angular-translate-storage-cookie.js"></script>
  <script src="assets/libs/angular/angular-translate-storage-local/angular-translate-storage-local.js"></script>
  <script src="assets/libs/angular/angular-toastr/dist/angular-toastr.tpls.min.js"></script>
  <!-- jquery, moment, and angular have to get included before fullcalendar -->
 <script type="text/javascript" src="assets/libs/angular/moment/min/moment.min.js"></script>
 <script src="assets/libs/angular/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.min.js"></script>
 
 <!--------------- CAMERA ----------------->
 <script src="assets/libs/angular/ng-camera/dist/ng-camera.js"></script>
 <script src="assets/libs/angular/webcamjs/webcam.js"></script>
 
 <script src="assets/libs/jquery/webcam/jquery.webcam.js"></script>

  <!-- loading-bar -->
  <script src="assets/libs/angular/angular-loading-bar/build/loading-bar.js"></script>

<!-- App -->
  <script src="assets/app/scripts/app.js"></script>
  <script src="assets/app/scripts/config.js"></script>
  <script src="assets/app/scripts/config.lazyload.js"></script>
  <script src="assets/app/scripts/config.router.js"></script> <!-- App router -->
  <script src="assets/app/scripts/app.ctrl.js"></script>
  

  <script src="assets/app/scripts/directives/lazyload.js"></script>
  <script src="assets/app/scripts/directives/ui-jp.js"></script>
  <script src="assets/app/scripts/directives/ui-nav.js"></script>
  <script src="assets/app/scripts/directives/ui-fullscreen.js"></script>
  <script src="assets/app/scripts/directives/ui-scroll.js"></script>c
  <script src="assets/app/scripts/directives/ui-toggle.js"></script>
  <script src="assets/app/scripts/filters/fromnow.js"></script>
  <script src="assets/app/scripts/services/ngstore.js"></script>
  <script src="assets/app/scripts/services/ui-load.js"></script>

  <!-- Pages Controller Scripts -->
  <script src="assets/app/views/dashboard/dashboardController.js"></script>
  <script src="assets/app/views/course/courseController.js"></script>
  <script src="assets/app/views/trainings/addtrainingController.js"></script>
  <script src="assets/app/views/contentController.js"></script>
  <script src="assets/app/views/partials/noficationController.js"></script>
  <script src="assets/app/views/dashboard/eventInfoModalController.js"></script>
  <script src="assets/app/views/trainings/todaysTrainingController.js"></script>
  
  <script src="assets/app/views/participants/addParticipantController.js"></script>
  <script src="assets/app/views/participants/participantsController.js"></script>
  <script src="assets/app/views/participants/addParticipantModalController.js"></script>
  <script src="assets/app/views/participants/delegateProfileModalController.js"></script>
  
  <script src="assets/app/views/trainings/trainingsController.js"></script>
  <script src="assets/app/views/trainings/addTrainingModalController.js"></script>
  <script src="assets/app/views/trainings/initializeAddtrainingController.js"></script>
  <script src="assets/app/views/trainings/addTrainingScheduleController.js"></script>
  <script src="assets/app/views/trainings/editTrainingController.js"></script>
  <script src="assets/app/views/trainings/aboutTrainingController.js"></script>
  <!-- REPORTS -->
   <script src="assets/app/views/reports/attendanceController.js"></script>
   <script src="assets/app/views/reports/certificateController.js"></script>
   <script src="assets/app/views/reports/certificateLayoutController.js"></script>
   <script src="assets/app/views/reports/editCertificateDetailModalController.js"></script>
   <script src="assets/app/views/reports/directoryController.js"></script>
   <script src="assets/app/views/reports/printDirectoryController.js"></script>
  <!-- Pages Services Scripts -->
  <script src="assets/app/scripts/services/course.js"></script>
  <script src="assets/app/scripts/services/training.js"></script>
  <script src="assets/app/scripts/services/dashboard.js"></script>
  <script src="assets/app/scripts/services/content.js"></script>
  <script src="assets/app/scripts/services/delegate.js"></script>
  <script src="assets/app/scripts/services/user.js"></script>
  <script src="assets/app/scripts/services/category.js"></script>
  <script src="assets/app/scripts/services/speaker.js"></script>
  <script src="assets/app/scripts/services/signatory.js"></script>
</body>
</html>






