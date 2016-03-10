<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	class Course_controller extends CI_Controller {
	   
		 function __construct() {
			parent::__construct();
			$this->load->model('course_model','',TRUE);
			$this->load->helper('url');
			$this->load->library('session');
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
		 
		 }
		 
		 public function add_course() {
			$course_name = $this->input->post('course_name');
			$userid = $this->input->post('user_id');
			$course_code = $this->input->post('course_code');
			$category_id = $this->input->post('category_id');

			if ($course_name != null && $userid != null && $course_code != null && $category_id != null) {
				$result = $this->course_model->add_course($course_name, $userid, $course_code, $category_id);
				if ($result) {
					$json_response = array('course_name' => $course_name,
										   'course_code' => $course_code,
										   'returnMessage'=>'Course successfully added',
										   'returnValue'=>'SUCCESS');    

				   $this->output->set_content_type('application/json')->set_output(json_encode($json_response));
				}
				else {
					$json_response = array('returnMessage'=>'Unable to add course',
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

		 public function get_course_id_by_course_name() {
			$course_name = $this->input->get('course_name');
			if ($course_name != null) {
				$result = $this->course_model->get_course_id_by_course_name($course_name);
				if ($result) {
					 $this->output->set_content_type('application/json')->set_output(json_encode($result));
				}
				else {
					$json_response = array('returnMessage'=>'No available course id from the given course name',
										  'returnValue'=>'SUCCESS');    

					$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
				}
			}
			else {
				$json_response = array('returnMessage' => 'Invalid request',
										  'returnValue' => 'FAILED');    

				$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
			}
		 }

		public function get_course_by_course_id() {
			$course_id = $this->input->get('course_id');
			if ($course_id != null) {
				$result = $this->course_model->get_course_by_course_id($course_id);
				if ($result) {
					$this->output->set_content_type('application/json')->set_output(json_encode($result));
				}
				else {
					$json_response = array('returnMessage'=>'No available course from the given course id',
										  'returnValue'=>'SUCCESS');    

					$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
				}
			}
			else {
				$json_response = array('returnMessage' => 'Invalid request',
										  'returnValue' => 'FAILED',
										  'course_id' => $course_id);    

				$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
			}
		}
		
		public function get_course_by_category_id() {
			$id = $this->input->get('category_id');
			if ($id != null) {
				$result = $this->course_model->get_course_by_category_id($id);
				if ($result) {
					$this->output->set_content_type('application/json')->set_output(json_encode($result));
				}
				else {
					$json_response = array('returnMessage'=>'No available course from the given category id',
										  'returnValue'=>'FAILURE');    

					$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
				}
			}
			else {
				$json_response = array(
										'returnMessage' => 'Invalid request',
										'returnValue' => 'FAILURE'
									  );    

				$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
			}
		}
		
		public function courseList() {
			$result = $this->course_model->courseList();
			if ($result) {
				$this->output->set_content_type('application/json')->set_output(json_encode($result));
			}
			else {
				$json_response = array('returnMessage'=>'No available course.',
										'returnValue'=>'FAILURE');    

				$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
			}
		}
		
		 public function updateCourse() {
			if ($this->input->post('course_id') != null && $this->input->post('course_name') != null && $this->input->post('course_code') != null) {
				$course_name = $this->input->post('course_name');
				$course_code = $this->input->post('course_code');
				$course_id = $this->input->post('course_id');

				$result = $this->course_model->updateCourse($course_id, $course_name, $course_code);
				if ($result) {
					$json_response = array('course_id' => $course_id,
										   'course_name' => $course_name,
										   'course_code' => $course_code,
										   'returnMessage'=>'Course successfully updated',
										   'returnValue'=>'SUCCESS');    

				   $this->output->set_content_type('application/json')->set_output(json_encode($json_response));
				}
				else {
					$json_response = array('returnMessage'=>'Unable to add course',
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

		public function get_courses_that_has_trainings() {
			$result = $this->course_model->get_courses_that_has_trainings();
			if ($result) {
				$this->output->set_content_type('application/json')->set_output(json_encode($result));
			}
			else {
				$json_response = array('returnMessage'=>'No available course.',
										'returnValue'=>'FAILURE');    

				$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
			}
		}
	}
?>