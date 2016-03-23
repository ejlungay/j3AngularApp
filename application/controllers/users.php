<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
 
class Users extends CI_Controller {
    function __construct() {
		parent::__construct();
		$this->load->model('user','',TRUE);
		$this->load->helper('url');
		$this->load->library('form_validation');
		//enabling CORS
		header('Access-Control-Allow-Origin: *');
		header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
		header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
		$method = $_SERVER['REQUEST_METHOD'];
		if($method == "OPTIONS") {
			die();
		}
    }
     
    function index() {
		$this->load->view('login');
    }
	 
	//function to retrieve user session
	function retrieve_user() {
		$this->load->helper('file');
		$username = $this->input->get('username');
		if ($username != null) {
			$file = './21232f297a57a5a743894a0e4a801fc3/'.$username.'.txt';
			//ee11cbb19052e40b07aac0ca060c23ee = md5('admin') :D
			if (file_exists($file)) {
				$ee11cbb19052e40b07aac0ca060c23ee = explode(';', read_file($file));
				if ($ee11cbb19052e40b07aac0ca060c23ee[0] != null) {
					$json_response = array('uid' => $ee11cbb19052e40b07aac0ca060c23ee[0]);    

					$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
				}
			}
			else {
				$json_response = array('returnMessage'=>'User data does not exist',
									   'returnValue'=>'FAILURE');    

				$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
			}
		}
		else {
			$json_response = array('returnMessage'=>'Invalid request parameters',
									   'returnValue'=>'FAILURE');    

			$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
		}
	}
	//function to destroy user session
	function destroy_session() {
		$this->session->unset_userdata('authentication');
		redirect('login', 'refresh');
	}
	
    function signin() {
		$username = $this->input->get('username');
		$password = $this->input->get('password');
		
		if ($username != null && $password != null) {

			$temp = $this->user->checkStatus($username);

			if ($temp === 'INACTIVE') {
				$json_response = array('returnMessage' => 'Your account has been deactivated. Please consult administrator for assistance.',
									   'returnValue' => 'FAILURE');    

				$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
			}
			else {
				$result = $this->user->login($username, $password);
				if($result) {
					//assign each item of the result as row
					foreach ($result as $row)
					//get the IP address of the client for authentication purposes
					$ip = '';
					if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
						$ip = $_SERVER['HTTP_CLIENT_IP'];
					} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
						$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
					} else {
						$ip = $_SERVER['REMOTE_ADDR'];
					}
					/* Creating a custom authentication, save the data to a text file
					* Instead of cookies, I use text file
					*/
					$this->load->helper('file');
					date_default_timezone_set('Asia/Manila');
					//create a file name as the username
					$file = './21232f297a57a5a743894a0e4a801fc3/'.$username.'.txt';
					$handle = fopen($file, 'w') or die('Cannot open file:  '.$file);
					//the data to be stored in the text file; format: uid;IP;date/time
					$data = $row->uid.';'.$ip.';'.date('Y-m-d H:i:s', time());
					if (!file_exists($file) || !write_file($file, $data)){
						 echo 'Unable to write the file';
						 die();
					}
					
					$json_response = array('userid' => $row->uid,
										   'username' => $row->username,
										   'firstname' => $row->firstname,
										   'middlename' => $row->middlename,
										   'lastname' => $row->lastname,
										   'image' => $row->image,
										   'user_type' => $row->user_type,
										   'returnMessage'=>'User validated',
										   'returnValue'=>'SUCCESS');    

						$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
					}
				   else {
						$json_response = array('returnMessage' => 'Invalid username or password.',
											   'returnValue' => 'FAILURE');    

						$this->output->set_content_type('application/json')->set_output(json_encode($json_response));

						return false;
					}
				}
			}
			else {
				$json_response = array('returnMessage'=>'Invalid request parameters',
										   'returnValue'=>'FAILURE');    

				$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
			}
    }
	
	//function to check if user is logged in
	function isLoggedIn() {
		if($this->session->userdata('authentication')) {
			$this->output->set_content_type('application/json')->set_output(json_encode($this->session->userdata('authentication'))); 
		}else{
			redirect('login', 'refresh');
		}
	}
	
    public function signup() {
		$this->load->helper('url');
        $this->load->database();

        $isDuplicated = $this->user->checkDuplicates($this->input->post('username'));
        if ($isDuplicated) {
			$json_response = array('returnMessage'=>'Username is already in used => is duplicated: '.$isDuplicated,
                                'returnValue'=>'FAILURE');    
			$this->output->set_content_type('application/json')->set_output(json_encode($json_response));							
        }
        else {
        	$username = $this->input->post('username');
	        $password = $this->input->post('password');
	        $firstname = $this->input->post('firstname');
	        $middlename = $this->input->post('middlename');
	        $lastname = $this->input->post('lastname');
	        $user_type = $this->input->post('user_type');

	        $image_url = 'uploads/users/';
        	if ($username != null && $password != null && $user_type != null) {

				$config['upload_path']  = './uploads/users/';
				$config['allowed_types'] = '*';
		 
				$this->load->library('upload', $config);
			
				if ($this->upload->do_upload('file')) {
					$temp = $this->upload->data();
					$image_url = $image_url.$temp['file_name'];
				}

				$result = $this->user->signup($username, $password, $firstname, $lastname, $middlename, $user_type, $image_url);
				if ($result) {
					$json_response = array( 'returnMessage'=>'User account successfully created',
								   			'returnValue'=>'SUCCESS');   
						
					$this->output->set_content_type('application/json')->set_output(json_encode($json_response)); 
				}
				else {
					$json_response = array('returnMessage'=>'Unable to add user',
										   'returnValue'=>'FAILURE');    

					$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
				}
			}
			else {
				$json_response = array('returnMessage' => 'Invalid request parameters',
									   'returnValue' => 'FAILURE');    

				$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
			}
		}
    }

    function change_password() {
        $username = $_POST['username'];
        $password = $_POST['password'];
		
		if ($username != null && $password != null) {
			$result = $this->user->updateUserPassword($username, $password);
			if ($result) {
				$json_response = array(
						'returnMessage'=>'The password was successfully changed',
						' returnValue'=>'SUCCESS'
				);    

				$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
			}
			else {
				$json_response = array('returnMessage' => 'Unable to update user password.',
									   'returnValue' => 'FAILURE');    

				$this->output->set_content_type('application/json')->set_output(json_encode($json_response)); 

				return false;
			}
		}
		else {
			$json_response = array(
					'returnMessage' => 'Invalid request parameters',
					'returnValue' => 'FAILURE'
			);
			
			$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
		}
     }

    function change_user_detail() {
        $username = $_POST['username'];
        $fname = $_POST['firstname'];
        $mname = $_POST['middlename'];
        $lname = $_POST['lastname'];
		
		if ($username != null) {

			$result = $this->user->updateUserDetail($username, $fname, $mname, $lname);
			if ($result) {
				$json_response = array('username' => $username,
									  'returnMessage'=>'User detail successfully changed',
									  'returnValue'=>'SUCCESS');    

				$this->output->set_content_type('application/json')->set_output(json_encode($json_response)); 

				return true;
			}
			else {
				$json_response = array('username' => $username,
									  'returnMessage'=>'User detail change unsuccessful',
									  'returnValue'=>'FAILURE');    

				$this->output->set_content_type('application/json')->set_output(json_encode($json_response)); 

				return false;
			}
		}
		else {
			$json_response = array('returnMessage' => 'Invalid request parameters',
								   'returnValue' => 'FAILURE');
			$this->output->set_content_type('application/json')->set_output(json_encode($json_response)); 
		}
     }
	 
	function updateProfilePicture() { 
		$username = $this->input->post('username');
        $img = $this->input->post('file');
		
		if ($username != null) {
			$result = $this->user->updateProfilePicture($username, $img);
			if ($result) {
				$this->output->set_content_type('application/json')->set_output(json_encode($result));
			}
			else {
				$json_response = array('username' => $username,
									  'returnMessage' => 'Unable to change profile picture',
									  'returnValue' => 'FAILURE');    

			   $this->output->set_content_type('application/json')->set_output(json_encode($json_response)); 

				return false;
			}
		}
		else {
			$json_response = array('returnMessage' => 'Invalid request parameters',
								   'returnValue' => 'FAILURE');    

			$this->output->set_content_type('application/json')->set_output(json_encode($json_response)); 
			return false;
		}
    }
	
	function getUserType() {
		$uid = $this->input->get('uid');
		
		if ($uid != null) {
			$result = $this->user->getUserType($uid);
			if ($result) {
				foreach ($result as $row)
				$json_response = array('user_type' => $row->user_type,
									  'returnValue' => 'SUCCESS'); 
				$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
			}
			else {
				$json_response = array('username' => $uid,
									  'returnMessage' => 'No available records from the given user id',
									  'returnValue' => 'FAILURE');    

			   $this->output->set_content_type('application/json')->set_output(json_encode($json_response)); 

				return false;
			}
		}
		else {
			$json_response = array('returnMessage' => 'Invalid request parameters',
								   'returnValue' => 'FAILURE');    

			$this->output->set_content_type('application/json')->set_output(json_encode($json_response)); 
			return false;
		}
     }
	 
	 function getUserDetail() {
		$username = $this->input->get('username');
		
		if ($username != null) {
			$result = $this->user->getUserDetail($username);
			if ($result) {
				$this->output->set_content_type('application/json')->set_output(json_encode($result));
			}
			else {
				$json_response = array('username' => $username,
									  'returnMessage'=>'No available records from the given username',
									  'returnValue'=>'FAILURE');    

			   $this->output->set_content_type('application/json')->set_output(json_encode($json_response)); 

				return false;
			}
		}
		else {
			$json_response = array('returnMessage' => 'Invalid request parameters',
								   'returnValue' => 'FAILURE');    

			$this->output->set_content_type('application/json')->set_output(json_encode($json_response)); 
			return false;
		}
     }

	function getUserDetailUsingUserId() {
		$userid = $this->input->get('userid');
		
		if ($userid != null) {
			$result = $this->user->getUserDetailUsingUserId($userid);
			if ($result) {
				$json_response;
				foreach ($result as $row) {
					$json_response = array(
					'fullname' => $row->firstname.' '.$row->lastname,
					'status' => $row->status,
					'user_type' => $row->user_type
					);
				}
				
				$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
			}
			else {
				$json_response = array('username' => $username,
									  'returnMessage'=>'No available records from the given user id',
									  'returnValue'=>'FAILURE');    

			   $this->output->set_content_type('application/json')->set_output(json_encode($json_response)); 

				return false;
			}
		}
		else {
			$json_response = array('returnMessage' => 'Invalid request parameters',
								   'returnValue' => 'FAILURE');    

			$this->output->set_content_type('application/json')->set_output(json_encode($json_response)); 
			return false;
		}
    }

    public function get_users() {
    	$result = $this->user->get_users();

		if ($result) {
			$this->output->set_content_type('application/json')->set_output(json_encode($result));
		}
		else {
			$json_response = array('username' => $username,
									'returnMessage' => 'No available records from the given username',
									'returnValue' => 'FAILURE');    

			  $this->output->set_content_type('application/json')->set_output(json_encode($json_response)); 
		}
    }

    function updateUserType() {
		$userid = $this->input->post('userid');
		$newType = $this->input->post('new_type');
		
		if ($userid != null && $newType != null) {

			$result = $this->user->updateUserType($userid, $newType);

			if ($result) {
				$json_response = array('returnMessage' => 'User Type successfully changed.',
									   'returnValue' => 'SUCCESS');    
				$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
			}
			else {
				$json_response = array('returnMessage' => 'Unable to change user type.',
									   'returnValue' =>'FAILURE');    

			   $this->output->set_content_type('application/json')->set_output(json_encode($json_response)); 

				return false;
			}
		}
		else {
			$json_response = array('returnMessage' => 'Invalid request parameters, uid: '.$userid.' type: '.$newType,
								   'returnValue' => 'FAILURE');    

			$this->output->set_content_type('application/json')->set_output(json_encode($json_response)); 
			return false;
		}
    }

    function updateUserStatus() {
		$userid = $this->input->post('userid');
		$newStatus = $this->input->post('new_status');
		
		if ($userid != null && $newStatus != null) {

			$result = $this->user->updateUserStatus($userid, $newStatus);

			if ($result) {
				$json_response = array('returnMessage' => 'User Status successfully changed.',
									   'returnValue' => 'SUCCESS');    
				$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
			}
			else {
				$json_response = array('returnMessage' => 'Unable to change user status.',
									   'returnValue' =>'FAILURE');    

			   $this->output->set_content_type('application/json')->set_output(json_encode($json_response)); 

				return false;
			}
		}
		else {
			$json_response = array('returnMessage' => 'Invalid request parameters',
								   'returnValue' => 'FAILURE');    

			$this->output->set_content_type('application/json')->set_output(json_encode($json_response)); 
			return false;
		}
    }

    function filterUsers() {
		$key = $this->input->get('key');
		
		if ($key != null) {
			$result = $this->user->filterUsers($key);
			if ($result) {
				
				$this->output->set_content_type('application/json')->set_output(json_encode($result));
			}
			else {
				$json_response = array('returnMessage' => 'No available records from the given key.',
									  'returnValue' => 'FAILURE');    

			   $this->output->set_content_type('application/json')->set_output(json_encode($json_response)); 
			}
		}
		else {
			$json_response = array('returnMessage' => 'Invalid request parameters',
								   'returnValue' => 'FAILURE');    

			$this->output->set_content_type('application/json')->set_output(json_encode($json_response)); 
		}
    }

    function updateProfile() {
    	if ($this->input->post('method') == 'with_picture') {
    		$firstname = $this->input->post('firstname');
    		$middlename = $this->input->post('middlename');
    		$lastname = $this->input->post('lastname');
    		$username = $this->input->post('username');
    		$image_url = 'uploads/users/';

    		if ($firstname != null && $lastname != null && $username != null) {
				$config['upload_path']  = './uploads/users/';
				$config['allowed_types'] = '*';
		 
				$this->load->library('upload', $config);
			
				if ($this->upload->do_upload('file')) {
					$temp = $this->upload->data();
					$image_url = $image_url.$temp['file_name'];
				}

				$result = $this->user->updateUserDetail($username, $firstname, $middlename, $lastname, $image_url);
				if ($result) {
						$json_response = array(
							'returnMessage' => 'User detail successfully changed!',
							'returnValue' => 'SUCCESS'
						);    
						$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
				}
				else {
					$json_response = array(
							'returnMessage' => 'Unable to change user detail.',
							'returnValue' => 'FAILURE'
					);    
					$this->output->set_content_type('application/json')->set_output(json_encode($json_response)); 
				}
			}
			else {
				$json_response = array(
						'returnMessage' => 'Invalid request parameters, method: '.$this->input->post('method'). ' fname: '.$firstname,
						'returnValue' => 'FAILURE'
				);    
				$this->output->set_content_type('application/json')->set_output(json_encode($json_response)); 
			}

    	}
    	else {
    		$firstname = $this->input->post('firstname');
    		$middlename = $this->input->post('middlename');
    		$lastname = $this->input->post('lastname');
    		$username = $this->input->post('username');

    		if ($firstname != null && $lastname != null && $username != null) {
    			$result = $this->user->updateUserDetail($username, $firstname, $middlename, $lastname, '');
				if ($result) {
						$json_response = array(
							'returnMessage' => 'User detail successfully changed!',
							'returnValue' => 'SUCCESS'
						);    
						$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
				}
				else {
					$json_response = array(
							'returnMessage' => 'Unable to change user detail.',
							'returnValue' => 'FAILURE'
					);    
					$this->output->set_content_type('application/json')->set_output(json_encode($json_response)); 
				}
    		}
    		else {
    			$json_response = array(
						'returnMessage' => 'Invalid request parameters, method: '.$this->input->post('method').' fname: ',
						'returnValue' => 'FAILURE'
				);    
				$this->output->set_content_type('application/json')->set_output(json_encode($json_response)); 
    		}
    	}
    }

    function login_method_2() {
    	$this->load->library('session');

    	$this->form_validation->set_rules('username', 'Username', 'trim|required|xss_clean');
		$this->form_validation->set_rules('password', 'Password', 'trim|required|xss_clean');

		if ($this->form_validation->run() == FALSE) {
			if($this->session->has_userdata($this->input->post('username'))) {
				//$this->load->view('home');
				redirect('home', 'refresh');
			}
			else{
				$this->load->view('login');
			}
		} 
		else {
			$username = $this->input->post('username');
			$password = $this->input->post('password');

			$result = $this->user->login($username, $password);
			if ($result) {
				date_default_timezone_set('Asia/Manila');

	    		foreach ($result as $row)
	    		$data = array(
	    			'username' => $row->username,
	    			'uid' => $row->uid,
	    			'time' => date('Y-m-d H:i:s', time())
	     		);

	    		$this->session->set_userdata('authentication', $data);

				redirect('home', 'refresh');
				// $this->load->view('home');
			} 
			else {
				$data = array(
				'error_message' => 'Invalid Username or Password'
				);
				$this->load->view('login', $data);
			}
		}

    	/*
    	$this->load->library('form_validation');
    	$this->load->library('session');

    	$username = $this->input->post('username');
    	$password = $this->input->post('password');

    	if ($username != null && $password != null) {
    		$result = $this->user->login($username, $password);

    		if ($result) {
    			date_default_timezone_set('Asia/Manila');

    			foreach ($result as $row)
    			$data = array(
    				'username' => $row->username,
    				'uid' => $row->uid,
    				'time' => date('Y-m-d H:i:s', time())
     			);

    			$this->session->set_userdata($username, $data);

    			$json_response = array(
    					'data' => $result,
						'returnMessage' => 'Successfully logged in.',
						'returnValue' => 'SUCCESS'
				);    
				$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
    		}
    		else {
    			$json_response = array(
						'returnMessage' => 'Invalid username or password',
						'returnValue' => 'FAILURE'
				);    
				$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
    		}
    	}
    	else {
    		$json_response = array(
						'returnMessage' => 'Invalid request parameters',
						'returnValue' => 'FAILURE'
			);    
			$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
    	}*/
    }

    function retrieve_session() {
    	$username = $this->input->get('username');
    	if ($username != null) {
	    	if ($this->session->has_userdata($username)) {
				$this->output->set_content_type('application/json')->set_output(json_encode($this->session->userdata($username)));
	    	}
	    	else {
	    		$json_response = array(
							'returnMessage' => 'No user data  found',
							'returnValue' => 'FAILURE'
				);    
				$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
	    	}
	    }
	    else {
    		$json_response = array(
						'returnMessage' => 'Invalid request parameters',
						'returnValue' => 'FAILURE'
			);    
			$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
    	}
    	
    }

 }
?>