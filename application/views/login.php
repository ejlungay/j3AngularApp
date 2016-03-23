<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Safety Solutions - Login</title>
  <meta name="J3 Safety Solutions Co." content="J3 Safety Solutions Co." />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
  <link rel="stylesheet" href="<?php echo base_url('assets/libs/assets/animate.css/animate.css');?>" type="text/css" />
  <link rel="stylesheet" href="<?php echo base_url('assets/libs/assets/font-awesome/css/font-awesome.css');?>" type="text/css" />
  <link rel="stylesheet" href="<?php echo base_url('assets/libs/jquery/waves/dist/waves.css');?>" type="text/css" />

  <link rel="stylesheet" href="<?php echo base_url('assets/libs/jquery/bootstrap/dist/css/bootstrap.css');?>" type="text/css" />
  <link rel="stylesheet" href="<?php echo base_url('assets/login-assets/styles/font.css');?>" type="text/css" />
  <link rel="stylesheet" href="<?php echo base_url('assets/login-assets/styles/app.css');?>" type="text/css" />
  <link rel="stylesheet" href="<?php echo base_url('assets/libs/angular/angular-toastr/dist/angular-toastr.min.css');?>"/>

</head>
<body>
<div class="app" style="background-color: #F5F5F5;">
  <div class="center-block w-xxl w-auto-xs p-v-md">
	<!-- Logo! -->
    <div class="navbar">
      <!--<img src="assets/img/j3newlogo.png" height="100" width="100" style="position: absolute; top: -10%;">-->
      <center><img src="<?php echo base_url('assets/img/header_logo.png');?>"></center>
    </div>
    <div class="p-lg panel md-whiteframe-z1 text-color m">
      <div class="m-b text-sm" style="color: #043E91">
        Sign in with your J3 Account
      </div>
      <?php echo form_open('users/login_method_2'); ?>
      <?php
        echo "<div class='error_msg'>";
        if (isset($error_message)) {
          echo $error_message;
        }
        echo validation_errors();
        echo "</div>";
      ?>
        <div class="md-form-group float-label">
          <input type="text" class="md-input" name="username" required>
          <label>Username</label>
        </div>
        <div class="md-form-group float-label">
          <input type="password" class="md-input" name="password" required>
          <label>Password</label>
        </div>      
        <div class="m-b-md">        
          <label class="md-check">
            <input type="checkbox"><i class="indigo"></i> Keep me signed in
          </label>
        </div>
        <div class="md-form-group">
           <span style="color: red;"><?php if (isset($_COOKIE['error'])) echo $_COOKIE['error'];?></span>
        </div>
        <button md-ink-ripple class="md-btn md-raised btn-block p-h-md" style="background-color: #043E91; color: white" type="submit">Sign in</button>
	   </form>
    </div>
  </div>
</div>
<!-- Scripts! -->
<script src="<?php echo base_url('assets/libs/angular/angular/angular.js');?>"></script>
<script src="<?php echo base_url('assets/libs/angular/angular-toastr/dist/angular-toastr.tpls.min.js');?>"></script>
<script src="<?php echo base_url('assets/libs/jquery/jquery/dist/jquery.js');?>"></script>
<script src="<?php echo base_url('assets/libs/jquery/bootstrap/dist/js/bootstrap.js');?>"></script>
<script src="<?php echo base_url('assets/libs/jquery/waves/dist/waves.js');?>"></script>

<script src="<?php echo base_url('assets/login-assets/scripts/ui-load.js');?>"></script>
<script src="<?php echo base_url('assets/login-assets/scripts/ui-jp.config.js');?>"></script>
<script src="<?php echo base_url('assets/login-assets/scripts/ui-jp.js');?>"></script>
<script src="<?php echo base_url('assets/login-assets/scripts/ui-nav.js');?>"></script>
<script src="<?php echo base_url('assets/login-assets/scripts/ui-toggle.js');?>"></script>
<script src="<?php echo base_url('assets/login-assets/scripts/ui-form.js');?>"></script>
<script src="<?php echo base_url('assets/login-assets/scripts/ui-waves.js');?>"></script>
<script src="<?php echo base_url('assets/login-assets/scripts/ui-client.js');?>"></script>
</body>
</html>
