	<?php
	defined('BASEPATH') OR exit('No direct script access allowed');

	/*
	| -------------------------------------------------------------------------
	| URI ROUTING
	| -------------------------------------------------------------------------
	| This file lets you re-map URI requests to specific controller functions.
	|
	| Typically there is a one-to-one relationship between a URL string
	| and its corresponding controller class/method. The segments in a
	| URL normally follow this pattern:
	|
	|	example.com/class/method/id/
	|
	| In some instances, however, you may want to remap this relationship
	| so that a different class/function is called than the one
	| corresponding to the URL.
	|
	| Please see the user guide for complete details:
	|
	|	https://codeigniter.com/user_guide/general/routing.html
	|
	| -------------------------------------------------------------------------
	| RESERVED ROUTES
	| -------------------------------------------------------------------------
	|
	| There are three reserved routes:
	|
	|	$route['default_controller'] = 'welcome';
	|
	| This route indicates which controller class should be loaded if the
	| URI contains no data. In the above example, the "welcome" class
	| would be loaded.
	|
	|	$route['404_override'] = 'errors/page_missing';
	|
	| This route will tell the Router which controller/method to use if those
	| provided in the URL cannot be matched to a valid route.
	|
	|	$route['translate_uri_dashes'] = FALSE;
	|
	| This is not exactly a route, but allows you to automatically route
	| controller and method names that contain dashes. '-' isn't a valid
	| class or method name character, so it requires translation.
	| When you set this option to TRUE, it will replace ALL dashes in the
	| controller and method URI segments.
	|
	| Examples:	my-controller/index	-> my_controller/index
	|		my-controller/my-method	-> mysql_connect()ntroller/my_method
	*/
	$route['default_controller'] = 'users';
	$route['home'] = 'main/home';
	$route['404_override'] = '';

	//routing user
	$route['signup']['post'] = 'users/signup';
	$route['signin']['get'] = 'users/signin';
	$route['change_password']['post'] = 'users/change_password';
	$route['update_user']['post'] = 'users/updateProfile';
	$route['update_profile_pic']['post'] = 'users/updateProfilePicture';
	$route['get_user_type']['get'] = 'users/getUserType';
	$route['get_user_detail']['get'] = 'users/getUserDetail';
	$route['get_user_detail_using_id']['get'] = 'users/getUserDetailUsingUserId';
	$route['users']['get'] = 'users/get_users';
	$route['change_status']['post'] = 'users/updateUserStatus';
	$route['change_user_type']['post'] = 'users/updateUserType';
	$route['filter_users']['get'] = 'users/filterUsers';
	//----------------------- 
	$route['current_user'] = 'users/retrieve_user';
	$route['destroy_user'] = 'users/destroy_session';
	$route['isLoggedIn'] = 'users/isLoggedIn';

	//course routes
	$route['add_course']['post'] = 'course_controller/add_course';
	$route['course_id']['get'] = 'course_controller/get_course_id_by_course_name';
	$route['course_detail']['get'] = 'course_controller/get_course_by_course_id';
	$route['course_list']= 'course_controller/courseList';
	$route['update_course']['post']= 'course_controller/updateCourse';
	$route['get_course_by_category_id']['get']= 'course_controller/get_course_by_category_id'; //gettting courses using category id
	$route['available_course']= 'course_controller/get_courses_that_has_trainings'; /// getting course that has trainings
	$route['get_course_by_training_id']['get']= 'course_controller/get_course_by_training_id'; /// getting course that has trainings

	//training routes
	$route['add_training']['post'] = 'trainings_controller/add_training'; //route for adding new training 
	$route['training_id']['get'] = 'trainings_controller/get_training_id_by_course_id'; //route for getting a specific training using a course_id 
	$route['upcoming_trainings']['get'] = 'trainings_controller/upcoming_trainings'; //route for getting a specific training using a course_id 
	$route['training_detail']['get'] = 'trainings_controller/get_training_by_training_id'; //route getting the training detail such as venue, date, etc. using a training id
	$route['trainings']['get'] = 'trainings_controller/get_trainings_list'; //route for getting all trainings
	$route['training_delegates']['get'] = 'trainings_controller/get_training_delegates'; //route for getting all training delegates for a specific training using training id
	$route['training_list_by_course']['get'] = 'trainings_controller/get_trainings_by_course'; //route for getting trainings using a course id
	$route['todaysTrainings']['get'] = 'trainings_controller/todaysTrainings'; //route for getting todays trainings
	$route['update_training']['post'] = 'trainings_controller/updateTraining'; //route for getting todays trainings
	$route['get_trainings_by_month']['get'] = 'trainings_controller/getTrainingsByMonth'; //route for getting todays trainings
	$route['count_training_delegates']['get'] = 'trainings_controller/count_training_delegates'; //route for getting todays trainings
	$route['get_training_detail']['get'] = 'trainings_controller/get_training_detail'; //route for getting todays trainings
	$route['add_training_expense']['post'] = 'trainings_controller/add_training_expense'; //route for getting todays trainings
	$route['get_training_expenses']['get'] = 'trainings_controller/get_training_expenses'; //route for getting todays trainings
	$route['delegates_from_training']['get'] = 'trainings_controller/delegates_from_training'; //route for getting todays trainings

	//routing training speaker APIs
	$route['add_speaker']['post'] = 'speaker_controller/add_training_speaker';
	$route['speaker_detail']['get'] = 'speaker_controller/get_speakers_by_speaker_id';
	$route['get_speaker_by_training_id']['get'] = 'speaker_controller/get_speaker_by_training_id';
	$route['speakers']['get'] = 'speaker_controller/speakerList';

	//routing delegates functions
	$route['add_delegate']['post'] = 'delegate_controller/add_delegate';
	$route['delegate_detail']['get'] = 'delegate_controller/get_delegate_by_delegate_id';
	$route['update_delegate']['post'] = 'delegate_controller/update_delegate';
	$route['all_delegates']['get'] = 'delegate_controller/delegateList';
	$route['delegate_details']['get'] = 'delegate_controller/delegate_details';
	$route['get_delegate_profile']['get'] = 'delegate_controller/get_delegate_profile';
	$route['get_delegate_trainings']['get'] = 'delegate_controller/get_delegate_trainings';
	$route['payment_detail']['get'] = 'delegate_controller/get_delegate_payment_details';
	$route['delegate_transactions']['get'] = 'delegate_controller/load_delegate_transaction';
	$route['check_delegate_number']['get'] = 'delegate_controller/check_delegate_number';
	$route['delegate_payments']['get'] = 'delegate_controller/get_delegate_payments';
	$route['get_max_or_no']['get'] = 'delegate_controller/get_max_or_no';

	//routing categories
	$route['add_category']['post'] = 'category_controller/add_category';
	$route['get_category']['get'] = 'category_controller/get_category_by_id';
	$route['categories']['get'] = 'category_controller/category_list';
	$route['update_category']['post'] = 'category_controller/update_category';

	//routing signatories controller
	$route['add_signatory']['post'] = 'signatories_controller/add_signatory';
	$route['get_signatories_using_training_id']['get'] = 'signatories_controller/get_signatories_by_training_id';
	$route['signatories']['get'] = 'signatories_controller/signatories';

	//routing training attended controller
	$route['add_delegate_to_training']['post'] = 'training_attended_controller/add_delegate_to_training';
	$route['check_delegate']['get'] = 'training_attended_controller/check_delegate';
	
	$route['translate_uri_dashes'] = FALSE;
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
